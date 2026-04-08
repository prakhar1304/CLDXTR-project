import { Feather } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { colors, radius, spacing } from "../styles/theme";

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search…",
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  const containerStyle = useMemo(() => {
    const showGhost = focused;
    return {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
      height: 46,
      borderRadius: radius.xl,
      backgroundColor: focused ? colors.surfaceContainerLowest : colors.surfaceContainerLow,
      borderWidth: showGhost ? 1 : 0,
      borderColor: "rgba(98, 0, 238, 0.35)",
      shadowColor: colors.primary,
      shadowOpacity: focused ? 0.08 : 0,
      shadowRadius: focused ? 14 : 0,
      shadowOffset: { width: 0, height: 8 },
      elevation: focused ? 2 : 0,
    };
  }, [focused]);

  return (
    <View style={containerStyle}>
      <Feather name="search" size={16} color={colors.onSurfaceVariant} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.onSurfaceVariant}
        style={{
          flex: 1,
          color: colors.onSurface,
          paddingVertical: 0,
          fontFamily: "Manrope_500Medium",
          fontSize: 15,
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />
      {!!value && (
        <Pressable
          onPress={() => onChangeText("")}
          hitSlop={10}
          style={({ pressed }) => ({
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? "rgba(73, 68, 86, 0.10)" : "rgba(73, 68, 86, 0.06)",
          })}
        >
          <Feather name="x" size={16} color={colors.onSurfaceVariant} />
        </Pressable>
      )}
    </View>
  );
}

