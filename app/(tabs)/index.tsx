// Importa componentes básicos
import { ScrollView, StyleSheet, View } from "react-native";

// Importa componentes criados
import BarraGastos from "../../components/BarraGastos";
import CardResumo from "../../components/CardResumo";
import FooterInfo from "../../components/FooterInfo";
import Header from "../../components/Header";

// Importa o hook das transações
import { useTransacoes } from "../../components/TransacoesContext";

// Tela principal de resumo
export default function ResumoScreen() {
  // Pega a lista de transações
  const { transacoes } = useTransacoes();

  // Soma todas as receitas
  const totalReceitas = transacoes
    .filter((item) => item.tipo === "receita")
    .reduce((soma, item) => soma + item.valor, 0);

  // Soma todas as despesas
  const totalDespesas = transacoes
    .filter((item) => item.tipo === "despesa")
    .reduce((soma, item) => soma + item.valor, 0);

  // Calcula o saldo final
  const saldo = totalReceitas - totalDespesas;

  return (
    <View style={styles.tela}>
      {/* Navbar superior */}
      <Header titulo="Resumo financeiro" />

      <ScrollView contentContainerStyle={styles.conteudo}>
        {/* Cards de resumo */}
        <CardResumo titulo="Saldo atual" valor={saldo} />
        <CardResumo titulo="Total de receitas" valor={totalReceitas} />
        <CardResumo titulo="Total de despesas" valor={totalDespesas} />

        {/* Gráfico simples */}
        <BarraGastos transacoes={transacoes} />

        {/* Footer simples */}
        <FooterInfo />
      </ScrollView>
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  conteudo: {
    padding: 20,
    paddingBottom: 30,
  },
});