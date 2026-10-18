---
name: Estética e Saúde Iara Fonseca Paiva
description: Identidade lilás com assinatura cursiva e títulos serifados.
colors:
  primary: "#604376"
  primary-deep: "#49325c"
  lavender: "#ede5f3"
  paper: "#fdfbf9"
  ink: "#34263e"
  muted: "#695e70"
  rose: "#f3e6e5"
  blue: "#e6edf1"
  line: "#d9d0de"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(66px,6.8vw,96px)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.75
  signature:
    fontFamily: "Allura, cursive"
    fontSize: "36px"
    fontWeight: 400
    lineHeight: 1.1
rounded:
  button: "7px"
  panel: "14px"
spacing:
  small: "16px"
  medium: "24px"
  large: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.button}"
    padding: "15px 24px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
---
# Design System: Iara Fonseca Paiva

## Overview
Identidade derivada das referências fornecidas pelo usuário: lilás predominante, rosa e azul suave, assinatura cursiva e títulos serifados. A implementação adota uma composição clara, espaçada e com fotografia ilustrativa identificada. A direção foi delegada pelo usuário; esta documentação descreve os arquivos implementados, sem atribuir a ele escolhas tipográficas individuais.

## Colors
Lilás em grandes superfícies; violeta nos controles e no contato; rosa, lilás e azul organizam as áreas de serviço. A tinta escura mantém o contraste sobre campos claros. A paleta decorre da identidade fornecida e é preservada apesar do aviso genérico de cor do detector.

## Typography
Cormorant Garamond 500 em títulos; itálico para ênfase. Manrope 400/600 em textos e controles. Allura apenas na assinatura. Fontes hospedadas localmente. Títulos variam por tamanho de tela; a leitura de conteúdo usa aproximadamente 13–15px, com notas legais e créditos em 11–12px. Não reduzir conteúdo funcional abaixo do tamanho implementado.

## Layout
Contêiner máximo de 1240px; margem lateral de 56px no desktop e 22px no celular. Seções com 106px no desktop e 64px no celular, ajustadas por conteúdo. Menu recolhido até 900px. Colunas principais reorganizadas em uma coluna até 700px; serviços ficam em três painéis no desktop/tablet e uma coluna no celular.

## Elevation & Depth
Superfícies predominantemente planas. Sombra suave apenas no pequeno selo fotográfico, menu aberto e contato persistente. Linhas finas delimitam listas, horários e rodapé.

## Shapes
Botões de 7px; painéis e fotografias de 14px. Arco superior na fotografia principal; contorno fino deslocado, sem recorte do corpo da modelo. Ícones SVG com traço consistente.

## Components
Botões violeta com texto branco, variante clara na área de contato. Links de serviço montam uma mensagem de WhatsApp com o nome do atendimento. Menu com botão nativo, estado expandido e fechamento por Escape. Perguntas frequentes usam details/summary nativos. Contato móvel persistente com área própria e margem de rolagem para foco.
Foco visível com contorno de 3px. Transições de cor e deslocamento de 200ms; prefers-reduced-motion remove transições e rolagem suave.

## Do's and Don'ts
- Preservar as cores confirmadas, a assinatura e a linguagem em português.
- Identificar fotografias ilustrativas; não apresentá-las como retratos, resultados ou instalações da Iara.
- Preservar a indicação de mestrado em andamento e o contato direto para valores.
- Não inventar registro profissional, depoimentos, benefícios clínicos ou preços.
- Não publicar endereço sem autorização.
