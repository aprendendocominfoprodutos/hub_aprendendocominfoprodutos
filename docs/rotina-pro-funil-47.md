# Rotina Produtiva Pro — preparação de lançamento

Estado em 23/10/2026: configuração parcial, sem liberação para campanha. O Pixel principal e o webhook estão ativos; o funil nativo está salvo e inativo. A nova landing, o quiz e as páginas de pós-compra estão na revisão PR 26, com compra bloqueada até a conferência da entrega. A versão publicada do quiz permanece com a oferta antiga; não direcionar anúncios para ela como se já cobrasse R$47.

## Ofertas e arquivos de entrega

| Etapa | Produto Hotmart | Preço | Arquivo final no conteúdo do produto |
|---|---|---:|---|
| Principal | 8741427 — Rotina Produtiva Pro | R$47 | acesso-rotina-pro-com-bonus.pdf |
| Bump 1 | 8791462 — Rotinas Prontas | R$9,90 | bump-01-rotinas-prontas.pdf |
| Bump 2 | 8791470 — Projetos em Ação | R$12,90 | bump-02-projetos-em-acao.pdf |
| Upsell | 8791473 — Detox Digital — App + Guia Completo | R$37 | acesso-detox-digital-completo.pdf |
| Downsell | 8791476 — Detox Digital — App + Guia Essencial | R$27 | acesso-detox-digital-essencial.pdf |

O principal inclui Mapa da Semana (1 página) e Plano de Retomada (3 páginas), reunidos ao acesso em um manual de 5 páginas. Os dois adicionais Detox contêm **o mesmo app completo**. A diferença é o guia: completo de 8 páginas ou essencial de 3 páginas; os manuais finais têm 9 e 4 páginas, respectivamente. Não anunciar app reduzido nem PDFs como única entrega do upsell/downsell.

Os quatro PDFs originais dos adicionais foram enviados pelo usuário. A conversão dos dois Detox para Aplicativos para Celular foi salva e os PDFs existentes preservados. Ainda é necessário substituir os três manuais indicados, incluindo o principal. A plataforma aceita um manual PDF por produto do tipo app; os bônus foram reunidos nesse manual.

Os PDFs pagos não estão no repositório público. O pacote editorial e os três manuais finais foram entregues separadamente ao usuário.

## Hotmart

- Principal: checkout confirmado `https://pay.hotmart.com/G108053232T?off=6bol81js`, R$47 à vista. Oferta antiga `gp9smrrn` (R$37) preservada enquanto o quiz publicado ainda a utiliza.
- Upsell: `https://pay.hotmart.com/N108159655C?off=5plz74m0`, R$37.
- Downsell: `https://pay.hotmart.com/K108159658Y?off=ug4zbxib`, R$27.
- Prazo de reembolso observado nos cadastros: 7 dias.
- Quatro adicionais ainda em rascunho. Finalizar o cadastro implica aceitar o Termo de Tratamento de Dados Pessoais; requer confirmação do titular no momento da ação.
- No Checkout Builder do principal, a busca por Rotinas Prontas não encontrou produto elegível. Os bumps ainda não estão aplicados. Não publicar checkout vazio como se contivesse os dois adicionais.

### Funil nativo

Funil **284854**, nome **Rotina Pro 47 | Detox 37 e 27**, salvo **inativo**, vinculado à oferta principal `6bol81js`. Cartão obrigatório e Pix selecionado.

Fluxo configurado: principal → Detox Completo R$37; aceite → obrigado; recusa → Detox Essencial R$27; aceite ou recusa do essencial → mesmo obrigado. Todos os conectores finais estão definidos. Widget copiado da conta Hotmart; código preparado nas páginas, ainda bloqueado pelo controle de lançamento.

Editor: https://app.hotmart.com/tools/sales/funnel/edit/284854/steps

O mapa EVA `Rotina Produtiva Pro | QUIZ` foi atualizado com os dois produtos Detox, links e preços R$37/R$27, textos app + guia e Pixel. Cronômetro, depoimentos e FAQ automáticos dos adicionais foram desativados; nenhum preço anterior fictício foi preenchido. O mapa não substitui o funil nativo de cobrança.

## Páginas

Base: `https://www.aprendendocominfoprodutos.com.br/mental-financeiro/mental/procrastinacao/mini-app/rotina-produtiva-pro/`

- `landingpage/`: organização e controle, app + dois bônus, R$47, imagens cinematográficas otimizadas.
- `quiz/`: cinco perguntas; três orientações e desempate pela primeira resposta. Sem cadastro; respostas só em memória, não enviadas ao Pixel.
- `upsell/`, `downsell/`: app + guia, R$37/R$27, componente oficial Hotmart preparado.
- `obrigado/`: orienta consultar o status e os itens adquiridos na Hotmart; não simula pagamento aprovado nem expõe PDFs.

