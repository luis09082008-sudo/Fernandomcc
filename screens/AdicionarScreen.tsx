import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Props = {
  descricao: string;
  setDescricao: (texto: string) => void;

  valor: string;
  setValor: (texto: string) => void;

  tipo: "receita" | "despesa";
  setTipo: (tipo: "receita" | "despesa") => void;

  adicionarTransacao: () => void;
};

export default function AdicionarScreen({
  descricao,
  setDescricao,
  valor,
  setValor,
  tipo,
  setTipo,
  adicionarTransacao,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova Transação</Text>

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <View style={styles.linha}>
        <TouchableOpacity
          style={tipo === "despesa" ? styles.botaoAtivo : styles.botao}
          onPress={() => setTipo("despesa")}
        >
          <Text style={styles.textoBotao}>Despesa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tipo === "receita" ? styles.botaoAtivo : styles.botao}
          onPress={() => setTipo("receita")}
        >
          <Text style={styles.textoBotao}>Receita</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.botaoSalvar}
        onPress={adicionarTransacao}
      >
        <Text style={styles.textoBotao}>Salvar Transação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botao: {
    backgroundColor: "#6b7280",
    width: "48%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoAtivo: {
    backgroundColor: "#16a34a",
    width: "48%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoSalvar: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});