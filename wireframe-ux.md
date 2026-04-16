# Wireframe & Especificação UX — OPERAÇÃO RIO LP
> Handoff para Lucas. Referência base: FronteSara LP (mesmo DNA visual).
> Stack: Single HTML file + CSS inline + Vanilla JS. Zero dependências externas.

---

## 1. DECISÕES TÉCNICAS

### Stack
- HTML5 semântico, single file (`operacao-rio.html`)
- CSS custom properties (design tokens inline)
- Vanilla JS (countdown, scroll reveal, accordion)
- Google Fonts: **Bebas Neue** (headlines) + **Inter** (corpo)
- Deploy: GitHub Pages / Vercel (static)

### Design Tokens (CSS Variables)
```css
:root {
  --gold:        #C9A227;
  --gold-light:  #D4B445;
  --gold-dim:    rgba(201,162,39,0.15);
  --gold-border: rgba(201,162,39,0.25);
  --gold-glow:   rgba(201,162,39,0.4);
  --bg:          #0D0D0D;
  --bg-2:        #111111;
  --bg-3:        #1A1A1A;
  --text:        #E8E8E8;
  --text-muted:  #8A8A8A;
}
```

### Tipografia

| Elemento | Fonte | Tamanho Mobile | Tamanho Desktop |
|----------|-------|---------------|-----------------|
| H1 Hero | Bebas Neue | 42px | 72px |
| H2 Seção | Bebas Neue | 28px | 44px |
| H3 Card | Bebas Neue | 22px | 28px |
| Body | Inter | 16px | 17px |
| Body small | Inter | 14px | 15px |
| Label/Tag | Inter 600 | 11px | 11px |
| CTA | Inter 700 | 16px | 18px |

Usar `clamp()` para fluid typography: `font-size: clamp(42px, 6vw, 72px)`.

### Animações

| Animação | Onde | Implementação |
|----------|------|---------------|
| Scroll Reveal (fade up 30px) | Todas as seções | `IntersectionObserver` + classe `.visible` |
| Shimmer bar | Barra topo 3px | CSS `@keyframes shimmer` |
| Pulse glow | Botões CTA | CSS `@keyframes pulse` com box-shadow |
| Countdown | Hero | JS `setInterval` 1s |
| Accordion expand | FAQ + Objeções | CSS `max-height` transition + JS toggle |
| Hover lift (-4px) | Cards dos pilares | `transform: translateY(-4px)` |
| Staggered reveal | Grid de cards | Classes `.reveal-delay-1` a `.reveal-delay-4` |

---

## 2. ELEMENTOS GLOBAIS

### Shimmer Bar (topo)
- Barra de 3px fixa no topo absoluto
- Gradiente animado: `#5A3D0A → #C9A227 → #D4B445 → #C9A227 → #5A3D0A`
- Animação: slide infinito horizontal (3s)

### Nav Fixa
- `position: fixed`, `top: 3px`
- Background: `rgba(13,13,13,0.92)` com `backdrop-filter: blur(16px)`
- Conteúdo: Logo OPERAÇÃO RIO (height 56px) | CTA "GARANTIR VAGA"
- Border-bottom: 1px `var(--gold-border)`

### WhatsApp Flutuante (FAB)
- `position: fixed`, bottom: 24px, right: 24px
- Círculo 56px, fundo verde `#25D366`
- Ícone WhatsApp SVG branco centralizado
- Box-shadow: `0 4px 20px rgba(37,211,102,0.4)`
- Animação: leve bounce a cada 5s
- Link: `https://wa.me/55XXXXXXXXXXX?text=Quero+saber+mais+sobre+a+Operacao+Rio`
- **⚠️ PENDENTE:** número do WhatsApp — aguardar Nando definir

---

## 3. WIREFRAME SEÇÃO POR SEÇÃO

