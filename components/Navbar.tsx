import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  titulo: string;
  subtitulo: string;
};

export default function Navbar({ titulo, subtitulo }: Props) {
  return (
    <View style={styles.navbar}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.subtitulo}>{subtitulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#2563eb",
    paddingTop: 55,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  titulo: {
    color: "#ffffff",
    fontSize: 27,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#dbeafe",
    fontSize: 15,
    marginTop: 6,
  },
});