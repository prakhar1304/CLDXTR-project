import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors, spacing } from "../styles/theme";

export function Loading() {
  return (
    <View style={{ padding: spacing.lg, alignItems: "center" }}>
      <ActivityIndicator size="large" color={colors.primaryContainer} />
    </View>
  );
}

