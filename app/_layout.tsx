import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text } from "react-native";
import { AppProvider } from "../src/context/AppContext";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  // Set a default font family app-wide (non-invasive).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Text as any).defaultProps = (Text as any).defaultProps || {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Text as any).defaultProps.style = [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Text as any).defaultProps.style,
    { fontFamily: "Manrope_500Medium" },
  ];

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AppProvider>
    </SafeAreaProvider>
  );
}
