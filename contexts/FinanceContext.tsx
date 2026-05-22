import React, { createContext, useContext, useState } from "react";

export type TipoTransacao = "receita" | "despesa";

export type Transacao = {
  id: string;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  pago: boolean;
  data: string;
};

type FinanceContextType = {
  transacoes: Transacao[];
  adicionarTransacao: (
    descricao: string,
    valor: number,
    tipo: TipoTransacao
  ) => void;
  marcarComoPago: (id: string) => void;
  removerTransacao: (id: string) => void;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  despesasPendentes: number;
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transacoes, setTransacoes] = useState<Transacao[]>([
    {
      id: "1",
      descricao: "Salário",
      valor: 1500,
      tipo: "receita",
      pago: true,
      data: "Hoje",
    },
    {
      id: "2",
      descricao: "Mercado",
      valor: 250,
      tipo: "despesa",
      pago: false,
      data: "Hoje",
    },
    {
      id: "3",
      descricao: "Internet",
      valor: 100,
      tipo: "despesa",
      pago: true,
      data: "Hoje",
    },
  ]);

  function adicionarTransacao(
    descricao: string,
    valor: number,
    tipo: TipoTransacao
  ) {
    const novaTransacao: Transacao = {
      id: Date.now().toString(),
      descricao,
      valor,
      tipo,
      pago: tipo === "receita",
      data: "Hoje",
    };

    setTransacoes((listaAtual) => [novaTransacao, ...listaAtual]);
  }

  function marcarComoPago(id: string) {
    setTransacoes((listaAtual) =>
      listaAtual.map((item) =>
        item.id === id
          ? {
              ...item,
              pago: true,
            }
          : item
      )
    );
  }

  function removerTransacao(id: string) {
    setTransacoes((listaAtual) => listaAtual.filter((item) => item.id !== id));
  }

  const totalReceitas = transacoes
    .filter((item) => item.tipo === "receita")
    .reduce((soma, item) => soma + item.valor, 0);

  const totalDespesas = transacoes
    .filter((item) => item.tipo === "despesa")
    .reduce((soma, item) => soma + item.valor, 0);

  const despesasPendentes = transacoes
    .filter((item) => item.tipo === "despesa" && item.pago === false)
    .reduce((soma, item) => soma + item.valor, 0);

  const saldo = totalReceitas - totalDespesas;

  return (
    <FinanceContext.Provider
      value={{
        transacoes,
        adicionarTransacao,
        marcarComoPago,
        removerTransacao,
        totalReceitas,
        totalDespesas,
        saldo,
        despesasPendentes,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinanceiro() {
  const contexto = useContext(FinanceContext);

  if (!contexto) {
    throw new Error("useFinanceiro precisa estar dentro do FinanceProvider");
  }

  return contexto;
}