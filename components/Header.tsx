// Importa componentes básicos
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Hook de responsividade
import { useResponsive } from "../hooks/use-responsive";

// Componente de cabeçalho superior
export default function Header({ titulo }: { titulo: string }) {
  // Respeita a área segura (notch, status bar) em qualquer dispositivo
  const insets = useSafeAreaInsets();

  const { horizontalPadding, contentMaxWidth, isLargeScreen, scale } =
    useResponsive();

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: insets.top + 16,
          paddingHorizontal: horizontalPadding,
        },
      ]}
    >
      {/* Em telas grandes o conteúdo interno fica centralizado */}
      <View
        style={[
          styles.conteudoInterno,
          isLargeScreen && { maxWidth: contentMaxWidth, alignSelf: "center" },
        ]}
      >
        {/* Nome do app */}
        <Text style={[styles.nomeApp, { fontSize: scale(14) }]}>
          Financeiro Fácil
        </Text>

        {/* Título da tela atual */}
        <Text style={[styles.titulo, { fontSize: scale(26) }]}>{titulo}</Text>
      </View>
    </View>
  );
}

// Estilos do cabeçalho
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2563eb",
    paddingBottom: 25,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },

  conteudoInterno: {
    width: "100%",
  },

  nomeApp: {
    color: "#dbeafe",
    fontWeight: "600",
  },

  titulo: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 5,
  },
});
