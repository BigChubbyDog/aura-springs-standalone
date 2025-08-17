// Firestore Gemini Chatbot Extension Integration
import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  doc,
  updateDoc
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBKIJN1RhkcxdgrIq6texrb-L5bM4PC_xI",
  authDomain: "aura-spring-cleaning-ce122.firebaseapp.com",
  projectId: "aura-spring-cleaning-ce122",
  storageBucket: "aura-spring-cleaning-ce122.firebasestorage.app",
  messagingSenderId: "742007066365",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:742007066365:web:3015be3732f5f168e9b894"
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const functions = getFunctions(app);

// Extension configuration - these match the Firestore Gemini Chatbot extension defaults
const EXTENSION_CONFIG = {
  // Collection where chat sessions are stored
  SESSIONS_COLLECTION: 'chat_sessions',
  // Collection where messages are stored (subcollection of sessions)
  MESSAGES_SUBCOLLECTION: 'messages',
  // Field names the extension expects
  PROMPT_FIELD: 'prompt',
  RESPONSE_FIELD: 'response',
  STATUS_FIELD: 'status',
  CREATE_TIME_FIELD: 'createTime',
  COMPLETE_TIME_FIELD: 'completeTime',
  // Model configuration
  MODEL: 'gemini-pro',
  TEMPERATURE: 0.7,
  MAX_OUTPUT_TOKENS: 1024,
};

// System prompt for Aura Spring Cleaning
const SYSTEM_CONTEXT = `You are Aura, the AI assistant for Aura Spring Cleaning, Austin's premier luxury cleaning service.

IMPORTANT INFORMATION:
- Primary Contact: Valerie at (512) 781-0527
- Email: valerie@auraspringcleaning.com
- Service Areas: Downtown Austin, Rainey Street towers, The Domain, West Lake Hills

PRICING (MUST BE ACCURATE):
- Base: $150 (includes 3BR/2BA up to 1300 sq ft)
- Add $25 for each 250 sq ft above 1300
- Add $25 for each bedroom above 3
- Add $25 for each bathroom above 2
- Add $25 for each office

SERVICE MULTIPLIERS:
- Standard: 1.0x ($150 base)
- Deep Clean: 1.5x ($225 base)
- Move In/Out: 1.67x ($250 base)
- Airbnb: 0.9x ($135 base)
- Post-Construction: 2.5x ($375 base)

DISCOUNTS:
- Monthly: 10% off
- Bi-weekly: 15% off
- Weekly: 20% off

Always be helpful, professional, and guide customers toward booking. Keep responses concise (2-3 sentences).`;

export interface ChatMessage {
  id?: string;
  prompt?: string;
  response?: string;
  status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'ERROR';
  createTime?: any;
  completeTime?: any;
  metadata?: {
    userName?: string;
    userEmail?: string;
    userPhone?: string;
    sessionId?: string;
  };
}

export class FirestoreChatbot {
  private sessionId: string;
  private sessionRef: any;

  constructor(sessionId?: string) {
    this.sessionId = sessionId || `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Create a new chat session
  async createSession(metadata?: any) {
    try {
      const sessionData = {
        sessionId: this.sessionId,
        createdAt: serverTimestamp(),
        metadata: {
          ...metadata,
          systemContext: SYSTEM_CONTEXT,
          model: EXTENSION_CONFIG.MODEL,
          source: 'website-chat'
        }
      };

      const sessionDoc = await addDoc(
        collection(db, EXTENSION_CONFIG.SESSIONS_COLLECTION),
        sessionData
      );

      this.sessionRef = sessionDoc;
      return sessionDoc.id;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  // Send a message and wait for response
  async sendMessage(
    prompt: string,
    metadata?: any
  ): Promise<string> {
    try {
      // Ensure session exists
      if (!this.sessionRef) {
        await this.createSession(metadata);
      }

      // Add the user's message with the extension's expected format
      const messageData: any = {
        [EXTENSION_CONFIG.PROMPT_FIELD]: `${SYSTEM_CONTEXT}\n\nUser: ${prompt}`,
        [EXTENSION_CONFIG.STATUS_FIELD]: 'PENDING',
        [EXTENSION_CONFIG.CREATE_TIME_FIELD]: serverTimestamp(),
        metadata: metadata || {}
      };

      // Add message to the messages subcollection
      const messageRef = await addDoc(
        collection(
          db, 
          EXTENSION_CONFIG.SESSIONS_COLLECTION,
          this.sessionRef.id,
          EXTENSION_CONFIG.MESSAGES_SUBCOLLECTION
        ),
        messageData
      );

      // Wait for the extension to process and respond
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          doc(
            db,
            EXTENSION_CONFIG.SESSIONS_COLLECTION,
            this.sessionRef.id,
            EXTENSION_CONFIG.MESSAGES_SUBCOLLECTION,
            messageRef.id
          ),
          (snapshot) => {
            const data = snapshot.data();
            
            if (data?.[EXTENSION_CONFIG.STATUS_FIELD] === 'COMPLETED') {
              unsubscribe();
              resolve(data[EXTENSION_CONFIG.RESPONSE_FIELD] || 'I apologize, but I couldn\'t generate a response. Please call (512) 781-0527 for immediate assistance.');
            } else if (data?.[EXTENSION_CONFIG.STATUS_FIELD] === 'ERROR') {
              unsubscribe();
              reject(new Error('Failed to get response from AI'));
            }
          },
          (error) => {
            unsubscribe();
            reject(error);
          }
        );

        // Timeout after 30 seconds
        setTimeout(() => {
          unsubscribe();
          reject(new Error('Response timeout'));
        }, 30000);
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Listen to messages in a session
  subscribeToMessages(
    onMessage: (messages: ChatMessage[]) => void,
    onError?: (error: Error) => void
  ) {
    if (!this.sessionRef) {
      console.error('No session created yet');
      return () => {};
    }

    const messagesQuery = query(
      collection(
        db,
        EXTENSION_CONFIG.SESSIONS_COLLECTION,
        this.sessionRef.id,
        EXTENSION_CONFIG.MESSAGES_SUBCOLLECTION
      ),
      orderBy(EXTENSION_CONFIG.CREATE_TIME_FIELD, 'asc')
    );

    return onSnapshot(
      messagesQuery,
      (snapshot) => {
        const messages: ChatMessage[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          messages.push({
            id: doc.id,
            prompt: data[EXTENSION_CONFIG.PROMPT_FIELD],
            response: data[EXTENSION_CONFIG.RESPONSE_FIELD],
            status: data[EXTENSION_CONFIG.STATUS_FIELD],
            createTime: data[EXTENSION_CONFIG.CREATE_TIME_FIELD],
            completeTime: data[EXTENSION_CONFIG.COMPLETE_TIME_FIELD],
            metadata: data.metadata
          });
        });
        onMessage(messages);
      },
      onError
    );
  }

  // Get session ID
  getSessionId(): string {
    return this.sessionId;
  }
}

// Export a singleton instance for easy use
export const chatbot = new FirestoreChatbot();