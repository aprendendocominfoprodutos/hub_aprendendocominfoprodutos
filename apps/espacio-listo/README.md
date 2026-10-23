# Espacio Listo — miniapp online

Aplicativo independente do Worker do portal. O produto está em `https://espacio-listo.aprendendocominfoprodutos.com.br/app`; a administração fica em `/admin`.

## Arquitetura

- Cloudflare Worker `espacio-listo-latam`, domínio personalizado e HTTPS.
- D1 `espacio-listo-prod` para missões, versões publicadas, contas, convites, direitos, progresso e ferramentas.
- Login por e-mail e senha. O proprietário tem uma credencial separada configurada em binding; clientes ativam sua conta por convite de uso único e senha própria.
- Conteúdo pago reside no D1, fora deste repositório público. O navegador recebe apenas missões de contas autorizadas.

## Publicação do código

`node build.mjs` gera `worker.generated.mjs` a partir de `worker-template.mjs` e `public/`. Implante o módulo com bindings `DB` (D1) e `OWNER_PASSWORD_HASH` (SHA-256 da senha administrativa). A versão gerada não deve ser adicionada ao repositório.

`schema.sql` define o banco. O catálogo inicial e os textos das seis línguas são conteúdo privado e precisam ser semeados separadamente. Atualizações posteriores do conteúdo são feitas em `/admin`, com rascunho e publicação separados.

## Entrega e pagamento

O produto Hotmart Espacio Listo ainda precisa ser criado e seu checkout vinculado em Configurações. A concessão automática por webhook está deliberadamente desativada; `/api/webhooks/hotmart` responde 503. Até existir integração verificada, o proprietário confirma a compra na Hotmart, cria o convite no painel, concede acesso ao cliente e entrega o link de ativação. Não conceda acesso apenas pela visita à página de compra.

## Segurança operacional

O repositório é público. Não inclua senhas, tokens, dados dos clientes, catálogo pago ou exportações do banco. A senha do proprietário pode ser trocada atualizando o binding e encerrando sessões ativas no D1. O limite de tentativas de login é por IP e e-mail. Faça backup do D1 antes de migrações.
