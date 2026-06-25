import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Share,
} from "react-native";

export default function Pix() {
  const [chavePix, setChavePix] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const [comprovante, setComprovante] = useState("");

  function enviarPix() {
    if (!chavePix || !valor) {
      Alert.alert("Preencha todos os campos.");
      return;
    }

    const textoComprovante = `
Comprovante PIX

Chave PIX: ${chavePix}
Valor: R$ ${valor}
Descrição: ${descricao}

Status: Transferência realizada com sucesso.
Data: ${new Date().toLocaleString()}
`;

    setComprovante(textoComprovante);

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
    <View style={styles.container}>
      <Text style={styles.titulo}>Transferência PIX</Text>

      <TextInput
        style={styles.input}
        placeholder="Chave PIX"
        value={chavePix}
        onChangeText={setChavePix}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição (Opcional)"
        value={descricao}
        onChangeText={setDescricao}
      />

      <TouchableOpacity style={styles.botao} onPress={enviarPix}>
        <Text style={styles.textoBotao}>Enviar PIX</Text>
      </TouchableOpacity>

      {comprovante !== "" && (
        <>
          <View style={styles.card}>
            <Text style={styles.comprovante}>{comprovante}</Text>
          </View>

          <TouchableOpacity
            style={styles.botaoCompartilhar}
            onPress={compartilharComprovante}
          >
            <Text style={styles.textoBotao}>Compartilhar Comprovante</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  botao: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
  },

  botaoCompartilhar: {
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 15,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },

  comprovante: {
    fontSize: 15,
    color: "#374151",
  },
});