# 📘 Manual de Marca - Hub/Plataforma Principal

## Visão Geral
O Hub é a **porta de entrada** da plataforma de infoprodutos. Deve transmitir:
- ✨ **Profissionalismo e confiança**
- 🎯 **Clareza e simplicidade**
- 🚀 **Inovação e crescimento**
- 🌟 **Qualidade premium**

---

## 1. Identidade Visual

### Conceito
**"Convergência de Conhecimentos"** — Um espaço onde diferentes áreas de aprendizado se encontram de forma harmoniosa e organizada.

### Metáfora Visual
- Linhas geométricas que se cruzam
- Movimento ascendente (crescimento)
- Luz e claridade (conhecimento iluminando)
- Espaço aberto e respirável

---

## 2. Paleta de Cores

### Cores Primárias
| Cor | Hex | RGB | Uso |
|-----|-----|-----|-----|
| **Azul Profundo** | `#0F172A` | 15, 23, 42 | Background principal, confiança |
| **Azul Médio** | `#1E293B` | 30, 41, 59 | Backgrounds secundários |
| **Branco Puro** | `#FFFFFF` | 255, 255, 255 | Textos principais, destaque |
| **Cinza Claro** | `#E2E8F0` | 226, 232, 240 | Textos secundários, bordas |

### Cores de Destaque
| Cor | Hex | RGB | Uso |
|-----|-----|-----|-----|
| **Âmbar/Ouro** | `#F59E0B` | 245, 158, 11 | CTAs, hover effects, destaque |
| **Verde Esmeralda** | `#10B981` | 16, 185, 129 | Sucesso, confirmação |
| **Coral Suave** | `#FB7185` | 251, 113, 133 | Alertas, atenção |

### Gradientes
```
Gradiente Principal (Hero):
from-slate-900 via-slate-800 to-slate-900

Gradiente de Destaque:
from-amber-500 to-amber-600
```

---

## 3. Tipografia

### Fontes Recomendadas
| Tipo | Fonte | Peso | Uso |
|------|-------|------|-----|
| **Display/Headline** | Poppins | 700 (Bold) | Títulos principais, H1 |
| **Subheading** | Poppins | 600 (SemiBold) | H2, H3, destaque |
| **Body** | Inter | 400 (Regular) | Texto corpo, descrições |
| **Caption** | Inter | 500 (Medium) | Pequenos textos, labels |

### Hierarquia Tipográfica
```
H1: 48px / 56px (Display) - Poppins 700
H2: 36px / 44px (Display) - Poppins 700
H3: 28px / 36px (Heading) - Poppins 600
H4: 20px / 28px (Heading) - Poppins 600
Body: 16px / 24px (Regular) - Inter 400
Small: 14px / 20px (Regular) - Inter 400
Caption: 12px / 16px (Medium) - Inter 500
```

---

## 4. Componentes Visuais

### Botões
**Primário (CTA)**
- Background: Âmbar (#F59E0B)
- Texto: Branco
- Padding: 12px 24px
- Border Radius: 8px
- Hover: Âmbar mais escuro (#D97706)
- Transição: 300ms

**Secundário**
- Background: Transparente
- Borda: 2px Cinza Claro
- Texto: Branco
- Padding: 12px 24px
- Border Radius: 8px
- Hover: Fundo Azul Médio

### Cards/Containers
- Border Radius: 16px (arredondado)
- Shadow: `0 4px 6px rgba(0, 0, 0, 0.1)`
- Hover Shadow: `0 20px 25px rgba(0, 0, 0, 0.15)`
- Transição: 300ms ease-out
- Overflow: hidden

### Divisores
- Cor: Azul Médio com 50% opacidade
- Altura: 1px
- Estilo: Solid

---

## 5. Espaçamento & Layout

### Escala de Espaçamento
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

### Grid
- Máxima largura: 1280px (container)
- Padding lateral: 16px (mobile), 24px (desktop)
- Gap entre colunas: 24px
- Colunas: 1 (mobile), 2 (tablet), 3 (desktop)

---

## 6. Estilo de Imagens

### Thumbnails (Cards)
- Aspect Ratio: 4:3
- Border Radius: 16px
- Overlay: Gradiente preto com 60% opacidade (hover)
- Transição de zoom: 300ms (scale 1 → 1.1)

### Backgrounds
- Tipo: Gradientes suaves ou imagens com overlay
- Profundidade: Usar sombras e blur para criar camadas
- Contraste: Garantir legibilidade do texto

---

## 7. Ícones & Elementos

### Ícones
- Biblioteca: Lucide React
- Tamanho padrão: 24px
- Cor: Herdada do contexto (branco, âmbar, etc.)
- Stroke: 2px

### Decorativos
- Linhas geométricas sutis
- Formas abstratas (círculos, quadrados com opacidade)
- Efeito de profundidade com sombras

---

## 8. Animações & Transições

### Transições Padrão
```
Hover rápido: 200ms ease-in-out
Transição média: 300ms ease-out
Animação longa: 500ms ease-in-out
```

### Efeitos
- **Hover em cards**: Scale 1.02 + Shadow aumentada
- **Hover em botões**: Background color change + slight scale
- **Entrada de página**: Fade in 300ms
- **Scroll**: Parallax suave em backgrounds

---

## 9. Acessibilidade

### Contraste
- Texto branco sobre azul profundo: ✅ WCAG AA
- Texto sobre imagens: Usar overlay escuro para garantir legibilidade
- Mínimo de contraste: 4.5:1 para textos

### Interatividade
- Focus states visíveis (outline âmbar)
- Elementos clicáveis com cursor pointer
- Feedback visual em todas as ações

---

## 10. Aplicação Prática

### Header
- Background: Azul profundo com backdrop blur
- Logo: Branco com destaque em âmbar
- Texto: Branco e cinza claro

### Hero Section
- Background: Gradiente azul profundo
- Título: Branco, Poppins 700, 48px
- Subtítulo: Cinza claro, Inter 400, 20px
- CTA: Botão âmbar

### Cards de Produtos
- Background: Azul médio com borda sutil
- Imagem: 4:3, border radius 16px
- Título: Branco, Poppins 600, 24px
- Botão: Âmbar com hover effect

### Footer
- Background: Azul profundo
- Texto: Cinza claro
- Links: Âmbar no hover

---

## 11. Casos de Uso

### Quando usar Âmbar
- Botões principais (CTA)
- Links em hover
- Destaques importantes
- Ícones de ação

### Quando usar Verde
- Confirmações
- Status positivo
- Sucesso de ação

### Quando usar Coral
- Avisos
- Erros
- Atenção necessária

---

## 12. Diferenciação dos Nichos

Cada nicho terá:
- ✅ Paleta de cores própria
- ✅ Tipografia complementar
- ✅ Estilo visual único
- ✅ Componentes customizados

**Exemplo:**
- **Mitologia**: Ouro + preto (elegante, ancestral)
- **Fitness**: Verde + branco (energético, limpo)
- **Mental/Financeiro**: Azul + ouro (confiança, crescimento)

---

## 13. Checklist de Implementação

- [ ] Paleta de cores aplicada em CSS variables
- [ ] Tipografia carregada via Google Fonts
- [ ] Componentes seguem espaçamento
- [ ] Transições aplicadas
- [ ] Acessibilidade verificada
- [ ] Responsividade testada
- [ ] Hover states implementados
- [ ] Imagens otimizadas

---

**Versão:** 1.0  
**Data:** Maio 2026  
**Responsável:** Design System
