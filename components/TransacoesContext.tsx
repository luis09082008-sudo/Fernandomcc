// Importa recursos do React
import React, { createContext, useContext, useEffect, useState } from "react";

// Importa o AsyncStorage para salvar os dados no celular/navegador
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tipo da transação
export type Transacao = {
  id: string;
  titulo: string;
  valor: number;
  tipo: "receita" | "despesa";
  categoria: string;
  pago: boolean;
};

// Tipo do contexto
type TransacoesContextType = {
  transacoes: Transacao[];
  adicionarTransacao: (
    titulo: string,
    valor: number,
    tipo: "receita" | "despesa",
    categoria: string
  ) => void;
  marcarComoPago: (id: string) => void;
  apagarTransacao: (id: string) => void;
};

// Cria o contexto
const TransacoesContext = createContext<TransacoesContextType | undefined>(
  undefined
);

// Chave usada para salvar os dados no AsyncStorage
const CHAVE_STORAGE = "@app_financeiro_transacoes";

// Provider que envolve o app inteiro
export function TransacoesProvider({ children }: { children: React.ReactNode }) {
  // Estado principal com todas as transações
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  // Quando o app abre, carrega as transações salvas
  useEffect(() => {
    carregarTransacoes();
  }, []);

  // Toda vez que as transações mudarem, salva novamente
  useEffect(() => {
    salvarTransacoes();
  }, [transacoes]);

  // Função para carregar dados salvos
  async function carregarTransacoes() {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_STORAGE);

      if (dados) {
        setTransacoes(JSON.parse(dados));
      }
    } catch (erro) {
      console.log("Erro ao carregar transações:", erro);
    }
  }

  // Função para salvar dados
  async function salvarTransacoes() {
    try {
      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(transacoes));
    } catch (erro) {
      console.log("Erro ao salvar transações:", erro);
    }
  }

  // Função para adicionar nova transação
  function adicionarTransacao(
    titulo: string,
    valor: number,
    tipo: "receita" | "despesa",
    categoria: string
  ) {
    const novaTransacao: Transacao = {
      id: Date.now().toString(),
      titulo,
      valor,
      tipo,
      categoria,
      pago: false,
    };

    setTransacoes([novaTransacao, ...transacoes]);
  }

  // Função para marcar uma transação como paga
  function marcarComoPago(id: string) {
    const listaAtualizada = transacoes.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          pago: true,
        };
      }

      return item;
    });

    setTransacoes(listaAtualizada);
  }

  // Função para apagar uma transação
  function apagarTransacao(id: string) {
    const listaAtualizada = transacoes.filter((item) => item.id !== id);

    setTransacoes(listaAtualizada);
  }

  return (
    <TransacoesContext.Provider
      value={{
        transacoes,
        adicionarTransacao,
        marcarComoPago,
        apagarTransacao,
      }}
    >
      {children}
    </TransacoesContext.Provider>
  );
}

// Hook simples para usar as transações em qualquer tela
export function useTransacoes() {
  const contexto = useContext(TransacoesContext);

  if (!contexto) {
    throw new Error("useTransacoes precisa estar dentro do TransacoesProvider");
  }

  return contexto;
}