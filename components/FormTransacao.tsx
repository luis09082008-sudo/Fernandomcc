import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { TipoTransacao } from "../contexts/FinanceContext";

type Props = {
  adicionarTransacao: (
    descricao: string,
    valor: number,
    tipo: TipoTransacao
  ) => void;
};

export default function FormTransacao({ adicionarTransacao }: Props) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<TipoTransacao>("despesa");

  function limparFormulario() {
    setDescricao("");
    setValor("");
    setTipo("despesa");
  }

  function salvarTransacao() {
    const descricaoTratada = descricao.trim();
    const valorTratado = valor.replace(",", ".");

    if (descricaoTratada.length === 0) {
      alert("Digite uma descrição.");
      return;
    }

    if (valorTratado.length === 0) {
      alert("Digite um valor.");
      return;
    }

    const valorConvertido = Number(valorTratado);

    if (isNaN(valorConvertido) || valorConvertido <= 0) {
      alert("Digite um valor válido.");
      return;
    }

    adicionarTransacao(descricaoTratada, valorConvertido, tipo);
    limparFormulario();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova transação</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Mercado, salário, internet..."
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <View style={styles.areaTipos}>
        <TouchableOpacity
          style={[
            styles.botaoTipo,
            tipo === "receita" && styles.botaoReceitaSelecionado,
          ]}
          onPress={() => setTipo("receita")}
        >
          <Text
            style={[
              styles.textoTipo,
              tipo === "receita" && styles.textoTipoSelecionado,
            ]}
          >
            Receita
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botaoTipo,
            tipo === "despesa" && styles.botaoDespesaSelecionado,
          ]}
          onPress={() => setTipo("despesa")}
        >
          <Text
            style={[
              styles.textoTipo,
              tipo === "despesa" && styles.textoTipoSelecionado,
            ]}
          >
            Despesa
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarTransacao}>
        <Text style={styles.textoSalvar}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
    padding: 16,
    borderRadius: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  titulo: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 14,
    color: "#111827",
  },
  input: {
    backgroundColor: "#f3f4f6",
    padding: 13,
    borderRadius: 12,
    fontSize: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  areaTipos: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  botaoTipo: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    padding: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  botaoReceitaSelecionado: {
    backgroundColor: "#16a34a",
  },
  botaoDespesaSelecionado: {
    backgroundColor: "#dc2626",
  },
  textoTipo: {
    fontWeight: "bold",
    color: "#374151",
  },
  textoTipoSelecionado: {
    color: "#ffffff",
  },
  botaoSalvar: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  textoSalvar: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});