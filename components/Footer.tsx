import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.texto}>Controle Financeiro</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#111827",
    padding: 12,
    alignItems: "center",
  },
  texto: {
    color: "white",
  },
});