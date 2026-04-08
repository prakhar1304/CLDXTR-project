import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { colors, spacing, typography } from "../styles/theme";

export function Header({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  return (
    <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.sm }}>
      <View style={{ borderRadius: radiusForHeader(), overflow: "hidden" }}>
        <BlurView intensity={28} tint="light">
          <View
            style={{
              backgroundColor: "rgba(248, 249, 254, 0.72)",
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, flex: 1 }}>
              {onBack ? (
                <Pressable
                  onPress={onBack}
                  style={({ pressed }) => ({
                    width: 40,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    backgroundColor: pressed ? "rgba(98, 0, 238, 0.08)" : "rgba(98, 0, 238, 0.06)",
                  })}
                >
                  <Feather name="arrow-left" size={18} color={colors.onSurface} />
                </Pressable>
              ) : (
                <View style={{ width: 40, height: 40 }} />
              )}
              <Text
                numberOfLines={1}
                style={[
                  typography.headlineSm,
                  { color: colors.onSurface, flex: 1, paddingRight: spacing.sm },
                ]}
              >
                {title}
              </Text>
            </View>
            <View>{right}</View>
          </View>
        </BlurView>
      </View>
    </View>
  );
}

function radiusForHeader() {
  // keep header a bit tighter than cards
  return 18;
}

