# Otimizador de Currículos ATS Friendly

Treino do curso de **Vibe Code** da **DIO.ME**. Como o objetivo de aprendizada na **criação de soluções com IA**, foi usado a IA Gemini e Antigravity CLI no processo de laboratório. O foco é ajudar candidatos a otimizarem seus currículos para sistemas **ATS (Applicant Tracking System)**.

A ferramenta compara a descrição de uma vaga com o currículo atual do profissional, identifica palavras-chave correspondentes e faltantes, calcula o score de match inicial e gera uma versão ajustada para máxima legibilidade por algoritmos de triagem.

---

## ✨ Funcionalidades Implementadas

1. **Cabeçalho Profissional**:
   - Logotipo temático e título intuitivo.
   - Botão **"Carregar Exemplo"** com 1 clique para testar instantaneamente.
   - Botão **"Limpar"** para recomeçar.

2. **Banner Fixo de Disclaimer**:
   - Visível no topo da interface em todas as etapas, assegurando ética profissional.

3. **Área de Entrada Responsiva**:
   - Layout lado a lado em telas grandes (`grid-cols-2`) e empilhado no mobile.
   - Textarea para a **"Descrição da Vaga"** (com contagem de palavras).
   - Textarea para **"Seu Currículo"** (com contagem de palavras).

4. **Botão de Ação Chamativo**:
   - Botão centralizado **"Analisar e Otimizar"** com feedback tátil e validação de campos.

5. **Fluxo de Interação com Skeleton Loading**:
   - Ao clicar em "Analisar", os botões são desativados e entra em cena o estado de loading com mensagem:
     `"Analisando compatibilidade com o ATS..."`
   - Após o processamento, executa **scroll suave automático** até a Área de Resultados.

6. **Área de Resultados**:
   - **Score de Match**: Gráfico circular SVG dinâmico indicando o percentual de compatibilidade e diagnóstico qualitativo.
   - **Palavras-chave Encontradas**: Card com tags verdes destacando termos detectados no currículo.
   - **Palavras-chave Faltantes**: Card com tags de atenção listando requisitos da vaga ausentes no currículo (com alerta ético).
   - **Currículo Otimizado**:
     - Visualizador em texto rico e editável diretamente pelo usuário.
     - Formatação limpa padrão A4 e compatível com parsers ATS (sem tabelas que quebram a leitura).
     - Botão **"Exportar para PDF"** funcional (utilizando `html2pdf.js`).
     - Botão **"Copiar Texto"** para a área de transferência.

---

## 🎨 Identidade Visual e Stack

- **Stack**: HTML5, JavaScript Moderno (ES6+), CSS3.
- **Visual**: **Tailwind CSS** com tokens inspirados no design system **shadcn/ui**.
- **Ícones**: **Lucide Icons**.
- **Cores**: Fundo minimalista (`bg-slate-50`), botões de ação em azul primário (`bg-blue-600`), textos em cinza escuro (`text-slate-800`).
- **Exportação**: `html2pdf.js` para download de PDF padrão A4.

---

## 🚀 Como Executar Localmente

### Opção 1: Abrir diretamente no Navegador
Basta dar um duplo clique no arquivo [`index.html`](index.html) para abrir em qualquer navegador moderno (Chrome, Edge, Firefox, Brave, Safari).

### Opção 2: Servidor Local via Python
No terminal, na pasta do projeto:
```bash
python -m http.server 3000
```
Em seguida, acesse no navegador: [http://localhost:3000](http://localhost:3000)
