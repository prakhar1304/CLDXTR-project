import React, { useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { colors, radius, spacing, typography } from "../styles/theme";

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
  error,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address";
  multiline?: boolean;
  error?: string | null;
}) {
  const [focused, setFocused] = useState(false);
  const styles = useMemo(() => {
    const showGhost = focused || !!error;
    return {
      backgroundColor: focused ? colors.surfaceContainerLowest : colors.surfaceContainerLow,
      borderWidth: showGhost ? 1 : 0,
      borderColor: error ? colors.danger : colors.primary,
      shadowColor: colors.primary,
      shadowOpacity: focused ? 0.1 : 0,
      shadowRadius: focused ? 12 : 0,
      shadowOffset: { width: 0, height: 6 },
      elevation: focused ? 2 : 0,
    };
  }, [focused, error]);

  return (
    <View style={{ gap: spacing.xs }}>
      <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.onSurfaceVariant}
        keyboardType={keyboardType}
        multiline={multiline}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          minHeight: multiline ? 100 : 44,
          paddingHorizontal: spacing.md,
          paddingVertical: multiline ? spacing.md : 0,
          borderRadius: radius.xl,
          color: colors.onSurface,
          ...styles,
        }}
      />
      {!!error && <Text style={[typography.labelMd, { color: colors.danger }]}>{error}</Text>}
    </View>
  );
}

