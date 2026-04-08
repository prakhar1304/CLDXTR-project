import React, { useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { Card } from "../../src/components/Card";
import { ErrorMessage } from "../../src/components/ErrorMessage";
import { Header } from "../../src/components/Header";
import { Loading } from "../../src/components/Loading";
import { Screen } from "../../src/components/Screen";
import { useApp } from "../../src/context/AppContext";
import { colors, radius, spacing, typography } from "../../src/styles/theme";
import { router } from "expo-router";

export default function UsersScreen() {
  const { users, loading, error, loadUsers } = useApp();

  useEffect(() => {
    if (users.length === 0) loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen>
      <Header title="Users" />
      <View style={{ flex: 1, padding: spacing.md, gap: spacing.md, paddingBottom: 120 }}>
        {error ? <ErrorMessage message={error} onRetry={loadUsers} /> : null}
        {loading.users ? <Loading /> : null}

        <FlatList
          data={users}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing["2xl"] }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push({ pathname: "/user/[id]", params: { id: String(item.id) } })}
              style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
            >
              <Card style={{ padding: spacing.md }}>
                <View style={{ flexDirection: "row", gap: spacing.md, alignItems: "center" }}>
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: "rgba(98, 0, 238, 0.10)",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={[typography.headlineSm, { color: colors.primary, fontSize: 14 }]}>
                      {initials(item.name)}
                    </Text>
                  </View>

                  <View style={{ flex: 1, gap: 6 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                      <Text style={[typography.headlineSm, { fontSize: 16, color: colors.onSurface }]} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          width: 4,
                          height: 16,
                          borderRadius: 2,
                          backgroundColor: colors.surfaceVariant,
                          marginLeft: spacing.sm,
                        }}
                      />
                    </View>
                    <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]} numberOfLines={1}>
                      {item.email}
                    </Text>

                    <View style={{ flexDirection: "row", gap: spacing.sm, flexWrap: "wrap" }}>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 6,
                          borderRadius: radius.full,
                          backgroundColor: colors.surfaceContainerLow,
                        }}
                      >
                        <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]} numberOfLines={1}>
                          {item.phone}
                        </Text>
                      </View>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 6,
                          borderRadius: radius.full,
                          backgroundColor: "rgba(187, 134, 252, 0.16)",
                        }}
                      >
                        <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]} numberOfLines={1}>
                          @{item.username}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            </Pressable>
          )}
          ListEmptyComponent={
            !loading.users ? (
              <Card>
                <Text style={[typography.bodyLg, { color: colors.onSurfaceVariant }]}>
                  No users loaded yet.
                </Text>
              </Card>
            ) : null
          }
        />
      </View>
    </Screen>
  );
}

function initials(name: string) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const a = parts[0]?.[0] ?? "U";
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (a + b).toUpperCase();
}

