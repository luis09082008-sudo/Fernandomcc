import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ItemGrafico = {
  nome: string;
  valor: number;
  cor: string;
};

type Props = {
  dados: ItemGrafico[];
};

export default function GraficoBarras({ dados }: Props) {
  const maiorValor = Math.max(...dados.map((item) => item.valor), 1);

  return (
    <View style={styles.container}>
      {dados.map((item) => {
        const porcentagem = `${(item.valor / maiorValor) * 100}%` as `${number}%`;

        return (
          <View key={item.nome} style={styles.item}>
            <View style={styles.linhaTexto}>
              <Text style={styles.nome}>{item.nome}</Text>

              <Text style={styles.valor}>
                R$ {item.valor.toFixed(2).replace(".", ",")}
              </Text>
            </View>

            <View style={styles.fundoBarra}>
              <View
                style={[
                  styles.barra,
                  {
                    width: porcentagem,
                    backgroundColor: item.cor,
                  },
                ]}
              />
            </View>
          </View>
        );
      })}

      {dados.length === 0 && (
        <Text style={styles.vazio}>Nenhum dado para exibir.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  item: {
    marginBottom: 18,
  },
  linhaTexto: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  nome: {
    color: "#111827",
    fontWeight: "bold",
    fontSize: 15,
  },
  valor: {
    color: "#6b7280",
    fontSize: 14,
  },
  fundoBarra: {
    width: "100%",
    height: 18,
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
    overflow: "hidden",
  },
  barra: {
    height: "100%",
    borderRadius: 20,
  },
  vazio: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 20,
  },
});