import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  titulo: string;
  valor: number;
  cor: string;
};

export default function CardResumo({ titulo, valor, cor }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{titulo}</Text>

      <Text style={[styles.valor, { color: cor }]}>
        R$ {valor.toFixed(2).replace(".", ",")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  titulo: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 8,
  },
  valor: {
    fontSize: 23,
    fontWeight: "bold",
  },
});