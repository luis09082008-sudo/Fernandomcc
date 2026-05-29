// Importa as abas do expo-router
import { Tabs } from "expo-router";

// Importa ícones simples do Expo
import { Ionicons } from "@expo/vector-icons";

// Layout das telas com menu inferior
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // Cor da aba selecionada
        tabBarActiveTintColor: "#2563eb",

        // Cor da aba não selecionada
        tabBarInactiveTintColor: "#777",

        // Estilo do footer/menu inferior
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },

        // Estilo do texto das abas
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      {/* Tela Resumo */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Resumo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Tela Transações */}
      <Tabs.Screen
        name="transacoes"
        options={{
          title: "Transações",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Tela Adicionar */}
      <Tabs.Screen
        name="adicionar"
        options={{
          title: "Adicionar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}