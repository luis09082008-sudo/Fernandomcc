import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Componentes reutilizados, deixando o PIX visualmente consistente
// com o restante do app (mesmo cabeçalho e rodapé das outras telas)
import FooterInfo from "../../components/FooterInfo";
import Header from "../../components/Header";
import ResponsiveContainer from "../../components/ResponsiveContainer";

// Hook das transações: usado para debitar o valor do PIX do saldo
import { useTransacoes } from "../../components/TransacoesContext";

// Hook de responsividade
import { useResponsive } from "../../hooks/use-responsive";

// Cursor de mouse nos botões quando o app roda em um navegador
import { cursorPointer } from "../../hooks/use-platform";

export default function Pix() {
  const [chavePix, setChavePix] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const [comprovante, setComprovante] = useState("");

  const { horizontalPadding, scale } = useResponsive();

  // Mesma fonte de dados usada na tela de Resumo: assim o valor
  // enviado no PIX é debitado do saldo em todo o app
  const { transacoes, adicionarTransacao } = useTransacoes();

  // Recalcula o saldo atual (receitas - despesas) a partir das
  // transações já cadastradas, igual é feito na tela de Resumo
  const totalReceitas = transacoes
    .filter((item) => item.tipo === "receita")
    .reduce((soma, item) => soma + item.valor, 0);

  const totalDespesas = transacoes
    .filter((item) => item.tipo === "despesa")
    .reduce((soma, item) => soma + item.valor, 0);

  const saldoAtual = totalReceitas - totalDespesas;

  function enviarPix() {
    if (!chavePix || !valor) {
      Alert.alert("Preencha todos os campos.");
      return;
    }

    // Converte o valor digitado (aceita vírgula) para número
    const valorNumerico = Number(valor.replace(",", "."));

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert("Atenção", "Digite um valor de PIX válido.");
      return;
    }

    // Impede enviar um PIX maior do que o saldo disponível
    if (valorNumerico > saldoAtual) {
      Alert.alert(
        "Saldo insuficiente",
        `Seu saldo atual é R$ ${saldoAtual.toFixed(2).replace(".", ",")}, ` +
          "insuficiente para este PIX."
      );
      return;
    }

    // Registra o PIX como uma despesa, fazendo o saldo do app
    // (tela de Resumo e gráfico de gastos) diminuir automaticamente
    adicionarTransacao(
      `PIX enviado para ${chavePix}`,
      valorNumerico,
      "despesa",
      "PIX"
    );

    const novoSaldo = saldoAtual - valorNumerico;

    const textoComprovante = `
Comprovante PIX

Chave PIX: ${chavePix}
Valor: R$ ${valor}
Descrição: ${descricao}

Status: Transferência realizada com sucesso.
Novo saldo: R$ ${novoSaldo.toFixed(2).replace(".", ",")}
Data: ${new Date().toLocaleString()}
`;

    setComprovante(textoComprovante);

    // Limpa os campos para o próximo PIX
    setChavePix("");
    setValor("");
    setDescricao("");

    Alert.alert("Sucesso", "PIX realizado com sucesso!");
  }

  async function compartilharComprovante() {
    if (!comprovante) {
      Alert.alert("Faça um PIX primeiro.");
      return;
    }

    try {
      await Share.share({
        message: comprovante,
      });
    } catch (error) {
      Alert.alert("Erro ao compartilhar.");
    }
  }

  return (
    <View style={styles.tela}>
      {/* Navbar superior, igual às outras telas do app */}
      <Header titulo="Transferência PIX" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.conteudo,
            { paddingHorizontal: horizontalPadding },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <ResponsiveContainer>
            {/* Mostra o saldo disponível antes do envio */}
            <View style={styles.saldoBox}>
              <Text style={[styles.saldoLabel, { fontSize: scale(13) }]}>
                Saldo disponível
              </Text>
              <Text style={[styles.saldoValor, { fontSize: scale(20) }]}>
                R$ {saldoAtual.toFixed(2).replace(".", ",")}
              </Text>
            </View>

            <TextInput
              style={[styles.input, { fontSize: scale(16) }]}
              placeholder="Chave PIX"
              value={chavePix}
              onChangeText={setChavePix}
            />

            <TextInput
              style={[styles.input, { fontSize: scale(16) }]}
              placeholder="Valor"
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
            />

            <TextInput
              style={[styles.input, { fontSize: scale(16) }]}
              placeholder="Descrição (Opcional)"
              value={descricao}
              onChangeText={setDescricao}
            />

            <TouchableOpacity
              style={[styles.botao, cursorPointer]}
              onPress={enviarPix}
            >
              <Text style={[styles.textoBotao, { fontSize: scale(16) }]}>
                Enviar PIX
              </Text>
            </TouchableOpacity>

            {comprovante !== "" && (
              <>
                <View style={styles.card}>
                  <Text style={[styles.comprovante, { fontSize: scale(15) }]}>
                    {comprovante}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[styles.botaoCompartilhar, cursorPointer]}
                  onPress={compartilharComprovante}
                >
                  <Text style={[styles.textoBotao, { fontSize: scale(16) }]}>
                    Compartilhar Comprovante
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <FooterInfo />
          </ResponsiveContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  conteudo: {
    paddingTop: 20,
    paddingBottom: 30,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    width: "100%",
  },

  saldoBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  saldoLabel: {
    color: "#555",
    marginBottom: 4,
  },

  saldoValor: {
    color: "#2563eb",
    fontWeight: "bold",
  },

  botao: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    width: "100%",
  },

  botaoCompartilhar: {
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 15,
    width: "100%",
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    width: "100%",
  },

  comprovante: {
    color: "#374151",
  },
});
