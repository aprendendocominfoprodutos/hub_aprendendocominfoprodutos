# Landing pages internacionais — padrão definitivo de URLs

## Subdomínios oficiais por país

A operação internacional usa **subdomínios separados**, mas mantém **um só repositório GitHub**, o Worker Cloudflare `damp-base-4abd` e as rotas originais do Brasil. A navegação institucional continua em português.

| Mercado | Subdomínio | Exemplo do Natal Prático |
| --- | --- | --- |
| Brasil | pt-br.aprendendocominfoprodutos.com.br | https://pt-br.aprendendocominfoprodutos.com.br/produtos/natal-pratico/ |
| Estados Unidos | en-us.aprendendocominfoprodutos.com.br | https://en-us.aprendendocominfoprodutos.com.br/products/christmas-guide/ |
| México | es-mx.aprendendocominfoprodutos.com.br | https://es-mx.aprendendocominfoprodutos.com.br/productos/guia-navidad/ |
| Espanha | es-es.aprendendocominfoprodutos.com.br | https://es-es.aprendendocominfoprodutos.com.br/productos/guia-navidad/ |
| França | fr-fr.aprendendocominfoprodutos.com.br | https://fr-fr.aprendendocominfoprodutos.com.br/produits/guide-noel/ |
| Itália | it-it.aprendendocominfoprodutos.com.br | https://it-it.aprendendocominfoprodutos.com.br/prodotti/guida-natale/ |
| Portugal | pt-pt.aprendendocominfoprodutos.com.br | https://pt-pt.aprendendocominfoprodutos.com.br/produtos/natal-pratico/ |

- **Raiz de cada subdomínio:** vitrine regional dos infoprodutos existentes e planejados, no idioma do país, com `noindex` enquanto o mercado ainda não tiver conteúdo indexável.
- **URLs comerciais:** o Worker intercepta a solicitação no subdomínio e resolve o arquivo localizado em `public/{idioma-pais}/...`, sem criar cópias da landing.
- **Projeto futuro:** até a edição estar finalizada, cada endereço regional apresenta um aviso sem checkout e sem indexação.
- **Edições prontas:** somente edições efetivamente publicadas recebem links canônicos e `hreflang` apontando ao subdomínio de destino.
- **Brasil:** links do subdomínio `pt-br` encaminham ao **domínio principal www**, à landing brasileira original. Não alteramos o Pixel, a oferta ou a URL antiga da campanha.
- **Domínio principal:** `www.aprendendocominfoprodutos.com.br` mantém todas as páginas e navegação existentes.

Arquivos: `worker/index.mjs` roteia por hostname; `scripts/build-subdomain-homes.mjs` gera as vitrines regionais; `catalogo/edicoes-internacionais.json` centraliza as rotas por edição.

**Cloudflare:** os sete domínios devem ser anexados como *Workers Custom Domains* ao Worker `damp-base-4abd`; a Cloudflare administra DNS e certificados TLS. Eles não são um novo projeto Pages e não exigem DNS CNAME manual. Não criar registros que conflitem com custom domains existentes.


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

## Seletor leve dentro do subnicho Renda Extra

Renda Extra mantém apenas Datas Comemorativas (Sazonais) e Produtos Digitais. O seletor compacto aparece **exclusivamente dentro do card E-book Natal Prático da página Natal**, que é o último nível do catálogo antes da landing. Não há seletor separado na página geral de Renda Extra nem na landing de vendas. Todas as rotas abaixo usam o mesmo domínio principal.

| Edição | Rota |

|---|---|

| Brasil (publicado) | /mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/ |

| Inglês EUA | /mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/ing/ |

| Espanhol México | /mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/esp/ |

| Espanhol Espanha | /mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/esp-es/ |

| Francês | /mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/fr/ |

| Italiano | /mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/it/ |

| Português Portugal | /mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/pt/ |

O script scripts/build-simple-languages.mjs gera páginas de projeto futuro (noindex, sem preço e sem checkout), que podem ser substituídas por landings finalizadas sem trocar o endereço. Mantemos HTML, Pixel e checkout brasileiros intactos.

Os subdomínios internacionais anteriores continuam configurados por compatibilidade, mas não são mostrados no novo seletor de idioma. Somente uma solicitação explícita de desativação removerá esses domínios.

## Ajuste de interface (08/10/2026)

Na página `/mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/`, o card do Natal Prático contém o seletor de idioma e o link para a edição brasileira. O idioma `esp/` é exibido ao visitante como **Espanhol (Latinoamérica)**, não como exclusivo do México. O identificador técnico histórico `es-MX` permanece por compatibilidade com rotas antigas; a moeda e o checkout do mercado latino-americano devem ser definidos no lançamento.

A landing original do Natal Prático não apresenta seletor, e o checkout da Hotmart e o Meta Pixel permanecem intocados.


## Regra global permanente: catálogo interno e landing pública

O ecossistema (hubs, subnichos, categorias e caminhos /01/02/...) é um mapa gerencial do proprietário, não uma jornada de navegação do comprador. O cliente acessa diretamente a landing page do infoproduto pelo anúncio ou link de divulgação.

Todo produto existente deve ter: ID no catálogo de edições; campo vitrineFinal apontando à categoria imediatamente anterior à landing; um card nessa categoria com data-product-id correspondente e seletor de idiomas dentro do próprio card; um link direto para a landing brasileira. Não colocar o seletor na landing nem em categorias anteriores.

As edições internacionais devem ter rotaSimples dentro da rota de sua landing original (ex.: /mitologia/grega/geral/ing/). Enquanto estiverem planejadas, essas rotas exibem aviso 'projeto futuro', sem botão de compra, sem checkout e com noindex. Ao lançar a edição, a mesma URL passa a servir sua landing localizada mediante conteúdo e checkout verificados.

O comando npm run verify:final-containers bloqueia o deploy se algum produto existente não tiver a vitrine final com idiomas e link à landing brasileira. npm run test:internal-catalog verifica separação de indexação.

Produtos aplicados: PRO-0001 (Natal Prático), vitrine em /mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/, landing em /mental-financeiro/financeiro/renda-extra/datas-comemorativas/natal/natal-pratico/. PRO-0003 (Mitologia Grega), vitrine em /mitologia/grega/, landing em /mitologia/grega/geral/. PRO-0002 (Renda Extra de Fim de Ano) permanece apenas uma ideia.

Para reduzir descoberta via buscadores, o Worker envia X-Robots-Tag: noindex, follow nas páginas HTML do mapa de categorias. Landings comerciais publicadas mantêm indexação independente. Isso NÃO torna o mapa privado: qualquer pessoa com seu endereço pode acessá-lo. Privacidade real requer autenticação separada e configuração adicional.

Os backlinks das duas landings existentes para o mapa foram removidos, preservando anúncios, pixels, checkout e conteúdo comercial.
