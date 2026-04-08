import React from "react";
import { Pressable, Text, View, type ViewStyle } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../styles/theme";

export function Button({
  title,
  onPress,
  disabled,
  variant = "primary",
  style,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  style?: ViewStyle;
}) {
  const bg =
    variant === "primary"
      ? colors.primaryContainer
      : variant === "secondary"
        ? "#DAB9FF"
        : "transparent";

  const textColor =
    variant === "ghost" ? colors.primary : variant === "secondary" ? colors.onSecondaryFixed : colors.onPrimary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          height: 44,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: radius.xl,
          paddingHorizontal: spacing.lg,
          backgroundColor: disabled ? "rgba(73, 68, 86, 0.12)" : bg,
          borderWidth: variant === "ghost" ? 1 : 0,
          borderColor: variant === "ghost" ? "rgba(98, 0, 238, 0.35)" : "transparent",
          opacity: pressed ? 0.92 : 1,
          ...(variant === "primary" && !disabled ? shadow.ambientFloat : null),
        },
        style,
      ]}
    >
      {variant === "primary" && !disabled ? (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: "rgba(255, 255, 255, 0.10)",
            borderTopLeftRadius: radius.xl,
            borderTopRightRadius: radius.xl,
          }}
        />
      ) : null}
      <Text style={[typography.bodyLg, { color: disabled ? colors.onSurfaceVariant : textColor, fontWeight: "700" }]}>
        {title}
      </Text>
    </Pressable>
  );
}

