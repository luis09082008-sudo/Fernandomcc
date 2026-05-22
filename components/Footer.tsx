import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.texto}>App Financeiro desenvolvido em React Native</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 18,
    alignItems: "center",
  },
  texto: {
    color: "#6b7280",
    fontSize: 13,
  },
});