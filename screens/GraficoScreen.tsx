import React from "react";
import { View, StyleSheet } from "react-native";

import Grafico from "../components/Grafico";

type Props = {
receitas: number;
despesas: number;
};

export default function GraficoScreen({
receitas,
despesas,
}: Props) {
return (
  <View style={styles.container}>
    <Grafico receitas={receitas} despesas={despesas} />
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 15,
},
});