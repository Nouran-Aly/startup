import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import SpeakableText from "../components/SpeakableText";

export default function RoleSelectionScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white px-4 pb-8 pt-14">
      <View className="mb-10 items-center">
        <SpeakableText textClassName="text-3xl font-bold text-blue-900">خدمة</SpeakableText>
        <SpeakableText className="mt-3 justify-center" textClassName="text-base text-slate-600">
          اختار نوع الحساب عشان نكمل
        </SpeakableText>
      </View>

      <Pressable
        onPress={() => navigation.navigate("PhoneLogin", { role: "homeowner" })}
        className="mb-4 min-h-[140px] justify-center rounded-3xl border-2 border-blue-200 bg-blue-50/80 p-6 active:opacity-90"
      >
        <Text className="mb-2 text-center text-5xl">🏠</Text>
        <SpeakableText className="justify-center" textClassName="text-center text-xl font-bold text-blue-900">
          أنا صاحب بيت
        </SpeakableText>
        <SpeakableText className="mt-2 justify-center" textClassName="text-center text-sm text-slate-600">
          اطلب صيانة وسباكة وكهرباء
        </SpeakableText>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("PhoneLogin", { role: "professional" })}
        className="min-h-[140px] justify-center rounded-3xl border-2 border-blue-200 bg-slate-50 p-6 active:opacity-90"
      >
        <Text className="mb-2 text-center text-5xl">🛠️</Text>
        <SpeakableText className="justify-center" textClassName="text-center text-xl font-bold text-blue-900">
          أنا صنايعي
        </SpeakableText>
        <SpeakableText className="mt-2 justify-center" textClassName="text-center text-sm text-slate-600">
          شوف الطلبات حواليك وابدأ الشغل
        </SpeakableText>
      </Pressable>
    </View>
  );
}
