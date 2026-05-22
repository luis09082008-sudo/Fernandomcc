import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

import CardResumo from "../../components/CardResumo";
import Footer from "../../components/Footer";
import FormTransacao from "../../components/FormTransacao";
import ItemTransacao from "../../components/ItemTransacao";
import Navbar from "../../components/Navbar";
import { useFinanceiro } from "../../contexts/FinanceContext";

export default function TelaInicial() {
  const {
    transacoes,
    adicionarTransacao,
    marcarComoPago,
    removerTransacao,
    totalReceitas,
    totalDespesas,
    saldo,
    despesasPendentes,
  } = useFinanceiro();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={transacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemTransacao
            item={item}
            marcarComoPago={marcarComoPago}
            removerTransacao={removerTransacao}
          />
        )}
        ListHeaderComponent={
          <>
            <Navbar
              titulo="Meu Financeiro"
              subtitulo="Controle suas receitas e despesas"
            />

            <View style={styles.areaCards}>
              <CardResumo
                titulo="Receitas"
                valor={totalReceitas}
                cor="#16a34a"
              />

              <CardResumo
                titulo="Despesas"
                valor={totalDespesas}
                cor="#dc2626"
              />

              <CardResumo titulo="Saldo" valor={saldo} cor="#2563eb" />

              <CardResumo
                titulo="Despesas pendentes"
                valor={despesasPendentes}
                cor="#f97316"
              />
            </View>

            <FormTransacao adicionarTransacao={adicionarTransacao} />

            <Text style={styles.tituloLista}>Transações</Text>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.listaVazia}>Nenhuma transação cadastrada.</Text>
        }
        ListFooterComponent={<Footer />}
        contentContainerStyle={styles.conteudoLista}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  conteudoLista: {
    paddingBottom: 20,
  },
  areaCards: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  tituloLista: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#111827",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 12,
  },
  listaVazia: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 20,
  },
});