import * as ImagePicker from "expo-image-picker";
import React, { useMemo, useState } from "react";
import { Alert, Image, ScrollView, View } from "react-native";
import { Button } from "../../src/components/Button";
import { ErrorMessage } from "../../src/components/ErrorMessage";
import { Header } from "../../src/components/Header";
import { Input } from "../../src/components/Input";
import { Screen } from "../../src/components/Screen";
import { useApp } from "../../src/context/AppContext";
import { colors, radius, spacing } from "../../src/styles/theme";

type FieldErrors = Partial<
  Record<"title" | "price" | "description" | "category" | "image", string>
>;

export default function AddProductScreen() {
  const { addProduct, loading, error, clearError } = useApp();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(""); // can be URL or local file uri
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const canSubmit = useMemo(() => !loading.addProduct, [loading.addProduct]);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!title.trim()) next.title = "Title is required";
    if (!price.trim()) next.price = "Price is required";
    if (price.trim() && Number.isNaN(Number(price)))
      next.price = "Price must be a number";
    if (!description.trim()) next.description = "Description is required";
    if (!category.trim()) next.category = "Category is required";
    if (!image.trim()) next.image = "Image is required (pick or paste URL)";
    return next;
  };

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        "Permission needed",
        "Please allow photo library access to pick an image.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;
    const asset = result.assets?.[0];
    if (!asset?.uri) return;
    console.log(asset.uri);

    setImage(asset.uri);
    setFieldErrors((prev) => ({ ...prev, image: undefined }));
  };

  const onSubmit = async () => {
    clearError();
    const nextErrors = validate();
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    await addProduct({
      title: title.trim(),
      price: Number(price),
      description: description.trim(),
      category: category.trim(),
      image: image.trim(),
    });

    Alert.alert("Success", "Product added");
    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImage("");
    setFieldErrors({});
  };

  return (
    <Screen>
      <Header title="Add Product" />
      <ScrollView
        contentContainerStyle={{
          padding: spacing.md,
          gap: spacing.md,
          paddingBottom: 140,
        }}
      >
        {error ? <ErrorMessage message={error} /> : null}

        <Input
          label="Title"
          value={title}
          onChangeText={setTitle}
          error={fieldErrors.title}
        />
        <Input
          label="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          error={fieldErrors.price}
        />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          error={fieldErrors.description}
        />
        <Input
          label="Category"
          value={category}
          onChangeText={setCategory}
          error={fieldErrors.category}
        />

        <View style={{ gap: spacing.sm }}>
          <Button
            title="Pick Image"
            variant="secondary"
            onPress={pickImage}
            disabled={!canSubmit}
          />

          {!!image && (
            <View
              style={{
                backgroundColor: colors.surfaceContainerLow,
                borderRadius: radius.xl,
                padding: spacing.md,
              }}
            >
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: 220,
                  borderRadius: radius.lg,
                  backgroundColor: colors.surface,
                }}
                resizeMode="contain"
              />
              {/* <Text
                style={{ marginTop: spacing.sm, color: colors.textMuted }}
                numberOfLines={2}
              >
                {image}
              </Text> */}
            </View>
          )}

          {/* <Input
            label="Image URL (optional)"
            value={image}
            onChangeText={setImage}
            placeholder="Paste an image URL or use Pick Image"
            error={fieldErrors.image}
          /> */}
        </View>

        <View style={{ height: spacing.sm }} />
        <Button
          title={loading.addProduct ? "Saving..." : "Add Product"}
          onPress={onSubmit}
          disabled={!canSubmit}
        />
      </ScrollView>
    </Screen>
  );
}