### 2.1 HERO
Layout: Flexbox column, center-aligned, `min-height: 100vh`
Background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,162,39,0.08), transparent 70%), var(--bg)`

```
[Badge: CONVOCAÇÃO ABERTA · 16 DE MAIO · RIO DE JANEIRO]
[Logo OPERAÇÃO RIO — 280px mobile / 420px desktop]
Você não precisa de mais motivação. Precisa de direção.
("direção" em gold highlight)
[COUNTDOWN: DD | HH | MM | SS]
[GARANTIR MINHA POSIÇÃO — R$197] (btn gold, pulse, full-width mobile)
"Vagas limitadas · Lote 1"
[Info bar: 16 Mai | Rio de Janeiro | Imersão presencial]
```

**Countdown (JS):**
```javascript
const target = new Date('2026-05-16T09:00:00-03:00').getTime();
function updateCountdown() {
  const diff = target - Date.now();
  if (diff <= 0) { /* "EVENTO HOJE!" */ return; }
  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);
  // atualizar DOM
}
setInterval(updateCountdown, 1000);
```

Blocos: `var(--bg-3)`, borda gold, número Bebas Neue 36px gold, label Inter 10px muted.

---

### 2.2 DIAGNÓSTICO
Background: `var(--bg)` | Container 680px max-width

```
[Tag: RECONHECIMENTO]
Se nada mudou até agora, não é falta de esforço.
[Divider gold 48px]
Texto corrido em parágrafos curtos (Inter 17px muted)
[Quote box: borda-left 3px gold, fundo gold-dim]
"O problema não é o quanto você trabalha.
 É pra onde você está apontando."
```

---

### 2.3 A VIRADA
Background: `var(--bg-2)`

```
[Tag: A VIRADA]
E se em 1 dia você saísse com um plano real?
[Divider]
Texto de transição...
[Lista antes/depois — ícone gold + antes riscado + depois bold]
  • Antes: achismo → Depois: estratégia
  • Antes: gastar → Depois: investir
  • Antes: invisível → Depois: referência
```

---

### 2.4 OS 4 PILARES
Background: `var(--bg)` | Grid 2×2 desktop, 1 coluna mobile

```
[Tag: OS 4 PILARES DA OPERAÇÃO]
O que você vai dominar em 1 dia.
[Grid 2x2 de cards]
```

**Card specs:**
- Background: `var(--bg-3)`, border gold-border, border-radius 10px, padding 32px 28px
- Número: "01" Inter 11px gold uppercase letter-spacing 3px
- Ícone: SVG inline 32px gold
- Título: Bebas Neue 22px white
- Descrição: Inter 14px muted
- Hover: `translateY(-4px)`, border-color mais opaco
- Staggered reveal: delays 0.1s, 0.2s, 0.3s, 0.4s

---

### 2.5 OS MENTORES
Background: `var(--bg-2)` | Grid 2 colunas desktop, 1 mobile

```
[Tag: OS MENTORES]
Quem vai guiar sua operação.
[Grid: Braian Corrêa | Nando Borba]
```

**Speaker Card (reutilizar padrão FronteSara):**
- Container: `var(--bg-3)`, border gold-border, border-radius 12px, overflow hidden
- Área foto: 380px height, gradient overlay bottom, badge de horário top-right
- Badge horário: fundo `rgba(13,13,13,0.8)`, texto gold 11px
- Nome: Bebas Neue 26px white
- Título: Inter 13px gold uppercase
- Tema palestra: Inter 17px italic
- Bullets: Inter 14px muted, seta gold antes de cada item
- Quote: fundo gold-dim, border-left 3px gold
- Hover foto: `scale(1.04)` transition 0.5s

---

### 2.6 PROVA SOCIAL
Background: `var(--bg)`

**Bloco A — Depoimento:**
- Card: `var(--bg-3)`, border gold-border, border-radius 12px, padding 32px
- Layout: foto circular 64px (avatar) + texto (flex row desktop, column mobile)
- Aspas decorativas gold oversized
- Assinatura: nome bold + empresa muted
- **⚠️ PENDENTE:** depoimento real — Nando coletar

**Bloco B — Galeria FronteSara:**
- Grid 4 colunas desktop / 2 mobile
- `object-fit: cover`, height 220px, border-radius 6px
- Filtro padrão: `grayscale(20%) brightness(0.85)`
- Hover: `grayscale(0%) brightness(1)`, `scale(1.02)`
- Primeira imagem: `grid-column: span 2`, height 300px
- Label: "REGISTROS DA IMERSÃO FRONTESARA" Inter 11px muted
- **⚠️ PENDENTE:** Miguel seleciona e edita os takes

---

### 2.7 LOTES (Precificação)
Background: `var(--bg-2)`, border-top + bottom gold-border

```
[Tag: INGRESSOS]
Escolha sua posição.
[Grid 3 colunas desktop / stack mobile]
```

**Lote 1 (ATIVO):**
- Border: `2px solid var(--gold)`
- Badge: "LOTE ATIVO" fundo gold, texto preto
- Preço: Bebas Neue 48px gold
- CTA: botão gold full-width, pulse animation
- Scale: `transform: scale(1.03)` para destaque
- Sombra: `box-shadow: 0 0 40px rgba(201,162,39,0.15)`

**Lotes 2 e 3 (BLOQUEADOS):**
- `opacity: 0.5`
- Border: `1px solid rgba(255,255,255,0.06)`
- Preço: Bebas Neue 48px `color: var(--text-muted)`
- Badge: "EM BREVE" fundo cinza escuro
- CTA: cinza disabled, `cursor: not-allowed`
- Filtro sutil: `filter: blur(0.5px)`
- Mobile: aparecem colapsados abaixo do Lote 1

**Ativação futura:** trocar classe `.lot-active` ↔ `.lot-locked` no HTML. Sem JS adicional.

---

### 2.8 CRONOGRAMA
Background: `var(--bg-2)` | Timeline vertical (reutilizar `.schedule-timeline` do FronteSara)

```
[Tag: CRONOGRAMA]
O plano da operação.

