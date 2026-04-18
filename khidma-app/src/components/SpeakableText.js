import * as Speech from "expo-speech";
import React, { useCallback } from "react";
import { Pressable, Text, View } from "react-native";

/**
 * Egyptian Arabic TTS — long-press text or tap 🔊 (device native speech).
 * @param {{ children: string, className?: string, textClassName?: string }} props
 */
export default function SpeakableText({ children, className = "", textClassName = "" }) {
  const text = String(children ?? "");

  const speak = useCallback(() => {
    if (!text.trim()) {
      return;
    }
    Speech.stop();
    Speech.speak(text, { language: "ar-EG", rate: 0.95 });
  }, [text]);

  return (
    <View className={`flex-row flex-wrap items-center gap-2 ${className}`}>
      <Pressable
        onLongPress={speak}
        delayLongPress={450}
        accessibilityRole="text"
        accessibilityHint="اضغط مطوّل أو سمّع عشان تسمع النص"
      >
        <Text className={`text-right text-slate-900 ${textClassName}`}>{children}</Text>
      </Pressable>
      <Pressable
        onPress={speak}
        hitSlop={12}
        className="min-h-12 min-w-12 items-center justify-center rounded-xl bg-slate-100 active:bg-slate-200"
        accessibilityLabel="تشغيل الصوت"
      >
        <Text className="text-xl">🔊</Text>
      </Pressable>
    </View>
  );
}
