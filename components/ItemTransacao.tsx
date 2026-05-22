import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Transacao } from "../contexts/FinanceContext";

type Props = {
  item: Transacao;
  marcarComoPago: (id: string) => void;
  removerTransacao: (id: string) => void;
};

export default function ItemTransacao({
  item,
  marcarComoPago,
  removerTransacao,
}: Props) {
  const corValor = item.tipo === "receita" ? "#16a34a" : "#dc2626";
  const sinal = item.tipo === "receita" ? "+" : "-";

  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <View style={styles.areaTexto}>
          <Text style={styles.descricao}>{item.descricao}</Text>

          <Text style={[styles.valor, { color: corValor }]}>
            {sinal} R$ {item.valor.toFixed(2).replace(".", ",")}
          </Text>

          <Text style={styles.data}>{item.data}</Text>
        </View>

        <View
          style={[
            styles.status,
            item.pago ? styles.statusPago : styles.statusPendente,
          ]}
        >
          <Text style={styles.textoStatus}>
            {item.pago ? "Pago" : "Pendente"}
          </Text>
        </View>
      </View>

      <View style={styles.areaBotoes}>
        {item.tipo === "despesa" && item.pago === false && (
          <TouchableOpacity
            style={styles.botaoPago}
            onPress={() => marcarComoPago(item.id)}
          >
            <Text style={styles.textoBotao}>Marcar como pago</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() => removerTransacao(item.id)}
        >
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 15,
    borderRadius: 18,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  topo: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  areaTexto: {
    flex: 1,
  },
  descricao: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
  },
  valor: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  data: {
    color: "#6b7280",
    fontSize: 13,
    marginTop: 4,
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  statusPago: {
    backgroundColor: "#dcfce7",
  },
  statusPendente: {
    backgroundColor: "#fee2e2",
  },
  textoStatus: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
  },
  areaBotoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  botaoPago: {
    flex: 1,
    backgroundColor: "#22c55e",
    padding: 11,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoExcluir: {
    flex: 1,
    backgroundColor: "#ef4444",
    padding: 11,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 13,
  },
});