import React, { useEffect, useMemo, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Card } from "../../src/components/Card";
import { ErrorMessage } from "../../src/components/ErrorMessage";
import { Header } from "../../src/components/Header";
import { Loading } from "../../src/components/Loading";
import { Screen } from "../../src/components/Screen";
import { useApp } from "../../src/context/AppContext";
import { fetchProductById, type ApiProduct } from "../../src/services/api";
import { colors, radius, spacing, typography } from "../../src/styles/theme";

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const idNum = Number(params.id);

  const { products } = useApp();
  const existing = useMemo(() => products.find((p) => p.id === idNum), [products, idNum]);

  const [product, setProduct] = useState<ApiProduct | null>(existing ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!Number.isFinite(idNum)) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductById(idNum);
      setProduct(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!product) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idNum]);

  return (
    <Screen>
      <Header title="Product Details" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={{ padding: spacing.md, gap: spacing.md, paddingBottom: 140 }}>
        {error ? <ErrorMessage message={error} onRetry={load} /> : null}
        {loading ? <Loading /> : null}

        {product ? (
          <>
            <Card>
              <Image
                source={{ uri: product.image }}
                style={{
                  width: "100%",
                  height: 240,
                  borderRadius: radius.xl,
                  backgroundColor: colors.surfaceContainerLow,
                }}
                resizeMode="contain"
              />
              <View style={{ height: spacing.md }} />
              <Text style={[typography.headlineSm, { fontSize: 18, color: colors.onSurface }]}>
                {product.title}
              </Text>
              <Text style={[typography.labelMd, { marginTop: spacing.xs, color: colors.onSurfaceVariant }]}>
                {product.category}
              </Text>
              <Text style={[typography.displayLg, { marginTop: spacing.sm, fontSize: 22, color: colors.primary }]}>
                ${product.price}
              </Text>
            </Card>

            <Card>
              <Text style={[typography.headlineSm, { color: colors.onSurface, marginBottom: spacing.sm }]}>
                Description
              </Text>
              <Text style={[typography.bodyLg, { color: colors.onSurface }]}>{product.description}</Text>
            </Card>

            <Card>
              <Text style={[typography.headlineSm, { color: colors.onSurface, marginBottom: spacing.sm }]}>
                Rating
              </Text>
              <Text style={[typography.bodyLg, { color: colors.onSurface }]}>
                {product.rating ? `${product.rating.rate} (${product.rating.count} reviews)` : "—"}
              </Text>
            </Card>
          </>
        ) : (
          !loading && (
            <View style={{ padding: spacing.md }}>
              <Text style={[typography.bodyLg, { color: colors.onSurfaceVariant }]}>Product not found.</Text>
            </View>
          )
        )}
      </ScrollView>
    </Screen>
  );
}

