# Internacionalização dos infoprodutos — instrução operacional

## Regra de arquitetura

- Os **3 hubs, 9 núcleos e a navegação do portal** continuam em português.
- Um infoproduto tem **um ID permanente**, e cada mercado/idioma é uma **edição comercial** do mesmo produto.
- O arquivo de controle está em `catalogo/edicoes-internacionais.json`; esta pasta fica **fora de `public/`**.
- A edição brasileira original preserva **URL, HTML, CSS, pixels de anúncio e checkout existentes**.
- **Rotas planejadas NÃO são publicadas**. Só passam a existir quando o conteúdo comercial estiver pronto e a publicação for expressamente aprovada.
- O arquivo público `/catalogo-edicoes.json` contém **somente edições publicadas**, para permitir um futuro seletor de idioma sem exibir opções inexistentes.
- `Renda Extra de Fim de Ano` é produto em ideia, não foi convertido em página de venda.

## Produtos registrados

| ID | Produto | Status | Primeira edição |
| --- | --- | --- | --- |
| PRO-0001 | Natal Prático & Econômico | Existente | /mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/ |
| PRO-0002 | Renda Extra de Fim de Ano | Ideia | Nenhuma |
| PRO-0003 | Mitologia Grega — Deuses, Heróis e Significados Ocultos | Existente | /mitologia/grega/geral/ |

**Natal Prático pertence a Mental & Financeiro > Financeiro > Renda Extra > Oportunidades Sazonais > Natal**, com associação temática a Planejamento/Economia Doméstica. Não inclui Fitness & Saúde.

## Edições reservadas

Para os produtos existentes, reservamos `en-US`, `es-MX`, `es-ES`, `fr-FR`, `it-IT` e `pt-PT`. São **opções de cadastro**, não páginas publicadas ou traduções concluídas.

Exemplo de rota:

- `/produtos/natal-pratico/en-us/`
- `/produtos/mitologia-grega/es-mx/`

A URL brasileira original permanece fora desse novo padrão: **não a migre**.

## Como publicar uma edição internacional no futuro

1. Concluir e revisar o **arquivo do infoproduto traduzido/adaptado** para o país.
2. Criar a landing page completa, revisada e funcional, **fora da pasta pública**, por exemplo:
   `edicoes/natal-pratico/en-US/index.html`.
   O documento precisa ter `<html lang="en-US">`, título e conteúdo comerciais localizados; usar caminhos absolutos para assets (por exemplo `/assets/...`) ou imagens externas aprovadas.
3. Criar/verificar na plataforma de pagamentos a **oferta do país**, com moeda, preço, entrega, termos e checkout corretos. Nunca colocar credenciais ou chaves privadas no JSON.
4. Atualizar a entrada correspondente em `catalogo/edicoes-internacionais.json`:
   - `status`: `"publicada"`
   - `produtoAdaptado`: `true`
   - `checkoutVerificado`: `true`
   - `checkoutUrl`: a URL HTTPS real e verificada
   - `htmlLocalizado`: `"edicoes/natal-pratico/en-US/index.html"`
5. Rodar `npm run test:international` e `npm run build:international`.
6. O gerador cria a página em `public/produtos/natal-pratico/en-us/index.html`, adicionando `canonical`, `hreflang` e links de idioma **somente entre edições publicadas**.
7. Antes do lançamento, revisar manualmente responsividade, textos, imagens, política comercial, carrinho, pixel e a navegação real. Quando já houver duas versões, adicionar a associação `hreflang` correspondente também à **landing brasileira original** sem modificar a integração do checkout.

## Deploy Cloudflare

O Worker `damp-base-4abd` continua conectado ao GitHub (`main`). O comando de deploy executa nesta ordem:

```bash
npm run test:international
npm run build:international
node scripts/fetch-pdf.mjs
wrangler deploy
```

**Segurança:** a validação bloqueia idiomas inválidos, rotas duplicadas, HTML ausente, produtos não adaptados, checkout não verificado e tentativas de sobrescrever páginas estáticas. Uma edição marcada como `planejada` nunca gera landing page nem aparece no manifesto público.

## Limites desta entrega

O cadastro/gerador não traduz arquivos nem cria ofertas ou checkouts na Hotmart. Esta implantação **prepara a estrutura técnica**; a publicação de um idioma exige conteúdo e aprovação comercial específicos.
