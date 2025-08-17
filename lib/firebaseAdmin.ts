// Firebase Admin SDK Configuration
import * as admin from 'firebase-admin';

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  try {
    // First, try environment variables (production/Azure)
    if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      const serviceAccount = {
        type: 'service_account',
        project_id: process.env.FIREBASE_PROJECT_ID || 'aura-spring-cleaning-ce122',
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
      };
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        projectId: 'aura-spring-cleaning-ce122'
      });
      
      console.log('✅ Firebase Admin initialized with environment variables');
    } else {
      // Try to load the service account key file (development)
      const serviceAccount = require('../serviceAccountKey.json');
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: 'aura-spring-cleaning-ce122'
      });
      
      console.log('✅ Firebase Admin initialized with service account file');
    }
  } catch (error) {
    // Fallback: Initialize with limited functionality
    console.warn('⚠️ Firebase Admin not fully configured. Some features may be limited.');
    
    try {
      admin.initializeApp({
        projectId: 'aura-spring-cleaning-ce122'
      });
    } catch (initError) {
      console.error('Failed to initialize Firebase Admin:', initError);
    }
  }
}

// Export configured admin instance
export default admin;

// Helper to check if Firebase is properly configured
export function isFirebaseConfigured(): boolean {
  try {
    return admin.apps.length > 0 && admin.app().options.credential !== undefined;
  } catch {
    return false;
  }
}

// Store chat message in Firestore (if configured)
export async function storeChatMessage(
  sessionId: string,
  message: string,
  response: string,
  metadata?: any
): Promise<void> {
  if (!isFirebaseConfigured()) {
    console.log('Firestore not available - chat not saved');
    return;
  }

  try {
    const db = admin.firestore();
    await db.collection('chats').doc(sessionId).collection('messages').add({
      message,
      response,
      metadata,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('Error storing chat message:', error);
  }
}

// Get chat history from Firestore
export async function getChatHistory(sessionId: string): Promise<any[]> {
  if (!isFirebaseConfigured()) {
    return [];
  }

  try {
    const db = admin.firestore();
    const snapshot = await db
      .collection('chats')
      .doc(sessionId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting chat history:', error);
    return [];
  }
}