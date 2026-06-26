// Importa o Stack do expo-router, responsável por controlar as telas principais
import { Stack } from "expo-router";

// Controla a cor dos ícones da barra de status (hora, bateria, sinal)
// tanto no Android quanto no iOS, deixando-os legíveis sobre o cabeçalho azul
import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";

// SafeAreaProvider garante que toda a árvore do app saiba o tamanho da
// tela e das áreas seguras (notch, status bar, home indicator) em
// qualquer dispositivo — celular pequeno, celular grande, tablet ou web.
import { SafeAreaProvider } from "react-native-safe-area-context";

// Importa o Provider, que vai guardar e compartilhar as transações no app inteiro
import { TransacoesProvider } from "../components/TransacoesContext";

// Corrige a altura da página quando o app roda em um navegador (computador)
import WebFullScreenStyles from "../components/WebFullScreenStyles";

// Componente principal de layout do app
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Só tem efeito na web: garante que o app ocupe a tela inteira
          do navegador, em qualquer tamanho de janela */}
      <WebFullScreenStyles />

      {/* Ícones claros na barra de status, pois o topo do app é azul escuro.
          translucent + backgroundColor "transparent" deixa o conteúdo do
          Android ocupar a tela inteira (edge-to-edge) sem listrinha cinza. */}
      <StatusBar
        style="light"
        translucent
        backgroundColor="transparent"
      />

      {/* View raiz ocupando 100% da tela disponível em qualquer plataforma
          (celular, tablet ou navegador desktop) */}
      <View style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
        {/* O Provider envolve o app inteiro para todas as telas acessarem os dados */}
        <TransacoesProvider>
          {/* Stack controla a navegação principal */}
          <Stack
            screenOptions={{
              headerShown: false,
              // No web, anima a troca de tela com fade simples em vez do
              // slide nativo de iOS/Android, que não combina com mouse/teclado
              animation: Platform.OS === "web" ? "fade" : "default",
            }}
          />
        </TransacoesProvider>
      </View>
    </SafeAreaProvider>
  );
}