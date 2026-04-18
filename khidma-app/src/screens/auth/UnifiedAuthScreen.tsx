import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { Colors } from "../../theme/colors";
import { CairoFonts } from "../../theme/fonts";

export type AuthRole = "homeowner" | "professional";

type Step = "phone" | "otp" | "role";

type Props = {
  onComplete: (payload: { phoneE164: string; role: AuthRole }) => void;
};

/** Mock OTP: any 6 digits accepted — replace with Firebase Phone Auth */
export default function UnifiedAuthScreen({ onComplete }: Props): React.JSX.Element {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState<AuthRole | null>(null);

  const phoneDigits = phone.replace(/\D/g, "");
  const canSendOtp = phoneDigits.length >= 10;
  const canVerifyOtp = otp.replace(/\D/g, "").length === 6;

  const goOtp = () => {
    if (!canSendOtp) {
      return;
    }
    setStep("otp");
  };

  const goRole = () => {
    if (!canVerifyOtp) {
      return;
    }
    setStep("role");
  };

  const finish = () => {
    if (!role) {
      return;
    }
    const e164 = phoneDigits.startsWith("20") ? `+${phoneDigits}` : `+20${phoneDigits.replace(/^0/, "")}`;
    onComplete({ phoneE164: e164, role });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <ThemedText variant="title" style={styles.center}>
          خدمة
        </ThemedText>
        <ThemedText style={[styles.center, styles.sub]}>
          دخول بسيط بالموبايل
        </ThemedText>

        {step === "phone" && (
          <View style={styles.card}>
            <ThemedText variant="label">رقم الموبايل</ThemedText>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="01xxxxxxxxx"
              placeholderTextColor={Colors.textSecondary}
              style={styles.input}
              textAlign="right"
            />
            <Pressable
              onPress={goOtp}
              style={[styles.primaryBtn, !canSendOtp && styles.primaryBtnDisabled]}
              disabled={!canSendOtp}
            >
              <ThemedText style={styles.primaryBtnText}>ابعت الكود</ThemedText>
            </Pressable>
          </View>
        )}

        {step === "otp" && (
          <View style={styles.card}>
            <ThemedText variant="label">كود التحقق</ThemedText>
            <TextInput
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
              placeholder="••••••"
              placeholderTextColor={Colors.textSecondary}
              style={styles.input}
              textAlign="center"
            />
            <Pressable
              onPress={goRole}
              style={[styles.primaryBtn, !canVerifyOtp && styles.primaryBtnDisabled]}
              disabled={!canVerifyOtp}
            >
              <ThemedText style={styles.primaryBtnText}>تأكيد</ThemedText>
            </Pressable>
            <Pressable onPress={() => setStep("phone")}>
              <ThemedText style={styles.link}>غيّر الرقم</ThemedText>
            </Pressable>
          </View>
        )}

        {step === "role" && (
          <View style={styles.card}>
            <ThemedText variant="label" style={styles.center}>
              إنت مين؟
            </ThemedText>
            <View style={styles.roleRow}>
              <Pressable
                onPress={() => setRole("homeowner")}
                style={[styles.roleBtn, role === "homeowner" && styles.roleBtnOn]}
              >
                <ThemedText style={styles.roleEmoji}>🏠</ThemedText>
                <ThemedText variant="label">صاحب بيت</ThemedText>
              </Pressable>
              <Pressable
                onPress={() => setRole("professional")}
                style={[styles.roleBtn, role === "professional" && styles.roleBtnOn]}
              >
                <ThemedText style={styles.roleEmoji}>🛠️</ThemedText>
                <ThemedText variant="label">صنايعي</ThemedText>
              </Pressable>
            </View>
            <Pressable
              onPress={finish}
              style={[styles.primaryBtn, !role && styles.primaryBtnDisabled]}
              disabled={!role}
            >
              <ThemedText style={styles.primaryBtnText}>يلا نكمل</ThemedText>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 20, paddingTop: 32 },
  center: { textAlign: "center" },
  sub: { marginTop: 8, color: Colors.textSecondary },
  card: {
    marginTop: 24,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    gap: 12
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 18,
    fontFamily: CairoFonts.regular,
    color: Colors.textPrimary
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center"
  },
  primaryBtnDisabled: { opacity: 0.45 },
  primaryBtnText: { color: Colors.onPrimary, fontFamily: CairoFonts.bold, fontSize: 17 },
  link: { textAlign: "center", color: Colors.primaryDark, fontFamily: CairoFonts.semibold },
  roleRow: { flexDirection: "row", gap: 12, justifyContent: "space-between" },
  roleBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.background
  },
  roleBtnOn: { borderColor: Colors.primary, backgroundColor: "#EEF2FF" },
  roleEmoji: { fontSize: 40, marginBottom: 8 }
});
