import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <Text style={styles.logo}>App Finanças</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#111827",
    padding: 20,
    paddingTop: 45,
    alignItems: "center",
  },
  logo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});