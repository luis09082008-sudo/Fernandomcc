// Importa componentes básicos
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Importa o tipo da transação
import { Transacao } from "./TransacoesContext";

// Tipo das propriedades do item
type Props = {
  transacao: Transacao;
  marcarComoPago: (id: string) => void;
  apagarTransacao: (id: string) => void;
};

// Componente que mostra uma transação na lista
export default function ItemTransacao({
  transacao,
  marcarComoPago,
  apagarTransacao,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <View>
          {/* Título da transação */}
          <Text style={styles.titulo}>{transacao.titulo}</Text>

          {/* Categoria da transação */}
          <Text style={styles.categoria}>{transacao.categoria}</Text>
        </View>

        {/* Valor da transação */}
        <Text
          style={[
            styles.valor,
            transacao.tipo === "receita" ? styles.receita : styles.despesa,
          ]}
        >
          {transacao.tipo === "receita" ? "+" : "-"} R${" "}
          {transacao.valor.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      {/* Mostra se está pago ou pendente */}
      <Text style={styles.status}>
        Status: {transacao.pago ? "Pago" : "Pendente"}
      </Text>

      <View style={styles.botoes}>
        {/* Botão para marcar como pago */}
        {!transacao.pago && (
          <TouchableOpacity
            style={styles.botaoPago}
            onPress={() => marcarComoPago(transacao.id)}
          >
            <Text style={styles.textoBotao}>Marcar como pago</Text>
          </TouchableOpacity>
        )}

        {/* Botão para apagar */}
        <TouchableOpacity
          style={styles.botaoApagar}
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
  },

  topo: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },

  categoria: {
    color: "#666",
    marginTop: 3,
  },

  valor: {
    fontSize: 16,
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