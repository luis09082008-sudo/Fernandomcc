// Hook central de responsividade.
// Qualquer tela ou componente pode usar este hook para se adaptar
// automaticamente a celulares pequenos, celulares grandes, tablets e web.
import { useWindowDimensions } from "react-native";

export type Breakpoint = "mobile" | "tablet" | "desktop";

// Larguras de referência para definir o tipo de tela
const BREAKPOINTS = {
  tablet: 600,
  desktop: 1024,
};

// Largura "base" usada como referência para escalar fontes/espacamentos
// (corresponde a um celular comum, tipo iPhone padrão)
const LARGURA_BASE = 375;

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  // Define em qual categoria de tela estamos
  const breakpoint: Breakpoint =
    width >= BREAKPOINTS.desktop
      ? "desktop"
      : width >= BREAKPOINTS.tablet
      ? "tablet"
      : "mobile";

  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";
  const isDesktop = breakpoint === "desktop";
  const isLargeScreen = isTablet || isDesktop;

  // Orientação atual, útil para ajustar grids
  const isLandscape = width > height;

  // Largura máxima do conteúdo: em telas grandes (tablet/web) o conteúdo
  // fica centralizado em uma "coluna" confortável de leitura, em vez de
  // se espalhar pela tela inteira.
  const contentMaxWidth = isDesktop ? 760 : isTablet ? 620 : width;

  // Número de colunas sugerido para grids (cards, listas, etc.)
  const columns = isDesktop ? 3 : isTablet ? 2 : 1;

  // Espaçamento horizontal das telas, cresce um pouco em telas maiores
  const horizontalPadding = isDesktop ? 32 : isTablet ? 28 : 20;

  // Escala um tamanho de fonte/medida de forma suave conforme a largura
  // da tela, sempre limitado a um intervalo seguro (não deixa nem muito
  // pequeno em telas estreitas, nem gigante em telas muito largas).
  function scale(size: number, opções?: { min?: number; max?: number }) {
    const fator = width / LARGURA_BASE;
    const minimo = opções?.min ?? size * 0.92;
    const maximo = opções?.max ?? size * 1.3;
    const resultado = size * fator;
    return Math.round(Math.min(Math.max(resultado, minimo), maximo));
  }

  return {
    width,
    height,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    isLandscape,
    contentMaxWidth,
    columns,
    horizontalPadding,
    scale,
  };
}
