// Firebase Client SDK Configuration
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getVertexAI } from '@firebase/vertexai-preview';

// Firebase configuration (public keys are safe to expose)
const firebaseConfig = {
  apiKey: "AIzaSyAtf3SJTY5O4vp8aFsN0iMaRPrpxF1vJiM",
  authDomain: "aura-spring-cleaning-ce122.firebaseapp.com",
  projectId: "aura-spring-cleaning-ce122",
  storageBucket: "aura-spring-cleaning-ce122.firebasestorage.app",
  messagingSenderId: "638849663719",
  appId: "1:638849663719:web:a922c7e3ff088c1fae983f",
  measurementId: "G-TM5W42DE3X"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Vertex AI for intelligent booking assistance
export const vertexAI = getVertexAI(app);

// Enable offline persistence for Firestore
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Firestore persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.warn('Firestore persistence not available in this browser');
    }
  });
}

// Initialize Analytics (client-side only)
export const analytics = typeof window !== 'undefined' 
  ? isSupported().then(yes => yes ? getAnalytics(app) : null) 
  : null;

export default app;