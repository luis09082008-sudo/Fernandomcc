// Este componente só faz alguma coisa quando o app roda dentro de um
// navegador (computador). Em celular/tablet (app nativo) ele não faz nada.
//
// Por quê ele existe: o arquivo "+html.tsx" só é aplicado quando o app é
// publicado/exportado para a web (npx expo export). Durante o
// desenvolvimento (npx expo start --web) o navegador usa uma página HTML
// padrão, sem altura definida em html/body/#root — e como todo o app é
// construído com "flex: 1" (esperando ocupar 100% da tela), sem essa
// altura definida o app não consegue se espalhar pela janela inteira do
// computador, ficando "preso" numa caixa pequena.
//
// Este componente corrige isso injetando o CSS necessário diretamente no
// <head> da página assim que o app inicia, funcionando em qualquer um dos
// dois modos (desenvolvimento ou build final).
import { useEffect } from "react";
import { Platform } from "react-native";

const ID_ESTILO = "app-financas-reset-web";

export default function WebFullScreenStyles() {
  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    // Evita duplicar a tag de estilo se o componente remontar
    if (document.getElementById(ID_ESTILO)) {
      return;
    }

    const tagEstilo = document.createElement("style");
    tagEstilo.id = ID_ESTILO;
    tagEstilo.innerHTML = `
      html, body, #root {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        background-color: #f3f4f6;
      }

      /* O React Native Web cria uma div interna dentro de #root para
         montar a árvore de componentes: também precisa ocupar 100%. */
      #root > div {
        height: 100%;
        width: 100%;
        display: flex;
      }

      * {
        box-sizing: border-box;
      }
    `;

    document.head.appendChild(tagEstilo);
  }, []);

  // Não renderiza nada visível — só cuida do CSS global
  return null;
}
