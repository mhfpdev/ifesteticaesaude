# Iara Fonseca Paiva — Estética & Saúde

Site estático em português, com HTML, CSS e JavaScript. Os oito serviços, dados de contato, formação e horários foram informados pelo responsável pelo projeto.

## Executar

```sh
python3 -m http.server 8002 --bind 127.0.0.1
```

Abra `http://127.0.0.1:8002/`. Não é necessário instalar dependências para executar o site.

## Comportamento

- Serviços organizados por categoria, com detalhes expansíveis.
- Contato pelo WhatsApp +55 14 97604-6050, e-mail e Instagram confirmado.
- O formulário prepara uma mensagem no navegador; a pessoa revisa e envia no WhatsApp. Não confirma horários nem salva dados em servidor.
- Localização pública limitada a Ibitinga/SP, conforme solicitado.
- Hero editorial com revelação da fotografia, entrada do título, movimento ambiente da foto e flor vetorial. Apresentação das três áreas com seleção manual ou troca a cada 6,5 segundos.
- Botão de pausa interrompe o movimento ambiente e a apresentação automática. Trocas param enquanto a apresentação está em foco ou sob o ponteiro; a cena inteira pausa fora da tela e quando a aba fica oculta. `prefers-reduced-motion` remove movimento e reprodução automática.
- Serviços expansíveis com transição de abertura e fechamento por toque/clique; teclado conserva a resposta imediata nativa. Sem vídeo ou dependências de animação.
- Fontes locais do Google Fonts, com licenças SIL OFL incluídas em `assets/fonts/`.
- Fotografias geradas por IA, visivelmente identificadas como ilustrativas; não representam Iara, clientes ou o espaço real. Os arquivos de proveniência acompanham os ativos.
- Esta versão de demonstração contém `noindex, nofollow`. Planejar indexação separadamente quando os dados e a publicação forem aprovados.

## Publicação independente

Na cópia do repositório `mhfpdev/ifesteticaesaude`, `index.html` e os ativos ficam na raiz. O `netlify.toml` dessa cópia publica a raiz, sem etapa de compilação. No repositório de múltiplos clientes, use `SITE_SLUG=iarafonsecapaiva` com o build existente.

## Revisão

Conferido em navegador nas larguras de 1440, 768 e 390 px. Verificados menu, filtros, detalhes de serviços, foco visível, aviso de privacidade e montagem da mensagem sem envio. Medições de arquivos não equivalem a Lighthouse ou dados reais de Core Web Vitals.
