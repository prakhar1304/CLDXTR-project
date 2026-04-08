import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { Card } from "../../src/components/Card";
import { ErrorMessage } from "../../src/components/ErrorMessage";
import { Header } from "../../src/components/Header";
import { Loading } from "../../src/components/Loading";
import { Screen } from "../../src/components/Screen";
import { useApp } from "../../src/context/AppContext";
import { colors, spacing, typography } from "../../src/styles/theme";

export default function DashboardScreen() {
  const { users, products, loading, error, loadAll } = useApp();

  useEffect(() => {
    if (users.length === 0 || products.length === 0) loadAll();
  }, []);

  const stats = useMemo(() => {
    const categories = new Set(products.map((p) => p.category).filter(Boolean));
    const avgPrice =
      products.length === 0
        ? 0
        : products.reduce((sum, p) => sum + (p.price || 0), 0) /
          products.length;
    return {
      userCount: users.length,
      productCount: products.length,
      categoryCount: categories.size,
      avgPrice,
    };
  }, [users, products]);

  const isLoading = loading.users || loading.products;

  return (
    <Screen>
      <Header title="Dashboard" />
      <ScrollView
        contentContainerStyle={{
          padding: spacing.md,
          gap: spacing.md,
          paddingBottom: 120,
        }}
      >
        {error ? <ErrorMessage message={error} onRetry={loadAll} /> : null}
        {isLoading ? <Loading /> : null}

        <View style={{ borderRadius: 28, overflow: "hidden" }}>
          <LinearGradient
            colors={[
              "rgba(98, 0, 238, 0.18)",
              "rgba(72, 0, 178, 0.02)",
              "rgba(248, 249, 254, 1)",
            ]}
            start={{ x: 0.15, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={{ padding: spacing.lg }}
          >
            <Text
              style={[typography.labelMd, { color: colors.onSurfaceVariant }]}
            >
              Quick stats
            </Text>
            <View style={{ height: spacing.sm }} />
            <Text style={[typography.displayLg, { color: colors.onSurface }]}>
              {stats.productCount} products
            </Text>
            <Text
              style={[typography.bodyLg, { color: colors.onSurfaceVariant }]}
            >
              across {stats.categoryCount} categories · {stats.userCount} users
            </Text>
          </LinearGradient>
        </View>

        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <Card style={{ flex: 1 }}>
            <Text
              style={[typography.labelMd, { color: colors.onSurfaceVariant }]}
            >
              Users
            </Text>
            <Text style={[typography.displayLg, { color: colors.onSurface }]}>
              {stats.userCount}
            </Text>
          </Card>
          <Card style={{ flex: 1 }}>
            <Text
              style={[typography.labelMd, { color: colors.onSurfaceVariant }]}
            >
              Products
            </Text>
            <Text style={[typography.displayLg, { color: colors.onSurface }]}>
              {stats.productCount}
            </Text>
          </Card>
        </View>

        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <Card style={{ flex: 1 }}>
            <Text
              style={[typography.labelMd, { color: colors.onSurfaceVariant }]}
            >
              Categories
            </Text>
            <Text style={[typography.displayLg, { color: colors.onSurface }]}>
              {stats.categoryCount}
            </Text>
          </Card>
          <Card style={{ flex: 1 }}>
            <Text
              style={[typography.labelMd, { color: colors.onSurfaceVariant }]}
            >
              Avg Price
            </Text>
            <Text style={[typography.displayLg, { color: colors.onSurface }]}>
              ${stats.avgPrice.toFixed(2)}
            </Text>
          </Card>
        </View>
      </ScrollView>
    </Screen>
  );
}
