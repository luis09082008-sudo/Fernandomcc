import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import CardTransacao from "../components/CardTransacao";
import { Transacao } from "../types/Transacao";

type Props = {
  transacoes: Transacao[];
  marcarComoPago: (id: string) => void;
};

export default function ListaScreen({
  transacoes,
  marcarComoPago,
}: Props) {
  const totalReceitas = transacoes
    .filter((item) => item.tipo === "receita")
    .reduce((soma, item) => soma + item.valor, 0);

  const totalDespesas = transacoes
    .filter((item) => item.tipo === "despesa")
    .reduce((soma, item) => soma + item.valor, 0);

  const saldo = totalReceitas - totalDespesas;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumo Financeiro</Text>

      <Text>Receitas: R$ {totalReceitas.toFixed(2)}</Text>
      <Text>Despesas: R$ {totalDespesas.toFixed(2)}</Text>
      <Text style={styles.saldo}>Saldo: R$ {saldo.toFixed(2)}</Text>

      <FlatList
        data={transacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardTransacao
            item={item}
            marcarComoPago={marcarComoPago}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  saldo: {
    fontWeight: "bold",
    marginBottom: 15,
  },
});