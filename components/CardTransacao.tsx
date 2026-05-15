import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Transacao } from "../types/Transacao";

type Props = {
  item: Transacao;
  marcarComoPago: (id: string) => void;
};

export default function CardTransacao({ item, marcarComoPago }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.descricao}</Text>

      <Text style={item.tipo === "receita" ? styles.receita : styles.despesa}>
        {item.tipo === "receita" ? "+" : "-"} R$ {item.valor.toFixed(2)}
      </Text>

      <Text>Status: {item.pago ? "Pago" : "Pendente"}</Text>

      {!item.pago && (
        <TouchableOpacity
          style={styles.botao}
          onPress={() => marcarComoPago(item.id)}
        >
          <Text style={styles.textoBotao}>Marcar como pago</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  receita: {
    color: "green",
    fontWeight: "bold",
  },
  despesa: {
    color: "red",
    fontWeight: "bold",
  },
  botao: {
    backgroundColor: "green",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});