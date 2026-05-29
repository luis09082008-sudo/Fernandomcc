// Importa o Stack do expo-router, responsável por controlar as telas principais
import { Stack } from "expo-router";

// Importa o Provider, que vai guardar e compartilhar as transações no app inteiro
import { TransacoesProvider } from "../components/TransacoesContext";

// Componente principal de layout do app
export default function RootLayout() {
  return (
    // O Provider envolve o app inteiro para todas as telas acessarem os dados
    <TransacoesProvider>
      {/* Stack controla a navegação principal */}
      <Stack screenOptions={{ headerShown: false }} />
    </TransacoesProvider>
  );
}