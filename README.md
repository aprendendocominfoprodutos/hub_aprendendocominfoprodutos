# Aprendendo com Infoprodutos — Portal oficial

Código-fonte do site servido pelo Cloudflare Worker `damp-base-4abd`, com deploy automático a partir da branch `main`.

## Taxonomia e rotas

A classificação interna continua **em português**. Os idiomas/países são definidos **por infoproduto e landing page**, sem duplicar a árvore de hubs.

- **Cultura & Entretenimento** `/cultura-entretenimento/`
  1. **Mitologia** `/mitologia/`: Grega, Nórdica, Egípcia e Asteca — URLs históricas preservadas.
  2. **Geografia & Bandeiras** `/cultura-entretenimento/geografia-bandeiras/`: Geografia e Bandeiras, cada um com sua rota.
  3. **História & Curiosidades**: núcleo reservado; sem página de produto vazia.
- **Fitness & Saúde** `/fitness-saude/`
  1. **Alimentação & Saúde**: links existentes de Alimentação e Saúde.
  2. **Fitness & Treinos**: links existentes de Fitness e Treino.
  3. **Beleza & Autocuidado**: núcleo reservado.
- **Mental & Financeiro** `/mental-financeiro/`
  1. **Mental**
  2. **Financeiro**
  3. **Carreira & Produtividade**: núcleo reservado.

### Produto existente

**Natal Prático**: `/mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/`.

Ele permanece em **Mental & Financeiro → Financeiro → Renda Extra → Datas Comemorativas/Sazonais → Natal**, com associação temática complementar a Planejamento e Economia Doméstica. Não cadastrá-lo como produto do Fitness & Saúde. **Não mover, recriar ou modificar checkout, Pixel, CSS de conversão ou URL de venda sem decisão expressa.**

**Renda Extra de Fim de Ano** é apenas ideia para novo infoproduto, sem landing page publicada.

## Implementação

- Páginas principais utilizam `/src/portal.css` e `/src/arquitetura.css`.
- A reorganização preserva todas as URLs antigas: o novo hub de Cultura aponta para a rota original de Mitologia.
- As categorias futuras são identificadas como planejadas, sem CTA de compra nem produtos fictícios.
- A landing page de Natal Prático continua independente das páginas de catálogo.

## Deploy

Worker `damp-base-4abd` vinculado ao GitHub via Workers Builds, branch `main`; comando `npm run deploy` (que busca os materiais PDF necessários antes do deploy).

Antes de publicar alterações estruturais, validar links internos, responsividade e checkout das landing pages existentes.


## Infoprodutos em outros idiomas

O site institucional e a taxonomia permanecem em português. Somente os infoprodutos e suas landing pages têm edições por mercado, controladas em `catalogo/edicoes-internacionais.json`.

- **Gerador:** `scripts/build-international.mjs` (executado pelo deploy).
- **Manifesto público:** `/catalogo-edicoes.json` — apenas edições comerciais realmente publicadas.
- **Projeto futuro:** rotas ainda sem infoproduto possuem páginas informativas localizadas, marcadas como `noindex` e sem checkout. Quando a edição estiver pronta, a mesma URL recebe a landing page final.
- **Brasil:** `/pt-br/produtos/natal-pratico/` encaminha à landing brasileira atual, sem alterar o endereço de anúncios.
- **Rotas internacionais:** `/{idioma-pais}/{categoria-traduzida}/{slug-localizado}/`. Ex.: `/en-us/products/christmas-guide/` e `/es-mx/productos/guia-navidad/`.
- **Testes:** `npm run test:international`.
- **Procedimento completo:** [docs/internacionalizacao.md](docs/internacionalizacao.md).

Nenhuma tradução comercial ou novo checkout foi publicado; Natal Prático e Mitologia Grega mantêm suas landing pages originais. As rotas futuras possuem páginas informativas de "Projeto futuro" no domínio.
