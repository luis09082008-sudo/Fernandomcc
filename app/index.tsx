import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import {
  signInWithEmailAndPassword,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth";

import { auth, googleProvider } from "../firebaseConfig";

import QRCode from "react-native-qrcode-svg";

import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const urlAplicativo = "https://app-financas-89241.web.app";

  // LOGIN COM EMAIL E SENHA
  async function loginEmail() {
    if (!email || !senha) {
      Alert.alert(
        "Atenção",
        "Digite seu e-mail e sua senha."
      );
      return;
    }

    try {
      setCarregando(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );

      router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Erro ao entrar",
        "E-mail ou senha incorretos."
      );
    } finally {
      setCarregando(false);
    }
  }

  // LOGIN GOOGLE
  async function loginGoogle() {
    try {
      if (Platform.OS !== "web") {
        Alert.alert(
          "Google",
          "O login Google desta versão está configurado para a versão Web."
        );
        return;
      }

      setCarregando(true);

      await signInWithPopup(
        auth,
        googleProvider
      );

      router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível entrar com o Google."
      );
    } finally {
      setCarregando(false);
    }
  }

  // LOGIN ANÔNIMO
  async function loginAnonimo() {
    try {
      setCarregando(true);

      await signInAnonymously(auth);

      router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível entrar como visitante."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>

          {/* LOGO / NOME */}
          <View style={styles.logo}>
            <Text style={styles.logoText}>
              $
            </Text>
          </View>

          <Text style={styles.titulo}>
            App Finanças
          </Text>

          <Text style={styles.subtitulo}>
            Controle suas finanças de forma simples
          </Text>

          {/* EMAIL */}
          <Text style={styles.label}>
            E-mail
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {/* SENHA */}
          <Text style={styles.label}>
            Senha
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          {/* BOTÃO EMAIL */}
          <TouchableOpacity
            style={styles.botaoPrincipal}
            onPress={loginEmail}
            disabled={carregando}
          >
            <Text style={styles.textoBotao}>
              {carregando
                ? "Entrando..."
                : "Entrar"}
            </Text>
          </TouchableOpacity>

          {/* SEPARADOR */}
          <View style={styles.separador}>
            <View style={styles.linha} />

            <Text style={styles.ou}>
              ou
            </Text>

            <View style={styles.linha} />
          </View>

          {/* GOOGLE */}
          <TouchableOpacity
            style={styles.botaoGoogle}
            onPress={loginGoogle}
            disabled={carregando}
          >
            <Text style={styles.googleIcon}>
              G
            </Text>

            <Text style={styles.googleTexto}>
              Entrar com Google
            </Text>
          </TouchableOpacity>

          {/* ANÔNIMO */}
          <TouchableOpacity
            style={styles.botaoAnonimo}
            onPress={loginAnonimo}
            disabled={carregando}
          >
            <Text style={styles.anonimoIcon}>
              👤
            </Text>

            <Text style={styles.anonimoTexto}>
              Entrar como visitante
            </Text>
          </TouchableOpacity>

          {/* CADASTRO */}
          <TouchableOpacity
            style={styles.cadastrar}
            onPress={() =>
              Alert.alert(
                "Cadastro",
                "Crie a tela de cadastro para novos usuários."
              )
            }
          >
            <Text style={styles.cadastrarTexto}>
              Ainda não possui conta?{" "}
              <Text style={styles.cadastrarDestaque}>
                Cadastre-se
              </Text>
            </Text>
          </TouchableOpacity>

          {/* QR CODE */}
          <View style={styles.qrArea}>

            <Text style={styles.qrTitulo}>
              Acesse pelo celular
            </Text>

            <Text style={styles.qrDescricao}>
              Escaneie o QR Code para abrir o aplicativo
            </Text>

            <View style={styles.qr}>
              <QRCode
                value={urlAplicativo}
                size={150}
              />
            </View>

            <Text style={styles.qrUrl}>
              app-financas-89241.web.app
            </Text>

          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  card: {
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 15,

    elevation: 5,
  },

  logo: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: "#2563eb",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  logoText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },

  titulo: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitulo: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 7,
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#fafafa",
  },

  botaoPrincipal: {
    height: 52,
    backgroundColor: "#2563eb",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  separador: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },

  linha: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },

  ou: {
    marginHorizontal: 12,
    color: "#9ca3af",
  },

  botaoGoogle: {
    height: 52,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  googleIcon: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4285F4",
    marginRight: 10,
  },

  googleTexto: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },

  botaoAnonimo: {
    height: 52,
    borderRadius: 12,
    marginTop: 12,
    backgroundColor: "#111827",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  anonimoIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  anonimoTexto: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  cadastrar: {
    alignItems: "center",
    marginTop: 20,
  },

  cadastrarTexto: {
    color: "#6b7280",
    fontSize: 14,
  },

  cadastrarDestaque: {
    color: "#2563eb",
    fontWeight: "bold",
  },

  qrArea: {
    alignItems: "center",
    marginTop: 30,
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  qrTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
  },

  qrDescricao: {
    textAlign: "center",
    fontSize: 13,
    color: "#6b7280",
    marginTop: 5,
    marginBottom: 15,
  },

  qr: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  qrUrl: {
    marginTop: 10,
    fontSize: 11,
    color: "#9ca3af",
  },
});