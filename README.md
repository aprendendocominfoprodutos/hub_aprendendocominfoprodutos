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

### Cardápios Semanais — Menú Familiar

Em Fitness & Saúde → Alimentação → Receitas → Cardápios Semanais, o card **Menú Familiar** é totalmente clicável e abre `/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/`, uma vitrine de cinco regiões (Brasil, América Latina, Países Árabes, América do Norte e Europa). A seleção de países e idiomas ocorre nas páginas regionais, sem seletor suspenso no card da categoria. A edição México (PDF editorial de 124 páginas; 28 receitas, quatro listas de compras) está em revisão editorial. As demais edições ainda são planejadas. Links curtos exibem páginas informativas, sem checkout, geradas no deploy. Este produto não deve ser classificado como venda publicada até que haja landing e checkout revisados. A taxonomia interna permanece em português, exceto pelo nome próprio do e-book.

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

## Subdomínios regionais (Cloudflare Workers)

As edições de Natal Prático e Mitologia Grega estão preparadas nos subdomínios `pt-br`, `en-us`, `es-mx`, `es-es`, `fr-fr`, `it-it` e `pt-pt` do domínio principal, usando o mesmo Worker e repositório. A rota no domínio principal `www` continua válida e independente.

O arquivo `worker/index.mjs` direciona solicitações de cada hostname aos assets da sua região. `scripts/build-subdomain-homes.mjs` gera vitrines por mercado. Páginas planejadas continuam noindex e sem checkout.

**Exemplo:** `https://en-us.aprendendocominfoprodutos.com.br/products/christmas-guide/` usa o mesmo conteúdo já preparado em `public/en-us/products/christmas-guide/` no deploy. Para publicar a landing final, edite a edição correspondente no catálogo e inclua seu HTML localizado. A landing brasileira antiga permanece intacta.

Manual e todas as URLs em [docs/internacionalizacao.md](docs/internacionalizacao.md).

### Seletor de idioma no último nível do catálogo

O seletor do Natal Prático aparece apenas **dentro do card de produto** em `/mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/`. A landing de vendas não contém seletor; a rota curta `/natal-pratico/esp/` aparece como **Espanhol (Latinoamérica)**. As páginas internacionais permanecem como projetos futuros até haver e-book e oferta aprovados.


## Catálogo interno × landing comercial

O catálogo é para administração; clientes chegam direto às landing pages. Cada infoproduto tem vitrineFinal no cadastro e seletor de idiomas **apenas dentro do card da categoria final**. A validação npm run verify:final-containers é obrigatória. Páginas internas recebem noindex, mas não são protegidas por login. Regra detalhada em docs/internacionalizacao.md.


### Menu com bandeiras e árabe

Os cards finais dos produtos cadastrados exibem opções com bandeiras gráficas e uma edição planejada de árabe padrão (`ar-SA`, `/ar/`). O espanhol latino-americano usa globo por representar mais de um país. A página de projeto futuro em árabe usa direção RTL. Mais detalhes em [docs/internacionalizacao.md](docs/internacionalizacao.md).


### Landing brasileira por idioma (exceto Natal Prático)

A Mitologia Grega agora usa `/mitologia/grega/geral/pt-br/` como URL brasileira canônica, ao lado de `/mitologia/grega/geral/ing/` e dos demais idiomas. A antiga `/mitologia/grega/geral/` redireciona (308) à nova. O Natal Prático continua no endereço brasileiro atual, sem alteração. Mais detalhes em `docs/internacionalizacao.md`.
