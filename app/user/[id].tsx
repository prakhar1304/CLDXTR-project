import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Card } from "../../src/components/Card";
import { ErrorMessage } from "../../src/components/ErrorMessage";
import { Header } from "../../src/components/Header";
import { Loading } from "../../src/components/Loading";
import { Screen } from "../../src/components/Screen";
import { useApp } from "../../src/context/AppContext";
import { fetchUserById, type ApiUser } from "../../src/services/api";
import { colors, radius, spacing, typography } from "../../src/styles/theme";

export default function UserDetailsScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const idNum = Number(params.id);

  const { users } = useApp();
  const existing = useMemo(() => users.find((u) => u.id === idNum), [users, idNum]);

  const [user, setUser] = useState<ApiUser | null>(existing ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!Number.isFinite(idNum)) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserById(idNum);
      setUser(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idNum]);

  return (
    <Screen>
      <Header title="User Details" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={{ padding: spacing.md, gap: spacing.md, paddingBottom: 140 }}>
        {error ? <ErrorMessage message={error} onRetry={load} /> : null}
        {loading ? <Loading /> : null}

        {user ? (
          <>
            <View style={{ borderRadius: radius.xl, overflow: "hidden" }}>
              <View style={{ backgroundColor: "rgba(98, 0, 238, 0.10)", padding: spacing.lg }}>
                <View style={{ flexDirection: "row", gap: spacing.md, alignItems: "center" }}>
                  <View
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 28,
                      backgroundColor: "rgba(98, 0, 238, 0.16)",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={[typography.headlineSm, { color: colors.primary, fontSize: 18 }]}>
                      {initials(user.name)}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[typography.displayLg, { fontSize: 22, color: colors.onSurface }]} numberOfLines={1}>
                      {user.name}
                    </Text>
                    <Text style={[typography.bodyLg, { color: colors.onSurfaceVariant }]} numberOfLines={1}>
                      @{user.username}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ backgroundColor: colors.surfaceContainerLowest, padding: spacing.md }}>
                <View style={{ flexDirection: "row", gap: spacing.sm, flexWrap: "wrap" }}>
                  <Pill>{user.email}</Pill>
                  <Pill>{user.phone}</Pill>
                </View>
              </View>
            </View>

            <Card>
              <Text style={[typography.headlineSm, { color: colors.onSurface, marginBottom: spacing.sm }]}>
                Contact
              </Text>
              <View style={{ gap: spacing.xs }}>
                <InfoRow label="Email" value={user.email} />
                <InfoRow label="Phone" value={user.phone} />
                <InfoRow label="Website" value={user.website} />
              </View>
            </Card>

            <Card>
              <Text style={[typography.headlineSm, { color: colors.onSurface, marginBottom: spacing.sm }]}>
                Address
              </Text>
              <View style={{ gap: spacing.xs }}>
                <Text style={[typography.bodyLg, { color: colors.onSurface }]}>
                  {(user.address?.street || "") + (user.address?.suite ? `, ${user.address.suite}` : "")}
                </Text>
                <Text style={[typography.bodyLg, { color: colors.onSurface }]}>
                  {(user.address?.city || "") + (user.address?.zipcode ? ` - ${user.address.zipcode}` : "")}
                </Text>
              </View>
            </Card>

            <Card>
              <Text style={[typography.headlineSm, { color: colors.onSurface, marginBottom: spacing.sm }]}>
                Company
              </Text>
              <Text style={[typography.bodyLg, { color: colors.onSurface }]}>{user.company?.name || "—"}</Text>
            </Card>
          </>
        ) : (
          !loading && (
            <View style={{ padding: spacing.md }}>
              <Text style={[typography.bodyLg, { color: colors.onSurfaceVariant }]}>User not found.</Text>
            </View>
          )
        )}
      </ScrollView>
    </Screen>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: spacing.md }}>
      <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>{label}</Text>
      <Text style={[typography.bodyLg, { color: colors.onSurface, flexShrink: 1, textAlign: "right" }]} numberOfLines={2}>
        {value || "—"}
      </Text>
    </View>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: radius.full,
        backgroundColor: colors.surfaceContainerLow,
      }}
    >
      <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]} numberOfLines={1}>
        {children}
      </Text>
    </View>
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

