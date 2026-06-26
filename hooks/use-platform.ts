// Pequeno utilitário usado só para deixar a experiência melhor quando o
// app é aberto em um navegador de computador: mostra a "mãozinha" (cursor
// de mouse) ao passar sobre botões, algo que não existe em celular/tablet
// mas é esperado por quem usa mouse.
import { Platform } from "react-native";

export const isWeb = Platform.OS === "web";

// Spread este objeto dentro do array de estilos de qualquer
// TouchableOpacity/botão: ...cursorPointer
export const cursorPointer = isWeb ? ({ cursor: "pointer" } as const) : {};
