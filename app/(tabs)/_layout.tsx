import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          height: 65,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: "#ffffff",
          borderTopColor: "#e5e7eb",
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
        }}
      />

      <Tabs.Screen
        name="resumo"
        options={{
          title: "Resumo",
        }}
      />
    </Tabs>
  );
}