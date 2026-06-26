// Importa o useState para controlar os campos
import { useState } from "react";

// Importa componentes básicos
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Importa componentes criados
import FooterInfo from "../../components/FooterInfo";
import Header from "../../components/Header";
import ResponsiveContainer from "../../components/ResponsiveContainer";

// Importa o hook das transações
import { useTransacoes } from "../../components/TransacoesContext";

// Hook de responsividade
import { useResponsive } from "../../hooks/use-responsive";

// Cursor de mouse nos botões quando o app roda em um navegador
import { cursorPointer } from "../../hooks/use-platform";

// Tela para adicionar transações
export default function AdicionarScreen() {
  // Estados dos campos do formulário
  const [titulo, setTitulo] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState<"receita" | "despesa">("despesa");

  // Função para adicionar transação
  const { adicionarTransacao } = useTransacoes();

  const { horizontalPadding, scale } = useResponsive();

  // Função chamada ao clicar no botão
  function salvar() {
    // Converte o valor digitado para número
    const valorNumerico = Number(valor.replace(",", "."));

    // Validação simples dos campos
    if (titulo.trim() === "") {
      Alert.alert("Atenção", "Digite o título da transação.");
      return;
    }

    if (categoria.trim() === "") {
      Alert.alert("Atenção", "Digite a categoria.");
      return;
    }

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert("Atenção", "Digite um valor válido.");
      return;
    }

    // Adiciona a transação
    adicionarTransacao(titulo, valorNumerico, tipo, categoria);

    // Limpa os campos
    setTitulo("");
    setValor("");
    setCategoria("");
    setTipo("despesa");

    Alert.alert("Sucesso", "Transação adicionada!");
  }

  return (
    <View style={styles.tela}>
      {/* Navbar superior */}
      <Header titulo="Adicionar transação" />

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
            <Text style={[styles.label, { fontSize: scale(14) }]}>Título</Text>
            <TextInput
              style={[styles.input, { fontSize: scale(16) }]}
              placeholder="Ex: Mercado"
              value={titulo}
              onChangeText={setTitulo}
            />

            <Text style={[styles.label, { fontSize: scale(14) }]}>Valor</Text>
            <TextInput
              style={[styles.input, { fontSize: scale(16) }]}
              placeholder="Ex: 50,00"
              value={valor}
              onChangeText={setValor}
              keyboardType="numeric"
            />

            <Text style={[styles.label, { fontSize: scale(14) }]}>Categoria</Text>
            <TextInput
              style={[styles.input, { fontSize: scale(16) }]}
              placeholder="Ex: Alimentação"
              value={categoria}
              onChangeText={setCategoria}
            />

            <Text style={[styles.label, { fontSize: scale(14) }]}>Tipo</Text>

            <View style={styles.linhaBotoes}>
              {/* Botão para escolher despesa */}
              <TouchableOpacity
                style={[
                  styles.botaoTipo,
                  tipo === "despesa" && styles.botaoSelecionado,
                  cursorPointer,
                ]}
                onPress={() => setTipo("despesa")}
              >
                <Text
                  style={[
                    styles.textoTipo,
                    tipo === "despesa" && styles.textoSelecionado,
                  ]}
                >
                  Despesa
                </Text>
              </TouchableOpacity>

              {/* Botão para escolher receita */}
              <TouchableOpacity
                style={[
                  styles.botaoTipo,
                  tipo === "receita" && styles.botaoSelecionado,
                  cursorPointer,
                ]}
                onPress={() => setTipo("receita")}
              >
                <Text
                  style={[
                    styles.textoTipo,
                    tipo === "receita" && styles.textoSelecionado,
                  ]}
                >
                  Receita
                </Text>
              </TouchableOpacity>
            </View>

            {/* Botão principal */}
            <TouchableOpacity
              style={[styles.botaoSalvar, cursorPointer]}
              onPress={salvar}
            >
              <Text style={[styles.textoSalvar, { fontSize: scale(16) }]}>
                Salvar transação
              </Text>
            </TouchableOpacity>

            <FooterInfo />
          </ResponsiveContainer>
        </ScrollView>
      </KeyboardAvoidingView>
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

  label: {
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    width: "100%",
  },

  linhaBotoes: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  botaoTipo: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  botaoSelecionado: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  textoTipo: {
    color: "#333",
    fontWeight: "bold",
  },

  textoSelecionado: {
    color: "#fff",
  },

  botaoSalvar: {
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    width: "100%",
  },

  textoSalvar: {
    color: "#fff",
    fontWeight: "bold",
  },
});
