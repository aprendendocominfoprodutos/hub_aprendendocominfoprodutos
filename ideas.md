# Design Brainstorm - Mitologia Grega Landing Page

## Conceito Selecionado: Classicismo Cinematográfico Premium

**Design Movement:** Neoclassicismo Digital + Cinema Épico

Este design funde a elegância atemporal do classicismo grego com a dramaticidade do cinema épico moderno. A página respira luxo através de contrastes de luz e sombra, tipografia serifada clássica e um uso estratégico de dourado como elemento de poder e sabedoria.

---

## Core Principles

1. **Dramaticidade Controlada:** Cada seção revela informação através de luz e sombra, criando tensão visual que mantém o usuário engajado.
2. **Hierarquia Tipográfica Forte:** Serifas clássicas (Cinzel) para autoridade; sans-serif moderna (Montserrat) para legibilidade e ação.
3. **Espaçamento Generoso:** Respiração visual entre seções. Nada apertado. Cada elemento tem seu próprio "templo".
4. **Ouro como Linguagem:** Dourado não é decoração—é linguagem de valor, transformação e conhecimento ancestral.

---

## Color Philosophy

| Cor | Hex | Uso | Intenção |
| :--- | :--- | :--- | :--- |
| **Preto Profundo** | `#0a0a0a` | Background principal | Elegância absoluta, foco no conteúdo |
| **Dourado Premium** | `#d4af37` | Acentos, títulos, CTAs | Riqueza, sabedoria, transformação |
| **Branco Marfim** | `#f5f5f5` | Texto corpo, backgrounds secundários | Legibilidade, sofisticação |
| **Cinza Escuro** | `#1a1a1a` | Cards, seções | Profundidade sem quebrar o preto |
| **Dourado Escuro** | `#b8860b` | Hover states, linhas | Interatividade sutil |

**Filosofia:** O preto é o vazio do universo. O dourado é a iluminação da sabedoria. O branco é a verdade revelada.

---

## Layout Paradigm

**Estrutura Vertical Épica (Mobile-First)**

- **Hero Section:** Imagem de fundo cinematográfica com overlay gradiente preto → transparente. Headline em Cinzel, posicionado no centro-inferior (revela conteúdo conforme scroll).
- **Seções Alternadas:** Imagem à esquerda (desktop) / Acima (mobile) + Texto à direita / Abaixo. Cria ritmo visual.
- **Cards em Grid Assimétrico:** Planos de compra em 2 colunas (mobile) → 4 colunas (desktop), com o "Premium" destacado 20% maior.
- **Dividers Cinematográficos:** Linhas de ouro com efeito de fade-in ao scroll.

---

## Signature Elements

1. **Laurel Wreath Dividers:** Coroas de louros em ouro separando seções. Símbolo de vitória e conhecimento.
2. **Golden Particles/Dust Effect:** Sutis partículas de ouro animadas no background do hero. Sensação de magia ancestral.
3. **Marble Texture Overlays:** Texturas de mármore grego em backgrounds secundários. Tátil, premium.

---

## Interaction Philosophy

- **Hover Effects:** Botões ganham glow dourado. Cards se elevam com sombra dourada.
- **Scroll Animations:** Elementos aparecem com fade + slide suave (não agressivo).
- **CTA Buttons:** Transformação visual clara (background dourado → branco ao hover, texto inverte).
- **Micro-interactions:** Ícones de checkmark animados ao aparecer. Contadores de benefícios que "contam" ao scroll.

---

## Animation Guidelines

- **Entrance:** Fade + slide de baixo (200ms, ease-out). Não muito rápido—deixa respirar.
- **Hover:** Scale 1.05 + glow dourado (150ms). Sutil, não exagerado.
- **Scroll Trigger:** Elementos aparecem quando 30% visíveis na viewport.
- **Parallax Suave:** Hero image move 20% mais lento que scroll. Cria profundidade.

---

## Typography System

| Elemento | Font | Weight | Size (Mobile/Desktop) | Uso |
| :--- | :--- | :--- | :--- | :--- |
| **Headline Principal** | Cinzel | 700 | 32px / 56px | Hero, títulos de seção |
| **Subtitle** | Cinzel | 400 | 18px / 24px | Subtítulos, contexto |
| **Body Text** | Montserrat | 400 | 14px / 16px | Descrições, conteúdo |
| **CTA Button** | Montserrat | 600 | 14px / 16px | Calls-to-action |
| **Label** | Montserrat | 500 | 12px / 13px | Tags, labels, preços |

**Hierarquia:** Cinzel cria autoridade; Montserrat garante legibilidade e ação.

---

## Estrutura da Página

1. **Hero Section** (100vh mobile, 80vh desktop)
   - Background: Imagem de Zeus/Deus grego cinematográfica
   - Overlay: Gradiente preto (opaco embaixo) → transparente (topo)
   - Headline: "MITOLOGIA GREGA — Deuses, Heróis e Significados Ocultos"
   - Subheadline: "Desvende os segredos ancestrais que transformam sua vida"
   - CTA: "Comece Agora" (dourado, glow)

2. **Apresentação do Produto**
   - Mockup do ebook (3D render) à esquerda
   - Texto descritivo à direita
   - Benefícios em bullets com ícones dourados

3. **O Que Você Vai Aprender**
   - Grid de 6 cards com tópicos principais
   - Ícones de mitologia (Zeus, Atena, etc.)

4. **Planos de Compra**
   - 4 cards: Básico, Essencial, Premium (destaque), Pacote Completo
   - Comparação visual de features

5. **Benefícios Transformacionais**
   - Seção com 5 benefícios principais
   - Ícones + descrição + animação de checkmark

6. **CTA Final**
   - Urgência: "Oferta por tempo limitado"
   - Botão grande em dourado
   - Garantia de satisfação

---

## Notas de Implementação

- **Mobile First:** Todas as seções começam em 1 coluna, expandem para multi-coluna em desktop.
- **Acessibilidade:** Contraste de cores testado (WCAG AA). Texto sempre legível sobre backgrounds.
- **Performance:** Imagens otimizadas. Animations usam GPU (transform, opacity).
- **Conversão:** CTA visível a cada scroll. Urgência e garantia destacadas.
