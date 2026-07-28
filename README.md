# Motion Graphics com Claude + Remotion

Projeto configurado seguindo o "Guia Rápido · Motion Graphics com IA" — pronto para gerar cenas de motion graphics a partir de roteiro, visualizar no Remotion Studio e exportar clipes para o editor (DaVinci, CapCut, Premiere).

## O que já está instalado

- **Remotion 4** (template Hello World) com todas as dependências (`npm install` já rodado)
- **Skills oficiais do Remotion** em `.claude/skills/` (best practices, render, captions, multimedia etc.) — o Claude Code detecta automaticamente
- Pasta **`assets/`** para logos, fotos e ícones (PNG, JPG, SVG)
- Pasta **`out/`** para os clipes exportados (ignorada pelo git)

## Como usar

### 1. Abrir o Remotion Studio (preview em tempo real)

```bash
npm run dev
```

Abre o navegador com o Studio. Deixe a aba aberta — toda alteração do Claude aparece ali automaticamente.

### 2. Gerar cenas a partir do roteiro

Dentro do Claude Code, cole:

> Aqui está meu roteiro. Para cada bloco, gere uma cena de motion graphics no Remotion: animações de texto entrando, fundo limpo, transições suaves e duração compatível com o tempo de fala. Use a skill de Remotion.
>
> [cole o seu roteiro aqui]

Dicas: roteiro em blocos curtos (2–4 frases por cena), diga o estilo ("minimalista", "colorido", "corporativo") e a paleta de cores se tiver.

### 3. Exportar os clipes

```bash
npx remotion render <IdDaCena> out/01-abertura.mp4
```

Ou peça ao Claude: "Exporte todas as cenas em MP4 separados, 1080p, na pasta /out."

### 4. Fundo transparente (para sobrepor em outros vídeos)

Peça ao Claude: "Exporte a cena X em WebM ou ProRes 4444 com canal alfa, na pasta /out/transparent." CapCut e DaVinci preferem ProRes 4444; se um der problema, tente o outro.

### 5. Suas imagens

Jogue os arquivos em `assets/` e diga ao Claude onde usar cada um (ex.: "coloque o logo.png no canto superior esquerdo da cena 1 com entrada suave").

## Comandos úteis

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Abre o Remotion Studio (preview) |
| `npx remotion compositions` | Lista as cenas disponíveis |
| `npx remotion render <id> out/arquivo.mp4` | Renderiza uma cena |
| `npm run lint` | Checa o código |

## Docs

- [Documentação do Remotion](https://www.remotion.dev/docs)
- [Skills de IA do Remotion](https://remotion.dev/docs/ai/skills)
