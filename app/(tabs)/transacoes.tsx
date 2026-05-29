// Importa componentes básicos
import { FlatList, StyleSheet, Text, View } from "react-native";

// Importa componentes criados
import FooterInfo from "../../components/FooterInfo";
import Header from "../../components/Header";
import ItemTransacao from "../../components/ItemTransacao";

// Importa o hook das transações
import { useTransacoes } from "../../components/TransacoesContext";

// Tela de lista de transações
export default function TransacoesScreen() {
  // Pega dados e funções do contexto
  const { transacoes, marcarComoPago, apagarTransacao } = useTransacoes();

  return (
    <View style={styles.tela}>
      {/* Navbar superior */}
      <Header titulo="Minhas transações" />

      {/* Lista de transações */}
      <FlatList
        data={transacoes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
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
    padding: 20,
    paddingBottom: 30,
  },

  vazio: {
    textAlign: "center",
    color: "#777",
    marginTop: 40,
    fontSize: 16,
  },
});