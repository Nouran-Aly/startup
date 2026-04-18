import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getFirebaseAuth, isFirebaseConfigured } from "../config/firebase";

const KEY_ROLE = "@khidma/role";
const KEY_TEST_USER = "@khidma/test_user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState(null);
  /** @type {null | import('firebase/auth').User | { uid: string, phoneNumber: string, isTestUser: true }} */
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsub = () => {};

    (async () => {
      try {
        const [r, testRaw] = await Promise.all([
          AsyncStorage.getItem(KEY_ROLE),
          AsyncStorage.getItem(KEY_TEST_USER)
        ]);
        if (r) {
          setRole(r);
        }
        if (testRaw) {
          setUser(JSON.parse(testRaw));
        }
      } catch {
        // ignore
      }

      if (isFirebaseConfigured()) {
        const auth = getFirebaseAuth();
        if (auth) {
          unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
              await AsyncStorage.removeItem(KEY_TEST_USER);
              setUser(u);
              const rStored = await AsyncStorage.getItem(KEY_ROLE);
              if (rStored) {
                setRole(rStored);
              }
            } else {
              const testRaw2 = await AsyncStorage.getItem(KEY_TEST_USER);
              if (testRaw2) {
                setUser(JSON.parse(testRaw2));
              } else {
                setUser(null);
                setRole(null);
              }
            }
          });
        }
      }
      setReady(true);
    })();

    return () => unsub();
  }, []);

  const loginTestUser = useCallback(async (nextRole, phoneE164) => {
    const mock = {
      uid: "test-user",
      phoneNumber: phoneE164,
      isTestUser: true
    };
    await AsyncStorage.setItem(KEY_ROLE, nextRole);
    await AsyncStorage.setItem(KEY_TEST_USER, JSON.stringify(mock));
    setRole(nextRole);
    setUser(mock);
  }, []);

  const loginFirebaseUser = useCallback(async (nextRole) => {
    await AsyncStorage.setItem(KEY_ROLE, nextRole);
    await AsyncStorage.removeItem(KEY_TEST_USER);
    setRole(nextRole);
    const auth = getFirebaseAuth();
    if (auth?.currentUser) {
      setUser(auth.currentUser);
    }
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.multiRemove([KEY_ROLE, KEY_TEST_USER]);
    setRole(null);
    setUser(null);
    if (isFirebaseConfigured()) {
      const auth = getFirebaseAuth();
      if (auth?.currentUser) {
        await signOut(auth);
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      ready,
      role,
      user,
      isAuthenticated: Boolean(user),
      loginTestUser,
      loginFirebaseUser,
      logout
    }),
    [ready, role, user, loginTestUser, loginFirebaseUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be inside AuthProvider");
  }
  return ctx;
}
