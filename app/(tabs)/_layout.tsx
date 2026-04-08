import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { colors } from "../../src/styles/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "rgba(73, 68, 86, 0.72)",
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 12,
          height: 64,
          borderRadius: 24,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={34}
            style={{
              flex: 1,
              borderRadius: 24,
              overflow: "hidden",
              backgroundColor: "rgba(248, 249, 254, 0.70)",
            }}
          />
        ),
        tabBarItemStyle: { paddingVertical: 10 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          tabBarIcon: ({ color, size }) => <Feather name="users" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          tabBarIcon: ({ color, size }) => <Feather name="shopping-bag" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="add-product"
        options={{
          title: "Add",
          tabBarIcon: ({ color, size }) => <Feather name="plus-circle" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

