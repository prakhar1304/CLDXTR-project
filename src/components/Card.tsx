import React from "react";
import { View, type ViewStyle } from "react-native";
import { colors, radius, spacing } from "../styles/theme";

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surfaceContainerLowest,
          borderRadius: radius.xl,
          padding: spacing.md,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

