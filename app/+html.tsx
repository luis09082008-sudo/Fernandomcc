// Este arquivo só é usado quando o app roda no navegador (computador/web).
// Ele controla o <html> e o <head> da página, garantindo que o app
// ocupe a tela inteira corretamente em qualquer tamanho de janela.
import { ScrollViewStyleReset } from "expo-router/html";
import { type PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />

        {/* Viewport responsivo: o app se adapta à largura real da janela
            em qualquer dispositivo (celular, tablet ou computador) */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />

        <meta name="theme-color" content="#2563eb" />

        {/* Remove o comportamento padrão de rolagem do navegador para que
            o app controle o scroll como em um app nativo */}
        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: responsiveStyle }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

// Estilos globais mínimos: tela cheia, sem margens e sem "elástico" de
// rolagem estranho quando o app é aberto em uma janela de computador.
const responsiveStyle = `
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #f3f4f6;
  }
`;
