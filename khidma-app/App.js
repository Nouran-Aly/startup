import { useFonts } from "expo-font";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Cairo_400Regular,
  Cairo_600SemiBold,
  Cairo_700Bold
} from "@expo-google-fonts/cairo";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import HomeDashboard from "./src/screens/HomeDashboard";
import PhoneLoginScreen from "./src/screens/PhoneLoginScreen";
import RoleSelectionScreen from "./src/screens/RoleSelectionScreen";

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
    primary: "#1e3a8a"
  }
};

function RootStack() {
  const { ready, isAuthenticated } = useAuth();

  if (!ready) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#1e3a8a" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Home" component={HomeDashboard} />
      ) : (
        <>
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
          <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Cairo_400Regular,
    Cairo_600SemiBold,
    Cairo_700Bold
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#1e3a8a" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer theme={navTheme}>
            <RootStack />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
