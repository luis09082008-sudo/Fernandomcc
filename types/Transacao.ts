export type Transacao = {
    id: string;
    descricao: string;
    valor: number;
    tipo: "receita" | "despesa";
    pago: boolean;
};