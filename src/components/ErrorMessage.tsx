import React from "react";
import { Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../styles/theme";
import { Button } from "./Button";

export function ErrorMessage({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: "rgba(239, 68, 68, 0.08)",
        padding: spacing.md,
        borderRadius: radius.xl,
        gap: spacing.sm,
      }}
    >
      <Text style={[typography.headlineSm, { color: colors.danger, fontSize: 16 }]}>Something went wrong</Text>
      <Text style={[typography.bodyLg, { color: colors.onSurface }]}>{message}</Text>
      {!!onRetry && <Button title="Retry" onPress={onRetry} />}
    </View>
  );
}

