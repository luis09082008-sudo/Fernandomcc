// Importa componentes básicos
import { StyleSheet, Text, View } from "react-native";

// Componente de cabeçalho superior
export default function Header({ titulo }: { titulo: string }) {
  return (
    <View style={styles.header}>
      {/* Nome do app */}
      <Text style={styles.nomeApp}>Financeiro Fácil</Text>

      {/* Título da tela atual */}
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}

// Estilos do cabeçalho
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2563eb",
    paddingTop: 55,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },

  nomeApp: {
    color: "#dbeafe",
    fontSize: 14,
    fontWeight: "600",
  },

  titulo: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 5,
  },
});