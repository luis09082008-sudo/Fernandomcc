import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import Footer from "../../components/Footer";
import GraficoBarras from "../../components/GraficoBarras";
import Navbar from "../../components/Navbar";
import { useFinanceiro } from "../../contexts/FinanceContext";

export default function TelaResumo() {
  const {
    transacoes,
    totalReceitas,
    totalDespesas,
    saldo,
    despesasPendentes,
  } = useFinanceiro();

  const quantidadeReceitas = transacoes.filter(
    (item) => item.tipo === "receita"
  ).length;

  const quantidadeDespesas = transacoes.filter(
    (item) => item.tipo === "despesa"
  ).length;

  const quantidadePagas = transacoes.filter((item) => item.pago).length;

  const quantidadePendentes = transacoes.filter((item) => !item.pago).length;

  const dadosGrafico = [
    {
      nome: "Receitas",
      valor: totalReceitas,
      cor: "#16a34a",
    },
    {
      nome: "Despesas",
      valor: totalDespesas,
      cor: "#dc2626",
    },
    {
      nome: "Pendentes",
      valor: despesasPendentes,
      cor: "#f97316",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Navbar
          titulo="Resumo"
          subtitulo="Acompanhe os resultados financeiros"
        />

        <View style={styles.cardPrincipal}>
          <Text style={styles.tituloCard}>Gráfico financeiro</Text>

          <GraficoBarras dados={dadosGrafico} />
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.tituloCard}>Informações gerais</Text>

          <View style={styles.linhaInfo}>
            <Text style={styles.textoInfo}>Total de receitas</Text>
            <Text style={styles.valorReceita}>
              R$ {totalReceitas.toFixed(2).replace(".", ",")}
            </Text>
          </View>

          <View style={styles.linhaInfo}>
            <Text style={styles.textoInfo}>Total de despesas</Text>
            <Text style={styles.valorDespesa}>
              R$ {totalDespesas.toFixed(2).replace(".", ",")}
            </Text>
          </View>

          <View style={styles.linhaInfo}>
            <Text style={styles.textoInfo}>Saldo final</Text>
            <Text style={styles.valorSaldo}>
              R$ {saldo.toFixed(2).replace(".", ",")}
            </Text>
          </View>

          <View style={styles.divisor} />

          <View style={styles.linhaInfo}>
            <Text style={styles.textoInfo}>Receitas cadastradas</Text>
            <Text style={styles.numero}>{quantidadeReceitas}</Text>
          </View>

          <View style={styles.linhaInfo}>
            <Text style={styles.textoInfo}>Despesas cadastradas</Text>
            <Text style={styles.numero}>{quantidadeDespesas}</Text>
          </View>

          <View style={styles.linhaInfo}>
            <Text style={styles.textoInfo}>Transações pagas</Text>
            <Text style={styles.numero}>{quantidadePagas}</Text>
          </View>

          <View style={styles.linhaInfo}>
            <Text style={styles.textoInfo}>Transações pendentes</Text>
            <Text style={styles.numero}>{quantidadePendentes}</Text>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  cardPrincipal: {
    backgroundColor: "#ffffff",
    margin: 16,
    padding: 16,
    borderRadius: 18,
    elevation: 3,
  },

  cardInfo: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 18,
    elevation: 3,
  },

  tituloCard: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },

  linhaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  textoInfo: {
    color: "#374151",
    fontSize: 15,
  },

  valorReceita: {
    color: "#16a34a",
    fontWeight: "bold",
  },

  valorDespesa: {
    color: "#dc2626",
    fontWeight: "bold",
  },

  valorSaldo: {
    color: "#2563eb",
    fontWeight: "bold",
  },

  numero: {
    color: "#111827",
    fontWeight: "bold",
  },

  divisor: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 8,
  },
});