// Importa componentes básicos
import { StyleSheet, Text, View } from "react-native";

// Pequeno footer informativo usado nas telas
export default function FooterInfo() {
  return (
    <View style={styles.footer}>
      <Text style={styles.texto}>Organize seus gastos de forma simples</Text>
    </View>
  );
}

// Estilos do footer
const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },

  texto: {
    color: "#777",
    fontSize: 12,
  },
});