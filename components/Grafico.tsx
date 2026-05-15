import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  receitas: number;
  despesas: number;
};

export default function Grafico({ receitas, despesas }: Props) {
  return (
    <View>
      <Text>Receitas</Text>

      <View style={styles.fundo}>
        <View
          style={[
            styles.receita,
            { width: `${Math.min(receitas / 20, 100)}%` },
          ]}
        />
      </View>

      <Text>Despesas</Text>

      <View style={styles.fundo}>
        <View
          style={[
            styles.despesa,
            { width: `${Math.min(despesas / 20, 100)}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    backgroundColor: "#d1d5db",
    height: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  receita: {
    backgroundColor: "green",
    height: 30,
    borderRadius: 8,
  },
  despesa: {
    backgroundColor: "red",
    height: 30,
    borderRadius: 8,
  },
});