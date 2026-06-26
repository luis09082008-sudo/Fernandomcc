// Importa componentes básicos
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// Importa o tipo da transação
import { Transacao } from "./TransacoesContext";

// Hook de responsividade
import { useResponsive } from "../hooks/use-responsive";

// Cursor de mouse nos botões quando o app roda em um navegador
import { cursorPointer } from "../hooks/use-platform";

// Tipo das propriedades do item
type Props = {
  transacao: Transacao;
  marcarComoPago: (id: string) => void;
  apagarTransacao: (id: string) => void;
  // Estilo extra opcional, usado para controlar a largura do item
  // quando a lista vira uma grade (2+ colunas) em telas largas
  style?: StyleProp<ViewStyle>;
};

// Componente que mostra uma transação na lista
export default function ItemTransacao({
  transacao,
  marcarComoPago,
  apagarTransacao,
  style,
}: Props) {
  const { scale } = useResponsive();

  return (
    <View style={[styles.card, style]}>
      <View style={styles.topo}>
        <View style={styles.textos}>
          {/* Título da transação */}
          <Text
            style={[styles.titulo, { fontSize: scale(16) }]}
            numberOfLines={2}
          >
            {transacao.titulo}
          </Text>

          {/* Categoria da transação */}
          <Text style={[styles.categoria, { fontSize: scale(13) }]}>
            {transacao.categoria}
          </Text>
        </View>

        {/* Valor da transação */}
        <Text
          style={[
            styles.valor,
            { fontSize: scale(16) },
            transacao.tipo === "receita" ? styles.receita : styles.despesa,
          ]}
        >
          {transacao.tipo === "receita" ? "+" : "-"} R${" "}
          {transacao.valor.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      {/* Mostra se está pago ou pendente */}
      <Text style={[styles.status, { fontSize: scale(13) }]}>
        Status: {transacao.pago ? "Pago" : "Pendente"}
      </Text>

      <View style={styles.botoes}>
        {/* Botão para marcar como pago */}
        {!transacao.pago && (
          <TouchableOpacity
            style={[styles.botaoPago, cursorPointer]}
            onPress={() => marcarComoPago(transacao.id)}
          >
            <Text style={styles.textoBotao}>Marcar como pago</Text>
          </TouchableOpacity>
        )}

        {/* Botão para apagar */}
        <TouchableOpacity
          style={[styles.botaoApagar, cursorPointer]}
          onPress={() => apagarTransacao(transacao.id)}
        >
          <Text style={styles.textoBotao}>Apagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos do item
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    width: "100%",
  },

  topo: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  textos: {
    flex: 1,
  },

  titulo: {
    fontWeight: "bold",
    color: "#111",
  },

  categoria: {
    color: "#666",
    marginTop: 3,
  },

  valor: {
    fontWeight: "bold",
  },

  receita: {
    color: "#16a34a",
  },

  despesa: {
    color: "#dc2626",
  },

  status: {
    marginTop: 10,
    color: "#555",
  },

  botoes: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    gap: 10,
  },

  botaoPago: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 10,
  },

  botaoApagar: {
    backgroundColor: "#dc2626",
    padding: 10,
    borderRadius: 10,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
