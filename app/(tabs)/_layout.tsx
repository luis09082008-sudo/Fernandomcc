// Importa as abas do expo-router
import { Tabs } from "expo-router";

// Importa ícones simples do Expo
import { Ionicons } from "@expo/vector-icons";

// Garante que a barra de abas respeite a área segura (home indicator)
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Hook de responsividade
import { useResponsive } from "../../hooks/use-responsive";

// Layout das telas com menu inferior
export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { isLargeScreen, scale } = useResponsive();

  // Tamanho do ícone cresce levemente em tablets/telas grandes
  const tamanhoIcone = scale(24, { min: 22, max: 30 });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // Cor da aba selecionada
        tabBarActiveTintColor: "#2563eb",

        // Cor da aba não selecionada
        tabBarInactiveTintColor: "#777",

        // Estilo do footer/menu inferior, já considerando a área segura
        // (notch/home indicator) e telas largas (tablet/web)
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 8,
          paddingTop: 8,
        },

        // Em telas grandes, os itens da barra ficam mais espaçados e
        // centralizados, evitando que fiquem "perdidos" numa barra
        // muito larga
        tabBarItemStyle: isLargeScreen
          ? { maxWidth: 180 }
          : undefined,

        // Estilo do texto das abas
        tabBarLabelStyle: {
          fontSize: scale(12, { min: 11, max: 14 }),
          fontWeight: "600",
        },
      }}
    >
      {/* Tela Resumo */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Resumo",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={tamanhoIcone} color={color} />
          ),
        }}
      />

      {/* Tela Transações */}
      <Tabs.Screen
        name="transacoes"
        options={{
          title: "Transações",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-outline" size={tamanhoIcone} color={color} />
          ),
        }}
      />

      {/* Tela PIX */}
      <Tabs.Screen
        name="pix"
        options={{
          title: "PIX",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="swap-horizontal-outline"
              size={tamanhoIcone}
              color={color}
            />
          ),
        }}
      />

      {/* Tela Adicionar */}
      <Tabs.Screen
        name="adicionar"
        options={{
          title: "Adicionar",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="add-circle-outline"
              size={tamanhoIcone}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
