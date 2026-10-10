# Manual Oficial de Cores — Aprendendo Com Infoprodutos

**Versão 1.0 — aprovado em 09/10/2026.**

| Identidade | Fundo principal | Destaque | Complementar | Claro |
| --- | --- | --- | --- | --- |
| Marca-mãe | `#07131F` | `#E8C77E` | `#0D2636` | `#F6F0E6` |
| Cultura & Entretenimento | `#121E34` | `#E8C77E` | `#B88A57` | `#F6F0E6` |
| Fitness & Saúde | `#10392C` | `#B7DC9D` | `#EA9C54` | `#F5F3EC` |
| Mental & Financeiro | `#0B2127` | `#B8F06E` | `#E8C77E` | `#F6F0E6` |

## Regras

1. Cabeçalho, rodapé e elementos institucionais utilizam a marca-mãe em todos os hubs.
2. Cards, títulos destacados, ícones e estados interativos herdam o destaque do hub.
3. Páginas internas podem ter fundo claro e cards brancos, seguindo o modelo Menú Familiar.
4. Landing pages comerciais preservam flexibilidade visual por produto e mercado.
5. Novos núcleos e subnichos herdam a paleta do hub até decisão posterior.
6. Garantir contraste acessível e foco visível em todas as combinações de fundo e texto.
7. Não mudar arquitetura, rotas, produtos nem checkouts para atualizar somente as cores.

## Arquivos envolvidos na primeira aplicação

- `public/src/portal.css`: tokens oficiais e páginas internas clássicas.
- `public/src/arquitetura.css`: páginas institucionais e hubs; classes `eco-theme-cultura`, `eco-theme-fitness`, `eco-theme-mental`.
- `public/src/fitness-editorial.css`: cards visuais de Fitness & Saúde.
- `public/src/menu-familiar-mercados.css`: cabeçalho e rodapé institucionais com páginas internas claras preservadas.

A versão 1.0 define cores, não substitui layouts, imagens, textos, preços, links ou fluxos de compra.