Em `assets/launch-config.js`, `checkoutEnabled` e `postPurchaseEnabled` permanecem `false`. Alterá-los apenas depois da entrega, dos cadastros, dos dois bumps e do teste transacional. O primeiro controla o checkout de R$47; o segundo carrega o widget nativo. A integração de pós-compra preserva o contexto da Hotmart, sem criar links que simulem aceite e cobrança.

## Mensuração

Pixel **1419582967021848** no produto principal: Web e API com token já configurado, venda pelo valor da transação em todos os métodos, visitas ao checkout habilitadas. Os quatro adicionais também foram configurados com o mesmo Pixel, envio Web e API com token validado, venda pelo valor da transação em todos os métodos e visitas ao checkout.

Nas páginas novas, Pixel após permissão do visitante: PageView, ViewContent, QuizStart/QuizComplete e CheckoutClick. Sem Purchase/InitiateCheckout nas páginas públicas; Purchase fica com a Hotmart. Nome de campanha permitido em cinco UTMs; parâmetros arbitrários e dados de contato são removidos antes de carregar o Pixel. As respostas/perfis do quiz não são enviados. Preferência por sessão, alterável na interface. Validação automatizada cobre recusa, armazenamento indisponível, aceite, carregamento único e revogação.

### Webhook ativo

- Nome: Rotina Pro — registro de compras e reembolsos.
- Endpoint: `https://rotina-pro-events.alisson-lopes30.workers.dev/webhooks/hotmart`.
- Escopo: os cinco produtos acima, nove eventos, versão 2.0.0.
- Cloudflare Worker e D1 dedicados; autenticação pelo Hottok em segredo, sem segredo no frontend/repositório.
- Registro mínimo de eventos; não armazena nome, email, telefone, endereço ou payload completo. Transação armazenada como SHA-256; idempotência por ID do evento.
- Nove testes nativos Hotmart processados com HTTP 200. Testes separados confirmaram 401 sem autenticação, aprovação, duplicação e reembolso com persistência. Eventos nativos com SKU fictício podem ser ignorados pelo filtro de produtos.
- Código e testes em `integrations/rotina-pro/`. O deploy do Worker de eventos é independente do site principal; não trocar o Worker de assets por esse receptor.

O webhook **registra pedidos; não cria contas nem revoga acesso nos apps EVA**. Os apps verificados usam links compartilhados. Não anunciar autenticação individual, liberação ou bloqueio automáticos que não existem.

## Verificação e encerramento

- 98 testes do repositório aprovados; 4 testes adicionais do Worker aprovados.
- Validadores de contêineres e quatro geradores/builds do repositório executados.
- Auditoria estática da landing sem erros; avisos de navegação absoluta correspondem às rotas do site existente.
- Landing conferida em contêineres 360, 390, 768 e 1280 px sem overflow horizontal. Quiz: validação de resposta, três resultados e contexto de tempo/horário verificados. Sem requisição Meta após recusa, por inspeção de scripts e testes.
- Não houve compra de teste, teste de entrega autenticada nem lançamento de anúncio. Prazo de acesso e contato comercial de suporte precisam ser confirmados antes da venda.

Pendências para liberar: substituir os três manuais; finalizar os quatro produtos com confirmação do titular; aplicar os dois bumps; publicar páginas e habilitar controles; ativar o funil nativo; titular executar compra de teste e conferir recebimento principal, extras e recusas. Só então iniciar mídia com orçamento definido.

A revisão automática bloqueou acesso ao ChatGPT pelo navegador para baixar novos arquivos no computador do usuário e enviá-los à Hotmart. Não houve tentativa de contornar o bloqueio; substituição dos manuais permanece para envio direto pelo titular.

## Janela inicial de cerca de sete dias

Começa após compra/entrega verificadas e tráfego autorizado. Preços R$47/R$37/R$27; sem redução automática nem agendamento de mídia. Comparar visitas e pedidos por landing/quiz, aceitação de cada adicional, receita retida, taxas, reembolsos e gasto real. Um clique não é venda; uma semana com poucas compras pode ser inconclusiva. Qualquer teste posterior de R$27/R$17 exige decisão com dados.

Fontes oficiais consultadas em 23/10/2026:
- https://suportehotmart.zendesk.com/hc/pt-br/articles/220402348-O-que-%C3%A9-e-como-configurar-meu-Funil-de-Vendas
- https://suportehotmart.zendesk.com/hc/pt-br/articles/360019967392-O-que-%C3%A9-e-como-configurar-o-Order-Bump
