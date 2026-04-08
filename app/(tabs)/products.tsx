import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Card } from "../../src/components/Card";
import { ErrorMessage } from "../../src/components/ErrorMessage";
import { Header } from "../../src/components/Header";
import { Loading } from "../../src/components/Loading";
import { Screen } from "../../src/components/Screen";
import { SearchBar } from "../../src/components/SearchBar";
import { useApp } from "../../src/context/AppContext";
import { colors, radius, spacing, typography } from "../../src/styles/theme";

export default function ProductsScreen() {
  const { products, loading, error, loadProducts } = useApp();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (products.length === 0) loadProducts();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const t = (p.title || "").toLowerCase();
      const c = (p.category || "").toLowerCase();
      return t.includes(q) || c.includes(q);
    });
  }, [products, query]);

  const gutter = spacing.md;
  const columns = 2;
  const itemWidth = Math.floor((width - spacing.md * 2 - gutter) / columns);

  return (
    <Screen>
      <Header title="Products" />
      <View
        style={{
          flex: 1,
          padding: spacing.md,
          gap: spacing.md,
          paddingBottom: 120,
        }}
      >
        {error ? <ErrorMessage message={error} onRetry={loadProducts} /> : null}
        {loading.products ? <Loading /> : null}

        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search products or categories"
        />

        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={{ gap: gutter }}
          contentContainerStyle={{ gap: gutter, paddingBottom: spacing["2xl"] }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/product/[id]",
                  params: { id: String(item.id) },
                })
              }
              style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
            >
              <Card style={{ width: itemWidth, padding: spacing.sm }}>
                <View style={{ gap: spacing.sm }}>
                  <View
                    style={{
                      borderRadius: radius.xl,
                      overflow: "hidden",
                      backgroundColor: colors.surfaceContainerLow,
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: "100%",
                        height: 120,
                        backgroundColor: colors.surfaceContainerLow,
                      }}
                      resizeMode="contain"
                    />
                  </View>

                  <View style={{ gap: spacing.xs }}>
                    <Text
                      style={[
                        typography.headlineSm,
                        { fontSize: 14, color: colors.onSurface },
                      ]}
                      numberOfLines={2}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        typography.labelMd,
                        { color: colors.onSurfaceVariant },
                      ]}
                      numberOfLines={1}
                    >
                      {item.category}
                    </Text>
                    <Text
                      style={[
                        typography.bodyLg,
                        { color: colors.primary, fontWeight: "800" },
                      ]}
                      numberOfLines={1}
                    >
                      ${item.price}
                    </Text>
                  </View>
                </View>
              </Card>
            </Pressable>
          )}
          ListEmptyComponent={
            !loading.products ? (
              <Card>
                <Text
                  style={[
                    typography.bodyLg,
                    { color: colors.onSurfaceVariant },
                  ]}
                >
                  {query.trim()
                    ? "No matches found."
                    : "No products loaded yet."}
                </Text>
              </Card>
            ) : null
          }
        />
      </View>
    </Screen>
  );
}
