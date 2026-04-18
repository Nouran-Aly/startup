import { useNavigation, useRoute } from "@react-navigation/native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View
} from "react-native";
import { firebaseConfig, isFirebaseConfigured } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { confirmSmsCode, TEST_OTP, triggerSignInWithPhoneNumber } from "../services/phoneAuth";
import SpeakableText from "../components/SpeakableText";

function normalizeEgyptPhone(raw) {
  const d = raw.replace(/\D/g, "");
  if (d.startsWith("20")) {
    return `+${d}`;
  }
  if (d.startsWith("0")) {
    return `+20${d.slice(1)}`;
  }
  if (d.length >= 10) {
    return `+20${d}`;
  }
  return "";
}

export default function PhoneLoginScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { role } = route.params || { role: "homeowner" };
  const { loginTestUser, loginFirebaseUser } = useAuth();

  const recaptchaRef = useRef(null);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("phone");
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const testMode = !isFirebaseConfigured();
  const phoneE164 = normalizeEgyptPhone(phone);
  const canSend = phoneE164.length >= 12;
  const canVerify = code.replace(/\D/g, "").length === 6;

  const sendCode = async () => {
    setError("");
    if (!canSend) {
      return;
    }
    setLoading(true);
    try {
      if (testMode) {
        setStep("code");
        setLoading(false);
        return;
      }
      const verifier = recaptchaRef.current;
      if (!verifier) {
        throw new Error("reCAPTCHA not ready");
      }
      const cr = await triggerSignInWithPhoneNumber(phoneE164, verifier);
      setConfirmation(cr);
      setStep("code");
    } catch (e) {
      setError(e?.message || "فشل إرسال الكود");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setError("");
    if (!canVerify) {
      return;
    }
    setLoading(true);
    try {
      if (testMode) {
        if (code.trim() === TEST_OTP) {
          await loginTestUser(role, phoneE164 || "+200000000000");
        } else {
          setError("في وضع التجربة استخدم ١٢٣٤٥٦");
        }
        setLoading(false);
        return;
      }
      if (!confirmation) {
        throw new Error("مفيش كود متبعت");
      }
      await confirmSmsCode(confirmation, code.trim());
      await loginFirebaseUser(role);
    } catch (e) {
      setError(e?.message || "الكود غلط");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      {!testMode ? (
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaRef}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification
        />
      ) : null}

      <View className="flex-1 px-4 pb-8 pt-10">
        <Pressable onPress={() => navigation.goBack()} className="mb-4 min-h-12 justify-center self-start">
          <Text className="text-base font-semibold text-blue-900">‹ رجوع</Text>
        </Pressable>

        <SpeakableText textClassName="text-2xl font-bold text-blue-900">دخول بالموبايل</SpeakableText>
        <SpeakableText className="mt-2" textClassName="text-slate-600">
          {testMode
            ? "وضع تجريبي — اكتب أي رقم ثم كود ١٢٣٤٥٦"
            : "هنبعتلك كود على الواتس أو الرسايل"}
        </SpeakableText>

        {testMode ? (
          <View className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3">
            <Text className="text-center text-amber-900">Test Mode — OTP: 123456</Text>
          </View>
        ) : null}

        {error ? (
          <View className="mt-4 rounded-xl bg-red-50 px-3 py-2">
            <Text className="text-center text-red-800">{error}</Text>
          </View>
        ) : null}

        {step === "phone" ? (
          <>
            <Text className="mb-2 mt-8 text-right text-sm font-semibold text-slate-800">رقم الموبايل</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="01xxxxxxxxx"
              placeholderTextColor="#94a3b8"
              className="min-h-14 rounded-2xl border border-slate-200 px-4 text-right text-lg text-slate-900"
            />
            <Pressable
              onPress={sendCode}
              disabled={!canSend || loading}
              className={`mt-6 min-h-14 items-center justify-center rounded-2xl bg-blue-900 ${!canSend || loading ? "opacity-40" : ""}`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-lg font-bold text-white">ابعت الكود</Text>
              )}
            </Pressable>
          </>
        ) : (
          <>
            <Text className="mb-2 mt-8 text-right text-sm font-semibold text-slate-800">كود التحقق</Text>
            <TextInput
              value={code}
              onChangeText={(t) => setCode(t.replace(/\D/g, "").slice(0, 6))}
              keyboardType="number-pad"
              maxLength={6}
              placeholder="••••••"
              placeholderTextColor="#94a3b8"
              className="min-h-14 rounded-2xl border border-slate-200 px-4 text-center text-2xl tracking-widest text-slate-900"
            />
            <Pressable
              onPress={verifyCode}
              disabled={!canVerify || loading}
              className={`mt-6 min-h-14 items-center justify-center rounded-2xl bg-blue-900 ${!canVerify || loading ? "opacity-40" : ""}`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-lg font-bold text-white">تأكيد</Text>
              )}
            </Pressable>
            <Pressable onPress={() => setStep("phone")} className="mt-4 min-h-12 items-center justify-center">
              <Text className="text-blue-900">غيّر الرقم</Text>
            </Pressable>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
