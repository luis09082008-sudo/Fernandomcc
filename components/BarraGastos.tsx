// Importa componentes básicos
import { StyleSheet, Text, View } from "react-native";

// Importa o tipo da transação
import { Transacao } from "./TransacoesContext";

// Recebe a lista de transações
export default function BarraGastos({ transacoes }: { transacoes: Transacao[] }) {
  // Filtra somente despesas
  const despesas = transacoes.filter((item) => item.tipo === "despesa");

  // Soma o total de despesas
  const totalDespesas = despesas.reduce((soma, item) => soma + item.valor, 0);

  // Junta os gastos por categoria
  const categorias: { [key: string]: number } = {};

  despesas.forEach((item) => {
    if (categorias[item.categoria]) {
      categorias[item.categoria] += item.valor;
    } else {
      categorias[item.categoria] = item.valor;
    }
  });

  // Transforma o objeto em lista
  const listaCategorias = Object.keys(categorias).map((categoria) => ({
    categoria,
    valor: categorias[categoria],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gráfico simples de gastos</Text>

      {/* Caso não tenha despesas */}
      {listaCategorias.length === 0 && (
        <Text style={styles.vazio}>Nenhuma despesa cadastrada.</Text>
      )}

      {/* Mostra uma barra para cada categoria */}
      {listaCategorias.map((item) => {
        const porcentagem =
          totalDespesas > 0 ? (item.valor / totalDespesas) * 100 : 0;

        return (
          <View key={item.categoria} style={styles.item}>
            <View style={styles.linhaTexto}>
              <Text style={styles.categoria}>{item.categoria}</Text>
              <Text style={styles.valor}>
                R$ {item.valor.toFixed(2).replace(".", ",")}
              </Text>
            </View>

            <View style={styles.barraFundo}>
              <View style={[styles.barra, { width: `${porcentagem}%` }]} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

// Estilos do gráfico
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 10,
  },

  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14,
    color: "#111",
  },

  vazio: {
    color: "#777",
    fontSize: 14,
  },

  item: {
    marginBottom: 14,
  },

  linhaTexto: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  categoria: {
    fontSize: 14,
    color: "#333",
  },

  valor: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },

  barraFundo: {
    height: 10,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    overflow: "hidden",
  },

  barra: {
    height: 10,
    backgroundColor: "#2563eb",
    borderRadius: 10,
  },
});