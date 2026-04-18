import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Pressable, Text, View } from "react-native";
import SpeakableText from "../components/SpeakableText";
import { useAuth } from "../context/AuthContext";

const Tab = createBottomTabNavigator();

function TasksScreen() {
  return (
    <View className="flex-1 bg-white px-4 pt-6">
      <SpeakableText textClassName="text-2xl font-bold text-blue-900">المهام</SpeakableText>
      <SpeakableText className="mt-3" textClassName="text-slate-600">
        هنا هتظهر المهام والطلبات النشطة
      </SpeakableText>
      <View className="mt-8 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8">
        <Text className="text-center text-slate-500">لا توجد مهام حالياً</Text>
      </View>
    </View>
  );
}

function MessagesScreen() {
  return (
    <View className="flex-1 bg-white px-4 pt-6">
      <SpeakableText textClassName="text-2xl font-bold text-blue-900">الرسائل</SpeakableText>
      <SpeakableText className="mt-3" textClassName="text-slate-600">
        محادثاتك مع العملاء أو الفنيين
      </SpeakableText>
    </View>
  );
}

function WalletScreen() {
  return (
    <View className="flex-1 bg-white px-4 pt-6">
      <SpeakableText textClassName="text-2xl font-bold text-blue-900">المحفظة</SpeakableText>
      <View className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-8">
        <SpeakableText textClassName="text-center text-slate-600">الرصيد</SpeakableText>
        <Text className="mt-2 text-center text-4xl font-bold text-blue-900">0 ج.م</Text>
      </View>
    </View>
  );
}

function ProfileScreen() {
  const { role, user, logout } = useAuth();
  const phone =
    user?.phoneNumber ||
    (user?.isTestUser ? user.phoneNumber : "") ||
    "—";

  return (
    <View className="flex-1 bg-white px-4 pt-6">
      <SpeakableText textClassName="text-2xl font-bold text-blue-900">الحساب</SpeakableText>
      <View className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <Text className="text-right text-slate-500">النوع</Text>
        <Text className="mt-1 text-right text-lg font-semibold text-slate-900">
          {role === "professional" ? "صنايعي" : "صاحب بيت"}
        </Text>
        <Text className="mt-4 text-right text-slate-500">الموبايل</Text>
        <Text className="mt-1 text-right text-lg font-semibold text-slate-900">{phone}</Text>
      </View>
      <Pressable
        onPress={logout}
        className="mt-10 min-h-14 items-center justify-center rounded-2xl border border-red-200 bg-red-50"
      >
        <Text className="text-base font-bold text-red-700">خروج</Text>
      </Pressable>
    </View>
  );
}

const tabLabel = (key) => {
  const map = {
    Tasks: "المهام",
    Messages: "الرسائل",
    Wallet: "المحفظة",
    Profile: "حسابي"
  };
  return map[key] || key;
};

export default function HomeDashboard() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1e3a8a",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          minHeight: 56,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopColor: "#e2e8f0"
        },
        tabBarLabelStyle: { fontFamily: "Cairo_600SemiBold", fontSize: 11 }
      }}
    >
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarLabel: tabLabel("Tasks"),
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>📋</Text>
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: tabLabel("Messages"),
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>💬</Text>
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarLabel: tabLabel("Wallet"),
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>💰</Text>
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: tabLabel("Profile"),
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>👤</Text>
        }}
      />
    </Tab.Navigator>
  );
}
