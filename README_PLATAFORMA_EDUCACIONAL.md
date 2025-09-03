# 🏥 Plataforma Educacional - Saúde Digital

## 🚀 **Visão Geral**

Sistema completo de e-learning para cursos de Saúde Digital, desenvolvido com React, TypeScript, Tailwind CSS e Next.js. Focado em usabilidade, modularidade e interatividade para gestores públicos.

---

## 📁 **Estrutura do Projeto**

```
src/
├── components/
│   ├── ModuloCard.tsx          # Card reutilizável para módulos
│   ├── ProgressoBar.tsx        # Barra de progresso SUS-inspired
│   ├── Quiz.tsx               # Componente de quiz interativo
│   └── ui/                    # Componentes base (shadcn/ui)
├── pages/
│   ├── index.tsx              # Home com lista de módulos
│   └── modulos/
│       └── [id].tsx           # Página dinâmica de módulo
├── data/
│   └── modulos.json           # Dados estruturados dos módulos
└── assets/                    # Imagens e recursos
```

---

## 🎯 **Componentes Principais**

### **1. ModuloCard.tsx**
Componente reutilizável para exibir módulos na home.

**Props:**
```typescript
interface ModuloCardProps {
  id: number;
  titulo: string;
  descricao: string;
  duracao: string;
  tags: string[];
  link: string;
  corIcone: string;
  indiceModulo: number;
  progresso?: number;
  concluido?: boolean;
}
```

**Funcionalidades:**
- ✅ Progresso visual com barra
- ✅ Badge de módulo concluído
- ✅ Hover effects e animações
- ✅ Navegação automática
- ✅ Ícones dinâmicos por módulo
- ✅ Responsivo (grid adaptativo)

### **2. Página Dinâmica `/modulos/[id].tsx`**
Página completa de módulo com roteamento dinâmico.

**Funcionalidades:**
- ✅ Carregamento dinâmico de dados
- ✅ Progresso persistente (localStorage)
- ✅ Vídeo embedded (YouTube)
- ✅ Seções organizadas de conteúdo
- ✅ Links úteis na sidebar
- ✅ Navegação entre módulos
- ✅ Modo preview (sem vídeo)

### **3. ProgressoBar.tsx**
Componente de progresso com design SUS-inspired.

**Props:**
```typescript
interface ProgressoBarProps {
  progresso: number;
  totalModulos: number;
  modulosConcluidos: number;
  tempoEstimado: string;
  showDetails?: boolean;
  className?: string;
}
```

**Características:**
- ✅ Cores SUS (azul, verde, branco)
- ✅ Mensagens motivacionais
- ✅ Animações suaves
- ✅ Detalhes opcionais
- ✅ Responsivo

### **4. Quiz.tsx**
Componente de quiz interativo opcional.

**Funcionalidades:**
- ✅ Questões de múltipla escolha
- ✅ Feedback visual imediato
- ✅ Explicações detalhadas
- ✅ Progresso em tempo real
- ✅ Navegação entre questões
- ✅ Score final com mensagens

---

## 🎨 **Design System**

### **Paleta de Cores SUS-Inspired**
```css
/* Cores Principais */
--sus-blue: #0066CC;
--sus-green: #00A651;
--sus-white: #FFFFFF;

/* Gradientes */
from-slate-500 to-gray-600    /* Neutro */
from-blue-500 to-slate-600    /* Azul SUS */
from-teal-500 to-slate-600    /* Verde SUS */
from-indigo-500 to-slate-600  /* Roxo */
from-emerald-500 to-slate-600 /* Verde */
```

### **Tipografia**
- **Títulos**: `text-slate-900` (preto suave)
- **Texto Principal**: `text-slate-700` (cinza escuro)
- **Texto Secundário**: `text-slate-600` (cinza médio)

### **Componentes Visuais**
- **Cards**: `bg-white/80 backdrop-blur-sm`
- **Botões**: `bg-gradient-to-r` com hover effects
- **Badges**: `border-slate-200` com hover
- **Progresso**: Gradientes SUS-inspired

---

## 🔧 **Funcionalidades Implementadas**

### **1. Roteamento Dinâmico**
```typescript
// URLs automáticas
/modulos/1  // Módulo 1
/modulos/2  // Módulo 2
// etc...

// Preview mode
/modulos/1?view=preview
```

### **2. Progresso Persistente**
```typescript
// Salvar progresso
localStorage.setItem('progresso', JSON.stringify({
  modulo_1: { progresso: 75, concluido: false },
  modulo_2: { progresso: 100, concluido: true }
}));
```

### **3. Navegação Intuitiva**
- Botões "Anterior/Próximo"
- Breadcrumbs visuais
- Progresso em tempo real
- Estados de loading

