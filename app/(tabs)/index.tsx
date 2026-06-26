// Importa componentes básicos
import { ScrollView, StyleSheet, View } from "react-native";

// Importa componentes criados
import BarraGastos from "../../components/BarraGastos";
import CardResumo from "../../components/CardResumo";
import FooterInfo from "../../components/FooterInfo";
import Header from "../../components/Header";
import ResponsiveContainer from "../../components/ResponsiveContainer";

// Importa o hook das transações
import { useTransacoes } from "../../components/TransacoesContext";

// Hook de responsividade
import { useResponsive } from "../../hooks/use-responsive";

// Tela principal de resumo
export default function ResumoScreen() {
  // Pega a lista de transações
  const { transacoes } = useTransacoes();

  const { horizontalPadding, isLargeScreen } = useResponsive();

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

      <ScrollView
        contentContainerStyle={[
          styles.conteudo,
          { paddingHorizontal: horizontalPadding },
        ]}
      >
        <ResponsiveContainer>
          {/* Em telas grandes (tablet/web) os cards ficam lado a lado,
              em celular eles continuam empilhados, um por linha */}
          <View style={[styles.linhaCards, isLargeScreen && styles.linhaCardsGrande]}>
            <CardResumo
              titulo="Saldo atual"
              valor={saldo}
              style={isLargeScreen ? styles.cardGrid : undefined}
            />
            <CardResumo
              titulo="Total de receitas"
              valor={totalReceitas}
              style={isLargeScreen ? styles.cardGrid : undefined}
            />
            <CardResumo
              titulo="Total de despesas"
              valor={totalDespesas}
              style={isLargeScreen ? styles.cardGrid : undefined}
            />
          </View>

          {/* Gráfico simples */}
          <BarraGastos transacoes={transacoes} />

          {/* Footer simples */}
          <FooterInfo />
        </ResponsiveContainer>
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
    paddingTop: 20,
    paddingBottom: 30,
  },

  linhaCards: {
    width: "100%",
  },

  linhaCardsGrande: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },

  cardGrid: {
    flexBasis: "31%",
    flexGrow: 1,
    marginBottom: 12,
  },
});
