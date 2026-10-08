# Landing pages internacionais — padrão definitivo de URLs

## Regra geral

A plataforma continua em português e organizada por hubs. **Apenas as páginas comerciais dos infoprodutos** usam rotas por país/idioma, com nomes localizados.

- Formato: /idioma-pais/categoria-localizada/nome-localizado/
- Domínio: https://www.aprendendocominfoprodutos.com.br
- O código-fonte cadastra os endereços em catalogo/edicoes-internacionais.json
- O gerador scripts/build-international.mjs materializa as páginas durante o deploy Cloudflare.
- O catálogo público catalogo-edicoes.json contém apenas edições comerciais realmente publicadas. Não inclua páginas futuras em seletor de idioma/SEO.

## Natal Prático — páginas e destinos

| Mercado | URL | Publicação |
| --- | --- | --- |
| Brasil | /pt-br/produtos/natal-pratico/ | Atalho que leva à landing brasileira existente |
| EUA | /en-us/products/christmas-guide/ | Página informativa Future project |
| México | /es-mx/productos/guia-navidad/ | Página informativa Proyecto futuro |
| Espanha | /es-es/productos/guia-navidad/ | Página informativa Proyecto futuro |
| França | /fr-fr/produits/guide-noel/ | Página informativa Projet à venir |
| Itália | /it-it/prodotti/guida-natale/ | Página informativa Progetto futuro |
| Portugal | /pt-pt/produtos/natal-pratico/ | Página informativa Projeto futuro |

A página **real, existente, do Brasil permanece em:**
/mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/

**Produto classificado apenas em Mental & Financeiro → Financeiro → Renda Extra → Oportunidades Sazonais → Natal**, com associação a Planejamento Financeiro e Economia Doméstica. Não criar duplicação em Fitness & Saúde.

## Mitologia Grega — mesmo padrão

| Mercado | URL | Publicação |
| --- | --- | --- |
| Brasil | /pt-br/produtos/mitologia-grega/ | Atalho à landing existente |
| EUA | /en-us/products/greek-mythology/ | Future project |
| México | /es-mx/productos/mitologia-griega/ | Proyecto futuro |
| Espanha | /es-es/productos/mitologia-griega/ | Proyecto futuro |
| França | /fr-fr/produits/mythologie-grecque/ | Projet à venir |
| Itália | /it-it/prodotti/mitologia-greca/ | Progetto futuro |
| Portugal | /pt-pt/produtos/mitologia-grega/ | Projeto futuro |

A landing brasileira original permanece em /mitologia/grega/geral/.

## Páginas de "Projeto futuro"

As rotas futuras **estão acessíveis no domínio** e mostram um aviso visível, traduzido para o idioma do país. Não são landing pages de venda; não mostram preço ou checkout. Usam meta robots "noindex,nofollow,noarchive" e **não são anunciadas como edições publicadas** no manifesto, no hreflang ou no seletor de idiomas.

Quando um infoproduto estiver localizado e sua oferta aprovada, **a mesma URL de "Projeto futuro" passará a ser a landing real**, sem necessidade de trocar o link, criar rota alternativa nem fazer novos redirecionamentos.

## Publicar uma landing em outro idioma

1. Entregar o e-book completo traduzido/revisado e a landing localizada.
2. Inserir a landing no repositório em **edicoes/{slug-interno}/{idioma-pais}/index.html**. Ex.: edicoes/natal-pratico/en-US/index.html. É um arquivo-fonte editável, separado de public/.
3. Confirmar checkout, moeda, preço, entrega e adequação legal/comercial daquele mercado.
4. Editar **catalogo/edicoes-internacionais.json** no objeto da edição:
   - status: "publicada"
   - produtoAdaptado: true
   - checkoutVerificado: true
   - checkoutUrl: URL HTTPS da oferta real
   - htmlLocalizado: "edicoes/natal-pratico/en-US/index.html"
5. Rodar **npm run test:international** e **npm run build:international**. O build substitui a página "Projeto futuro" pelo HTML final na mesma URL.
6. Testar visualmente e validar links/imagens, política comercial, checkout e dados de venda antes de anunciar.
7. Ao adicionar outro idioma comercial real, revisar também a reciprocidade de hreflang na landing original brasileira. Ela não é alterada automaticamente para proteger Pixel/checkout atuais.

**Proteção:** o build recusa sobrescrever HTML escrito manualmente numa rota de destino; só atualiza arquivos previamente gerados por ele. URLs brasileiras originais e pixels não são editados.

## Manutenção e Cloudflare

O Worker damp-base-4abd está ligado ao repositório GitHub, branch main, com deploy automático. A configuração atual chama:

npm run test:international && npm run build:international && node scripts/fetch-pdf.mjs && wrangler deploy

Renda Extra de Fim de Ano permanece produto em ideia (PRO-0002) e não recebeu páginas de venda ou promessas comerciais.