### **4. Responsividade**
- **Mobile**: Coluna única
- **Tablet**: Grid 2 colunas
- **Desktop**: Grid 3 colunas
- **Large**: Grid 4 colunas

---

## 📊 **Dados Estruturados**

### **Estrutura do modulos.json**
```json
{
  "modulos": [
    {
      "id": 1,
      "titulo": "Fundamentos da Saúde Digital",
      "descricao": "...",
      "duracao": "3-4 horas",
      "tags": ["Conceitos", "Tecnologias"],
      "corIcone": "from-slate-500 to-gray-600",
      "videoUrl": "https://youtube.com/embed/...",
      "resumo": "...",
      "aplicacoesPraticas": ["..."],
      "linksUteis": [
        {
          "titulo": "...",
          "url": "...",
          "descricao": "..."
        }
      ],
      "secoes": [
        {
          "titulo": "...",
          "conteudo": "...",
          "pontosChave": ["..."]
        }
      ]
    }
  ]
}
```

---

## 🚀 **Como Usar**

### **1. Instalação**
```bash
npm install
npm run dev
```

### **2. Adicionar Novo Módulo**
1. Editar `src/data/modulos.json`
2. Adicionar entrada no array `modulos`
3. Incluir todos os campos obrigatórios
4. Adicionar vídeo URL (YouTube embed)

### **3. Personalizar Cores**
```typescript
// Em ModuloCard.tsx
const colors = [
  "from-slate-500 to-gray-600",
  "from-blue-500 to-slate-600",
  // ... adicionar mais cores
];
```

### **4. Adicionar Quiz**
```typescript
const quizQuestions = [
  {
    id: 1,
    question: "O que é saúde digital?",
    options: ["A", "B", "C", "D"],
    correctAnswer: 0,
    explanation: "Explicação detalhada..."
  }
];
```

---

## 🎯 **Funcionalidades Avançadas**

### **1. Sistema de Progresso**
- ✅ Persistência local
- ✅ Sincronização automática
- ✅ Estados visuais
- ✅ Mensagens motivacionais

### **2. Interatividade**
- ✅ Hover effects
- ✅ Animações CSS
- ✅ Transições suaves
- ✅ Feedback visual

### **3. Acessibilidade**
- ✅ Contraste adequado
- ✅ Navegação por teclado
- ✅ Screen readers
- ✅ WCAG compliance

### **4. Performance**
- ✅ Lazy loading
- ✅ Code splitting
- ✅ Otimização de imagens
- ✅ Caching inteligente

---

## 🔄 **Fluxo de Navegação**

```
Home (/) 
  ↓
Lista de Módulos
  ↓
ModuloCard (clique)
  ↓
Página do Módulo (/modulos/[id])
  ↓
Conteúdo + Progresso
  ↓
Quiz (opcional)
  ↓
Próximo Módulo
```

---

## 🛠 **Tecnologias Utilizadas**

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Next.js** - Roteamento e SSR
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes base
- **Lucide React** - Ícones
- **localStorage** - Persistência

---

## 📱 **Responsividade**

### **Breakpoints**
```css
sm: 640px   /* Mobile */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large */
```

### **Adaptações**
- **Cards**: Grid responsivo
- **Texto**: Escalável
- **Vídeos**: Aspect ratio mantido
- **Navegação**: Mobile-friendly

---

## 🎨 **Customização**

### **Cores SUS**
```css
/* Adicionar ao tailwind.config.js */
colors: {
  'sus-blue': '#0066CC',
  'sus-green': '#00A651',
  'sus-white': '#FFFFFF',
}
```

### **Animações**
```css
/* Hover effects */
hover:scale-105
hover:shadow-xl
transition-all duration-300
```

### **Gradientes**
```css
/* Gradientes SUS */
bg-gradient-to-r from-sus-blue to-sus-green
bg-gradient-to-br from-slate-500 to-gray-600
```

---

## 🚀 **Próximos Passos**

### **Funcionalidades Sugeridas**
1. **Modo Escuro** - Toggle de tema
2. **Página de Progresso** - Dashboard completo
3. **Certificado** - Geração automática
4. **Busca** - Filtro por conteúdo
5. **Markdown** - Conteúdo dinâmico
6. **Analytics** - Tracking de uso

### **Melhorias Técnicas**
1. **PWA** - App-like experience
2. **Offline** - Cache de conteúdo
3. **API** - Backend para progresso
4. **Testes** - Unit e E2E
5. **SEO** - Otimização para busca

---

## 📞 **Suporte**

Para dúvidas ou sugestões:
- **Documentação**: Este README
- **Issues**: GitHub Issues
- **Contribuições**: Pull Requests

---

**🎯 Objetivo Alcançado**: Plataforma educacional completa, modular e profissional para cursos de Saúde Digital! 