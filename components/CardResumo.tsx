// Importa componentes básicos
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

// Hook de responsividade
import { useResponsive } from "../hooks/use-responsive";

// Tipo das propriedades recebidas pelo card
type Props = {
  titulo: string;
  valor: number;
  // Estilo extra opcional, usado para controlar a largura do card
  // quando ele aparece dentro de uma grade (grid) em telas largas
  style?: StyleProp<ViewStyle>;
};

// Componente que mostra um card de valor
export default function CardResumo({ titulo, valor, style }: Props) {
  const { scale } = useResponsive();

  return (
    <View style={[styles.card, style]}>
      {/* Título do card */}
      <Text style={[styles.titulo, { fontSize: scale(14) }]}>{titulo}</Text>

      {/* Valor formatado em reais */}
      <Text style={[styles.valor, { fontSize: scale(24) }]} numberOfLines={1} adjustsFontSizeToFit>
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
    width: "100%",
  },

  titulo: {
    color: "#555",
    marginBottom: 6,
  },

  valor: {
    color: "#111",
    fontWeight: "bold",
  },
});
