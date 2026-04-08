import React from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/theme";

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: colors.surface }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      <View style={{ flex: 1, backgroundColor: colors.surface }}>{children}</View>
    </SafeAreaView>
  );
}

