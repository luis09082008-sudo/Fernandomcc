// Importa componentes básicos
import { FlatList, StyleSheet, Text, View } from "react-native";

// Importa componentes criados
import FooterInfo from "../../components/FooterInfo";
import Header from "../../components/Header";
import ItemTransacao from "../../components/ItemTransacao";

// Importa o hook das transações
import { useTransacoes } from "../../components/TransacoesContext";

// Hook de responsividade
import { useResponsive } from "../../hooks/use-responsive";

// Tela de lista de transações
export default function TransacoesScreen() {
  // Pega dados e funções do contexto
  const { transacoes, marcarComoPago, apagarTransacao } = useTransacoes();

  const { columns, horizontalPadding, contentMaxWidth, isLargeScreen } =
    useResponsive();

  return (
    <View style={styles.tela}>
      {/* Navbar superior */}
      <Header titulo="Minhas transações" />

      {/* Lista de transações.
          Em celular fica em 1 coluna (como antes).
          Em tablet/web a lista se organiza em 2 ou 3 colunas, e o
          conteúdo todo fica centralizado com largura máxima. */}
      <FlatList
        key={columns}
        data={transacoes}
        keyExtractor={(item) => item.id}
        numColumns={columns}
        columnWrapperStyle={columns > 1 ? styles.linhaGrid : undefined}
        contentContainerStyle={[
          styles.lista,
          { paddingHorizontal: horizontalPadding },
          isLargeScreen && {
            maxWidth: contentMaxWidth,
            alignSelf: "center",
            width: "100%",
          },
        ]}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhuma transação cadastrada ainda.
          </Text>
        }
        renderItem={({ item }) => (
          <ItemTransacao
            transacao={item}
            marcarComoPago={marcarComoPago}
            apagarTransacao={apagarTransacao}
            style={
              columns > 1
                ? { flexBasis: `${100 / columns - 2}%`, flexGrow: 1 }
                : undefined
            }
          />
        )}
        ListFooterComponent={<FooterInfo />}
      />
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  lista: {
    paddingTop: 20,
    paddingBottom: 30,
  },

  linhaGrid: {
    gap: 12,
    justifyContent: "flex-start",
  },

  vazio: {
    textAlign: "center",
    color: "#777",
    marginTop: 40,
    fontSize: 16,
  },
});