09:00 ──o── Credenciamento + Welcome Coffee
09:30 ──★── BRAIAN CORRÊA [PALESTRA]
            Produto certo, modelo que escala
10:30 ──o── ☕ Coffee Break
11:00 ──★── NANDO BORBA [PALESTRA]
            Posicionamento, investimento e canais
12:00 ──o── Painel Q&A — Braian + Nando
12:30 ──o── Networking livre
13:00 ──o── Encerramento
```

**Specs:**
- Linha vertical: 1px gradiente gold → transparente
- Nós: círculos 14px, borda gold 2px, fundo bg-2
- Nós destacados (palestras): fundo gold sólido + glow
- Horário: 56px fixed width, right-aligned, Inter 13px bold gold
- Cards palestras: border gold-border, gradiente sutil

---

### 2.9 OBJEÇÕES (Accordion)
Background: `var(--bg)` | Container 720px max-width

```
[Tag: SUAS DÚVIDAS]
Talvez você esteja pensando...

[Accordion — 5 itens]
+ "Já fui em eventos assim e não mudou nada."
+ "R$197 é barato demais, deve ser fraco."
+ "Não sei se é pro meu segmento."
+ "Não tenho tempo de sair um dia inteiro."
+ "Posso esperar a próxima edição."
```

**Specs:**
- Item fechado: `var(--bg-3)`, border-bottom 1px rgba-branco, padding 20px 24px
- Pergunta: Inter 16px bold white + ícone `+` gold à direita
- Item aberto: border-left 3px gold, ícone vira `×`
- Resposta: `max-height: 0` → `max-height: 500px`, transition 0.4s
- Só 1 item aberto por vez

---

### 2.10 CTA FINAL
Background: `radial-gradient` com gold glow central + `var(--bg)`

```
[Tag: BRIEFING FINAL]
O briefing está na mesa. A operação tem data.
[Divider centralizado]
Texto de fechamento...
[GARANTIR MINHA POSIÇÃO — R$197] (botão maior — padding 22px 52px)
"Lote 1 · Vagas limitadas"
```

---

### 2.11 FAQ
Background: `var(--bg-2)` | Mesmo componente accordion da seção 2.9

7 perguntas (ver copy-lp.md para textos completos).

---

### 2.12 FOOTER
```
[Logo OPERAÇÃO RIO, 120px]
Uma iniciativa Fé no Front
[Shimmer divider 80px]
© 2026 Fé no Front. Todos os direitos reservados.
[WhatsApp FAB flutuante]
```

---

## 4. FLUXO DE CONVERSÃO — MAPA DE CTAs

| Posição | Tipo | Texto | Destino |
|---------|------|-------|---------|
| Nav (fixo) | Secundário | "GARANTIR VAGA" | Âncora `#lotes` |
| Hero | Primário | "GARANTIR MINHA POSIÇÃO — R$197" | Sympla (link externo) |
| Após Pilares | Secundário | "QUERO MEU LUGAR" | Âncora `#lotes` |
| Dentro de Lotes | Primário | "GARANTIR AGORA — R$197" | Sympla (link externo) |
| CTA Final | Primário | "GARANTIR MINHA POSIÇÃO — R$197" | Sympla (link externo) |
| WhatsApp (flutuante) | Terciário | Ícone | wa.me link |

