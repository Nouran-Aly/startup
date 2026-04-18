import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/**
 * Set these in `.env` (Expo: EXPO_PUBLIC_*).
 * If `apiKey` is missing, app runs in Test Mode (OTP: 123456).
 */
export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

export function isFirebaseConfigured() {
  return Boolean(firebaseConfig.apiKey && String(firebaseConfig.apiKey).trim().length > 0);
}

let _app;
export function getFirebaseApp() {
  if (!isFirebaseConfigured()) {
    return null;
  }
  if (!_app) {
    _app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return _app;
}

export function getFirebaseAuth() {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
}
