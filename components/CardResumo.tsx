// Importa componentes básicos
import { StyleSheet, Text, View } from "react-native";

// Tipo das propriedades recebidas pelo card
type Props = {
  titulo: string;
  valor: number;
};

// Componente que mostra um card de valor
export default function CardResumo({ titulo, valor }: Props) {
  return (
    <View style={styles.card}>
      {/* Título do card */}
      <Text style={styles.titulo}>{titulo}</Text>

      {/* Valor formatado em reais */}
      <Text style={styles.valor}>
        R$ {valor.toFixed(2).replace(".", ",")}
      </Text>
    </View>
  );
}

// Estilos do card
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  titulo: {
    color: "#555",
    fontSize: 14,
    marginBottom: 6,
  },

  valor: {
    color: "#111",
    fontSize: 24,
    fontWeight: "bold",
  },
});