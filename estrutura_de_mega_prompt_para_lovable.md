# Mega Prompt: Otimizador de Currículos ATS Friendly

## 1. Contexto e Objetivo
Crie uma aplicação web focada em ajudar candidatos a otimizarem seus currículos para sistemas ATS (Application Tracking System). O objetivo é comparar a descrição de uma vaga com o currículo atual e gerar uma versão ajustada com maior probabilidade de aprovação.

## 2. Regras de Negócio e Restrições
*   A aplicação NUNCA deve inventar, criar ou alucinar experiências, habilidades ou formações que o candidato não possui.
*   Exibir um banner/disclaimer fixo e visível na interface com a mensagem: "Esta ferramenta melhora a forma como você se apresenta, mas nunca inventa experiências que você não tem."

## 3. Arquitetura de Interface
*   Cabeçalho: Logo simples e o título da aplicação.
*   Área de Input: Dois campos de texto (Textareas) lado a lado em telas grandes (um sobre o outro em mobile). O da esquerda para a "Descrição da Vaga" e o da direita para o "Seu Currículo".
*   Botão de Ação: Centralizado, chamativo, com o texto "Analisar e Otimizar".
*   Área de Resultados (oculta até a análise ser feita):
    *   *Score de Match: Um gráfico circular mostrando a porcentagem de compatibilidade inicial.*
    *   *Palavras-chave: Duas listas (Cards) - "Encontradas" (verde) e "Faltantes" (vermelho/laranja).*
    *   *Currículo Otimizado: Uma área de texto rico mostrando a nova versão do currículo, com um botão "Exportar para PDF".*

## 4. Fluxo de Interação
*   Quando o usuário clica em "Analisar", os botões são desativados e um estado de loading/esqueleto de carregamento aparece com a mensagem "Analisando compatibilidade com o ATS...".
*   Após o loading, a tela rola suavemente (scroll) para a Área de Resultados.

## 5. Design System e Identidade Visual
*   Stack visual: Use Tailwind CSS e componentes do shadcn/ui.
*   Paleta de Cores: Fundo minimalista (slate-50), botões primários em azul (blue-600), textos em cinza escuro (slate-800).
*   Estilo: Clean, profissional, com bordas arredondadas suaves (rounded-lg) nas caixas de texto e sombras leves (shadow-sm) para destacar a área de resultados.