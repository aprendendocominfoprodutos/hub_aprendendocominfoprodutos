# Rotina Produtiva Pro — preparação de lançamento

Estado em 23/10/2026: os quatro cadastros foram finalizados com aceite expresso do titular, enviados à análise da Hotmart; os dois bumps foram publicados e testados no checkout de R$47. Ainda sem liberação para campanha. O Pixel principal e o webhook estão ativos; o funil nativo está salvo e inativo. A nova landing, o quiz e as páginas de pós-compra estão na revisão PR 26, com compra bloqueada até a conferência da entrega. A versão publicada do quiz permanece com a oferta antiga; não direcionar anúncios para ela como se já cobrasse R$47.

## Ofertas e arquivos de entrega

| Etapa | Produto Hotmart | Preço | Arquivo final no conteúdo do produto |
|---|---|---:|---|
| Principal | 8741427 — Rotina Produtiva Pro | R$47 | acesso-rotina-pro-com-bonus.pdf |
| Bump 1 | 8791462 — Rotinas Prontas | R$9,90 | bump-01-rotinas-prontas.pdf |
| Bump 2 | 8791470 — Projetos em Ação | R$12,90 | bump-02-projetos-em-acao.pdf |
| Upsell | 8791473 — Detox Digital — App + Guia Completo | R$37 | acesso-detox-digital-completo.pdf |
| Downsell | 8791476 — Detox Digital — App + Guia Essencial | R$27 | acesso-detox-digital-essencial.pdf |

O principal inclui Mapa da Semana (1 página) e Plano de Retomada (3 páginas), reunidos ao acesso em um manual de 5 páginas. Os dois adicionais Detox contêm **o mesmo app completo**. A diferença é o guia: completo de 8 páginas ou essencial de 3 páginas; os manuais finais têm 9 e 4 páginas, respectivamente. Não anunciar app reduzido nem PDFs como única entrega do upsell/downsell.

Os quatro PDFs originais dos adicionais foram enviados pelo usuário. A conversão dos dois Detox para Aplicativos para Celular foi salva e os PDFs existentes preservados. Os três manuais finais já estão cadastrados. O principal foi encontrado atualizado; os manuais completo e essencial foram enviados nesta retomada e confirmados pela interface. A plataforma aceita um manual PDF por produto do tipo app; os bônus foram reunidos nesse manual.

Os PDFs pagos não estão no repositório público. O pacote editorial e os três manuais finais foram entregues separadamente ao usuário.

## Hotmart

- Principal: checkout parcelado confirmado `https://pay.hotmart.com/G108053232T?off=c6o6qy7a&checkoutMode=10`, destaque de 12x R$4,86 (total R$58,32 com acréscimo), ou R$47 à vista. Oferta à vista anterior `6bol81js` preservada. Oferta antiga `gp9smrrn` (R$37) preservada enquanto o quiz publicado ainda a utiliza.
- Upsell: `https://pay.hotmart.com/N108159655C?off=5plz74m0`, R$37.
- Downsell: `https://pay.hotmart.com/K108159658Y?off=ug4zbxib`, R$27.
- Prazo de reembolso observado nos cadastros: 7 dias.
- Quatro cadastros finalizados após confirmação explícita do titular nesta conversa. Hotmart confirmou envio à análise: cerca de 15 minutos, podendo levar até um dia. Não presumir aprovação a partir do envio.
- Checkout Builder: página `Rotina Pro R47 | 2 adicionais opcionais` publicada exclusivamente na oferta `6bol81js`. Rotinas Prontas (`xfyrvj0n`) R$9,90 e Projetos em Ação (`e5de7r0u`) R$12,90. Confirmados no checkout público com `checkoutMode=10`, inicialmente desmarcados. Totais observados: R$47 sem extras, R$56,90 com Rotinas, R$59,90 com Projetos e R$69,80 com ambos; remoções retornam a R$47. Nenhuma compra processada.

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

Pendências para liberar: confirmar aprovação dos dois produtos Detox; confirmar suporte e duração de acesso; publicar as páginas revisadas e habilitar controles quando os requisitos estiverem atendidos; ativar e testar o funil nativo; executar compra de teste autorizada e conferir recebimento principal, extras e recusas. Só então iniciar mídia com orçamento definido.

Na sessão anterior, o download não foi concluído. Nesta retomada, o pacote final foi baixado pela interface da conversa fornecida pelo titular; os dois manuais Detox foram enviados pela interface de upload da Hotmart e o principal já estava atualizado. O link do app Detox foi aberto e conferido.

## Janela inicial de cerca de sete dias

Começa após compra/entrega verificadas e tráfego autorizado. Preços R$47/R$37/R$27; sem redução automática nem agendamento de mídia. Comparar visitas e pedidos por landing/quiz, aceitação de cada adicional, receita retida, taxas, reembolsos e gasto real. Um clique não é venda; uma semana com poucas compras pode ser inconclusiva. Qualquer teste posterior de R$27/R$17 exige decisão com dados.

Fontes oficiais consultadas em 23/10/2026:
- https://suportehotmart.zendesk.com/hc/pt-br/articles/220402348-O-que-%C3%A9-e-como-configurar-meu-Funil-de-Vendas
- https://suportehotmart.zendesk.com/hc/pt-br/articles/360019967392-O-que-%C3%A9-e-como-configurar-o-Order-Bump

## Retomada: evidências desta sessão

- Aceite dos quatro termos autorizado explicitamente pelo titular; quatro confirmações de cadastro observadas.
- Estrutura do funil nativo conferida: upsell usa oferta 5plz74m0 e URL /upsell/; downsell usa ug4zbxib e /downsell/; aceite do completo aponta para /obrigado/. Funil permanece inativo durante a preparação.
- As validações de carrinho comprovam preços, presença e opcionalidade dos bumps; não comprovam pagamento, entrega por email ou redirecionamento pós-compra.
- Configuração da landing corrigida para o link publicado com checkoutMode=10. Controles checkoutEnabled e postPurchaseEnabled continuam false.

Atualização observada após o processamento: Rotinas Prontas e Projetos em Ação exibem `Vendas ativas` e `Processamento concluído`; os dois Detox exibem `Cadastro em processo`. O endpoint `/health` retornou `ready: true`, `mode: purchase-ledger`, versão 1. A abertura pública de `/upsell/` falhou com erro de resposta HTTP; o funil não deve ser ativado antes de publicar e conferir as páginas. Contato de suporte e duração de acesso foram solicitados ao titular e permanecem pendentes.

## Parcelamento solicitado pelo titular

Oferta nova `c6o6qy7a`, nome `Funil Rotina Pro | R47 parcelado | 2 bônus`, BRL R$47, parcelamento comum no cartão com taxas para o comprador, conforme modalidade já usada no preço base. A Hotmart não permite mudar a modalidade de uma oferta já criada. Opções de 1 a 12 parcelas; destaque público conferido em 12x R$4,86, total R$58,32, com aviso de acréscimo e alternativa de R$47 à vista. Recuperador automático desativado. O titular pediu destaque parcelado; não foi ativada recuperação recorrente.

Mesma página 1901462 com os dois bumps publicada também na nova oferta; página para a oferta à vista anterior preservada. Funil nativo 284854 atualizado para a oferta parcelada, sem ativação. Configuração do site em revisão aponta para `off=c6o6qy7a&checkoutMode=10`. Quatro testes existentes de rastreamento/configuração/pós-compra passaram com essa alteração. Não houve pagamento.