**Ritmo 1-3-1:** CTA forte no início → repetição após valor/prova social/lotes → CTA forte no final.

---

## 5. O QUE COPIAR / ADAPTAR DO FRONTESARA

| Componente | Ação |
|-----------|------|
| Shimmer bar | Copiar direto |
| Nav fixa | Copiar, trocar logo |
| Scroll reveal (IntersectionObserver) | Copiar direto |
| Countdown timer | Copiar, atualizar data alvo |
| Speaker cards | Copiar, adaptar conteúdo |
| Timeline de cronograma | Copiar, adaptar blocos |
| Proof grid (galeria fotos) | Copiar direto |
| CTA section | Copiar, adaptar copy |
| CSS shimmer, pulse, hover | Copiar direto |

**O que é novo (não existe no FronteSara):**
- Lotes com estado ativo/bloqueado
- Seção objeções (accordion separado do FAQ)
- WhatsApp FAB
- Seção "A Virada" (lista antes/depois)
- Seção "Diagnóstico" (espelho)

**Ajustes de identidade:**
- Playfair Display → **Bebas Neue** nos headlines
- DM Sans → **Inter** no corpo
- Paleta: `#C9A84C` → `#C9A227`

---

## 6. ASSETS NECESSÁRIOS

| Asset | Status | Responsável |
|-------|--------|-------------|
| Logo OPERAÇÃO RIO (PNG/SVG transparente) | ✅ Pronto | Lucas |
| Foto Nando Borba (crop vertical, alta res) | Coletar | Nando |
| Foto Braian Corrêa (crop vertical, alta res) | Coletar | Braian |
| 5-6 fotos evento FronteSara para galeria | ⚠️ Pendente | Miguel |
| 1 foto de depoimento (participante) | ⚠️ Pendente | Nando |
| Ícone WhatsApp SVG | Lucas |
| Link Sympla do evento | ⚠️ Pendente | Nando |
| Número WhatsApp para FAB | ⚠️ Pendente | Nando |

---

## 7. ORDEM DE IMPLEMENTAÇÃO SUGERIDA

1. Estrutura HTML completa com todas as seções (sem estilo)
2. CSS: tokens + layout base + mobile-first
3. CSS: componentes (cards, accordion, timeline, lotes ativo/bloqueado)
4. JS: countdown + scroll reveal + accordion
5. Conteúdo: textos finais, imagens, links Sympla
6. Responsivo: ajustes tablet + desktop
7. Performance: otimizar imagens WebP, testar Lighthouse (target: 95+ mobile)

---

## 8. ACESSIBILIDADE (WCAG AA)

| Requisito | Implementação |
|-----------|---------------|
| Contraste gold/preto | 8.2:1 (passa AA e AAA) |
| Contraste texto/fundo | 16.5:1 (passa) |
| Touch targets | Mínimo 44×44px |
| Focus indicators | `:focus-visible` outline gold 2px |
| Semântica HTML | `<header>`, `<main>`, `<section>`, `<footer>` |
| Accordion | `aria-expanded`, `aria-controls` |
| Countdown | `aria-live="polite"`, atualiza a cada minuto |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` desabilita animações |
