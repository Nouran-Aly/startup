import { signInWithPhoneNumber } from "firebase/auth";
import { getFirebaseAuth } from "../config/firebase";

export const TEST_OTP = "123456";

/**
 * Triggers Firebase Phone Auth: sends SMS and returns a ConfirmationResult (call .confirm(code)).
 * @param {string} phoneE164 e.g. +2010xxxxxxxx
 * @param {import('firebase/auth').ApplicationVerifier} applicationVerifier from expo-firebase-recaptcha
 */
export async function triggerSignInWithPhoneNumber(phoneE164, applicationVerifier) {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error("Firebase not configured");
  }
  if (!applicationVerifier) {
    throw new Error("reCAPTCHA verifier missing");
  }
  return signInWithPhoneNumber(auth, phoneE164, applicationVerifier);
}

/**
 * @param {import('firebase/auth').ConfirmationResult} confirmationResult
 * @param {string} code
 */
export async function confirmSmsCode(confirmationResult, code) {
  return confirmationResult.confirm(code);
}
