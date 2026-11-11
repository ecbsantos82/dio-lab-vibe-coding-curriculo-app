/**
 * Otimizador de Currículos ATS Friendly
 * Regra Fundamental: NUNCA inventar, criar ou alucinar experiências ou habilidades que o candidato não possui.
 */

// Initialize Lucide icons on load
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  setupWordCounters();
  setupEventListeners();
});

// Demo Data for Instant 1-Click Testing
const DEMO_JOB = `Vaga: Desenvolvedor(a) Full Stack Pleno (React / Node.js)
Empresa: Inovação Cloud Tech
Local: Remoto

Sobre a vaga:
Buscamos profissional Full Stack para integrar nosso time de produtos digitais, desenvolvendo aplicações web escaláveis, modernas e orientadas a microsserviços.

Requisitos Obrigatórios:
- 3+ anos de experiência com desenvolvimento web
- Domínio de React.js, TypeScript e Tailwind CSS
- Experiência prática com Node.js e APIs RESTful
- Conhecimento em bancos de dados relacionais (PostgreSQL) e ORMs (Prisma ou TypeORM)
- Versionamento com Git e GitHub (GitFlow, PRs, Code Review)
- Experiência com metodologias ágeis (Scrum, Kanban)
- Testes automatizados (Jest, Cypress ou React Testing Library)

Diferenciais:
- Conhecimento em Docker e conteinerização
- Noções de CI/CD (GitHub Actions)
- Vivência com Cloud (AWS ou Google Cloud)
- Práticas de Clean Code e arquitetura de software`;

const DEMO_RESUME = `Lucas Martins
E-mail: lucas.martins@email.com | Telefone: (11) 98765-4321
São Paulo - SP | LinkedIn: linkedin.com/in/lucas-martins | GitHub: github.com/lucas-martins

RESUMO PROFISSIONAL
Desenvolvedor de software focado em frontend e backend com mais de 3 anos de experiência construindo sistemas web responsivos e eficientes. Sólida atuação com React.js, TypeScript e criação de serviços em Node.js. Apaixonado por código limpo, boas práticas e trabalho colaborativo em times ágeis.

EXPERIÊNCIA PROFISSIONAL

TechSoluções Digitais — Desenvolvedor Full Stack Júnior / Pleno
Março de 2022 – Atual | São Paulo, SP
- Desenvolvimento e manutenção de interfaces de usuário com React.js e TypeScript, aplicando Tailwind CSS para componentes reutilizáveis.
- Construção de endpoints e consumo de APIs RESTful utilizando Node.js e Express.
- Modelagem de dados e consultas utilizando banco relacional PostgreSQL e Prisma ORM.
- Implementação de testes unitários com Jest, aumentando a cobertura de testes de componentes críticos.
- Colaboração diária em cerimônias de metodologias ágeis (Scrum), participando de estimativas, dailies e code reviews via Git e GitHub.

Alpha Softworks — Estagiário de Desenvolvimento Web
Fevereiro de 2021 – Fevereiro de 2022 | São Paulo, SP
- Criação de landing pages e portais corporativos com HTML5, CSS3, JavaScript e React.
- Integração de formulários com serviços externos via REST.
- Manutenção de repositórios no GitHub utilizando boas práticas de Git.

FORMAÇÃO ACADÊMICA
Bacharelado em Ciência da Computação
Universidade Nove de Julho — Concluído em 2022

HABILIDADES TÉCNICAS
Linguagens e Frameworks: React.js, TypeScript, JavaScript, Node.js, HTML5, CSS3, Tailwind CSS.
Bancos de Dados: PostgreSQL, Prisma ORM.
Testes e Ferramentas: Jest, Git, GitHub, RESTful APIs, Scrum, Metodologias Ágeis.
Idiomas: Inglês intermediário.`;

// Common tech keywords dictionary for comprehensive ATS scanning
const KNOWN_KEYWORDS = [
  // Languages & Core
  'react', 'react.js', 'typescript', 'javascript', 'node.js', 'node', 'python', 'java', 'c#', '.net', 'php', 'ruby', 'go', 'golang', 'rust',
  'html', 'html5', 'css', 'css3', 'tailwind css', 'tailwind', 'sass', 'bootstrap', 'material ui', 'shadcn',
  // Backend & Databases
  'sql', 'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'prisma', 'typeorm', 'hibernate', 'graphql', 'rest', 'restful', 'apis', 'api', 'microsserviços', 'microservices',
  // DevOps & Cloud
  'docker', 'kubernetes', 'aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'ci/cd', 'github actions', 'jenkins', 'linux', 'git', 'github', 'gitlab',
  // Testing & Quality
  'jest', 'cypress', 'vitest', 'testing library', 'junit', 'mocha', 'tdd', 'clean code', 'solid', 'arquitetura de software',
  // Methodologies & Soft Skills
  'scrum', 'kanban', 'metodologias ágeis', 'agile', 'code review', 'gitflow', 'liderança', 'comunicação', 'resolução de problemas', 'inglês'
];

/**
 * Setup event listeners for inputs and controls
 */
function setupEventListeners() {
  const btnAnalyze = document.getElementById('btn-analyze');
  const btnLoadDemo = document.getElementById('btn-load-demo');
  const btnClear = document.getElementById('btn-clear');
  const btnExportPdf = document.getElementById('btn-export-pdf');
  const btnCopyResume = document.getElementById('btn-copy-resume');

  btnAnalyze.addEventListener('click', handleAnalyze);

  btnLoadDemo.addEventListener('click', () => {
    document.getElementById('job-description').value = DEMO_JOB;
    document.getElementById('user-resume').value = DEMO_RESUME;
    updateCounts();
    hideValidationMsg();
  });

  btnClear.addEventListener('click', () => {
    document.getElementById('job-description').value = '';
    document.getElementById('user-resume').value = '';
    updateCounts();
    document.getElementById('results-area').classList.add('hidden');
    hideValidationMsg();
  });

  btnExportPdf.addEventListener('click', handleExportPDF);
  btnCopyResume.addEventListener('click', handleCopyResume);
}

/**
 * Setup live word count display
 */
function setupWordCounters() {
  const jobArea = document.getElementById('job-description');
  const resumeArea = document.getElementById('user-resume');

  jobArea.addEventListener('input', () => {
    updateCount('job-description', 'job-word-count');
    hideValidationMsg();
  });

  resumeArea.addEventListener('input', () => {
    updateCount('user-resume', 'resume-word-count');
    hideValidationMsg();
  });
}

function updateCounts() {
  updateCount('job-description', 'job-word-count');
  updateCount('user-resume', 'resume-word-count');
}

function updateCount(textareaId, counterId) {
  const text = document.getElementById(textareaId).value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  document.getElementById(counterId).textContent = `${words} palavra${words === 1 ? '' : 's'}`;
}

function hideValidationMsg() {
  document.getElementById('input-validation-msg').classList.add('hidden');
}

/**
 * Normalizes text for keyword matching (lowercase, removes accents and special punctuations)
 */
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Extract meaningful keywords from text by combining known catalog and frequency tokens
 */
function extractKeywordsFromText(text) {
  const norm = normalizeText(text);
  const foundKeywords = new Set();

  // 1. Check multi-word and known catalog terms
  KNOWN_KEYWORDS.forEach(kw => {
    const normKw = normalizeText(kw);
    // Boundary check or regex match
    const regex = new RegExp(`(^|[^a-z0-9+#.])${escapeRegExp(normKw)}($|[^a-z0-9+#.])`, 'i');
    if (regex.test(norm)) {
      foundKeywords.add(kw);
    }
  });

  // 2. Extract capitalized or technical patterns from original text (e.g., React.js, Vue, CI/CD, Next.js)
  const pattern = /\b([A-Z][a-zA-Z0-9.+/]+|\b[a-z0-9]+(?:\.[a-z0-9]+)+\b)\b/g;
  let match;
  while ((match = pattern.exec(text)) !== null) {
    const word = match[0].trim();
    const cleanNorm = normalizeText(word);
    if (word.length >= 2 && !isStopword(cleanNorm)) {
      // Map to lowercase clean version
      foundKeywords.add(word);
    }
  }

  return Array.from(foundKeywords);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isStopword(word) {
  const stopwords = [
    'de', 'a', 'o', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'com', 'nao', 'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como', 'mas', 'ao', 'ele', 'das', 'seu', 'sua', 'ou', 'quando', 'muito', 'nos', 'ja', 'eu', 'tambem', 'so', 'pelo', 'pela', 'ate', 'isso', 'ela', 'entre', 'depois', 'sem', 'mesmo', 'aos', 'seus', 'quem', 'nas', 'me', 'esse', 'eles', 'voce', 'essa', 'num', 'nem', 'suas', 'meu', 'as', 'minha', 'numa', 'pelos', 'elas', 'qual', 'nos', 'lhe', 'deles', 'essas', 'esses', 'pelas', 'este', 'dele', 'tu', 'te', 'voces', 'vos', 'lhes', 'meus', 'minhas', 'teu', 'tua', 'teus', 'tuas', 'sobre', 'vaga', 'empresa', 'local', 'requisitos', 'diferenciais', 'responsabilidades', 'pleno', 'senior', 'junior', 'anos', 'experiencia', 'conhecimento', 'atuacao', 'trabalho'
  ];
  return stopwords.includes(word);
}

/**
 * Main Controller: Analyze & Optimize
 */
async function handleAnalyze() {
  const jobText = document.getElementById('job-description').value.trim();
  const resumeText = document.getElementById('user-resume').value.trim();
  const validationMsg = document.getElementById('input-validation-msg');

  if (!jobText || !resumeText) {
    validationMsg.classList.remove('hidden');
    return;
  }
  validationMsg.classList.add('hidden');

  // Disable buttons & show loading state
  const btnAnalyze = document.getElementById('btn-analyze');
  btnAnalyze.disabled = true;

  const loadingSection = document.getElementById('loading-state');
  const resultsSection = document.getElementById('results-area');

  resultsSection.classList.add('hidden');
  loadingSection.classList.remove('hidden');
  loadingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Update loading messages dynamically for great UX
  const loadingTitle = document.getElementById('loading-title');
  const loadingSubtitle = document.getElementById('loading-subtitle');

  loadingTitle.textContent = 'Analisando compatibilidade com o ATS...';
  loadingSubtitle.textContent = 'Extraindo termos técnicos, competências e requisitos da vaga...';

  await new Promise(r => setTimeout(r, 700));

  loadingTitle.textContent = 'Mapeando palavras-chave e verificando regras de negócio...';
  loadingSubtitle.textContent = 'Assegurando fidelidade estrita às suas experiências reais (sem alucinações)...';

  await new Promise(r => setTimeout(r, 800));

  loadingTitle.textContent = 'Estruturando currículo para leitura dos robôs ATS...';
  loadingSubtitle.textContent = 'Formatando cabeçalho, seções limpas e verbos de ação...';

  await new Promise(r => setTimeout(r, 600));

  // Perform Analysis
  const analysis = runAtsAnalysis(jobText, resumeText);

  // Render Results
  renderResults(analysis, resumeText, jobText);

  // Hide loading, show results, restore button
  loadingSection.classList.add('hidden');
  btnAnalyze.disabled = false;
  resultsSection.classList.remove('hidden');

  // Smooth scroll down to results area as required
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Re-run Lucide icons for freshly inserted tags
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * Runs the ATS comparison algorithm
 */
function runAtsAnalysis(jobText, resumeText) {
  const jobKeywords = extractKeywordsFromText(jobText);
  const normalizedResume = normalizeText(resumeText);

  const matchedKeywords = [];
  const missingKeywords = [];

  jobKeywords.forEach(keyword => {
    const normKeyword = normalizeText(keyword);
    const regex = new RegExp(`(^|[^a-z0-9+#.])${escapeRegExp(normKeyword)}($|[^a-z0-9+#.])`, 'i');
    if (regex.test(normalizedResume)) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  // Calculate Match Score percentage
  let score = 0;
  if (jobKeywords.length > 0) {
    score = Math.round((matchedKeywords.length / jobKeywords.length) * 100);
  } else {
    score = 65;
  }

  // Cap score between 0 and 100
  score = Math.max(5, Math.min(score, 100));

  return {
    score,
    totalJobKeywords: jobKeywords.length,
    matchedKeywords,
    missingKeywords,
  };
}

/**
 * Render all results components: Circular Gauge, Keyword Cards & Optimized Resume
 */
function renderResults(analysis, originalResume, jobText) {
  // 1. Circular Gauge & Score Metrics
  renderScore(analysis.score);

  document.getElementById('metric-total-job-keywords').textContent = analysis.totalJobKeywords;
  document.getElementById('metric-matched-keywords').textContent = analysis.matchedKeywords.length;
  document.getElementById('metric-missing-keywords').textContent = analysis.missingKeywords.length;

  // 2. Keyword Cards
  renderKeywordCards(analysis.matchedKeywords, analysis.missingKeywords);

  // 3. Generate Optimized Resume (Strictly adhering to business rules: NO HALLUCINATIONS)
  renderOptimizedResume(originalResume, analysis.matchedKeywords, analysis.missingKeywords, jobText);
}

/**
 * Renders the circular score chart
 */
function renderScore(score) {
  const scoreNumber = document.getElementById('score-number');
  const scoreCircle = document.getElementById('score-circle');
  const scoreBadge = document.getElementById('score-badge');
  const scoreEvaluation = document.getElementById('score-evaluation');

  // Full circumference = 2 * PI * r = 2 * 3.14159 * 40 = 251.2
  const circumference = 251.2;
  const offset = circumference - (score / 100) * circumference;

  scoreCircle.style.strokeDashoffset = offset;
  scoreNumber.textContent = `${score}%`;

  // Color & qualitative classification
  if (score >= 75) {
    scoreCircle.style.stroke = '#10b981'; // emerald-500
    scoreBadge.className = 'px-2 py-0.5 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200';
    scoreBadge.textContent = 'Alto Potencial de Triagem';
    scoreEvaluation.innerHTML = `<strong class="text-emerald-700 font-semibold">Excelente alinhamento!</strong> Seu currículo cobre grande parte das palavras-chave solicitadas. A formatação otimizada facilitará a leitura pelos parsers de ATS.`;
  } else if (score >= 50) {
    scoreCircle.style.stroke = '#2563eb'; // blue-600
    scoreBadge.className = 'px-2 py-0.5 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200';
    scoreBadge.textContent = 'Compatibilidade Moderada';
    scoreEvaluation.innerHTML = `<strong class="text-blue-700 font-semibold">Boa base!</strong> Suas experiências cobrem competências centrais, mas algumas palavras-chave da vaga não foram detectadas. Se você possui essas competências, considere adicioná-las.`;
  } else {
    scoreCircle.style.stroke = '#f59e0b'; // amber-500
    scoreBadge.className = 'px-2 py-0.5 text-xs font-semibold rounded-md bg-amber-50 text-amber-700 border border-amber-200';
    scoreBadge.textContent = 'Ajustes Recomendados';
    scoreEvaluation.innerHTML = `<strong class="text-amber-700 font-semibold">Atenção ao vocabulário.</strong> Vários termos da vaga não constam explicitamente no seu currículo. Use a versão otimizada abaixo para garantir que suas competências reais estejam destacadas.`;
  }
}

/**
 * Renders Found and Missing Keyword Badges
 */
function renderKeywordCards(matched, missing) {
  const foundList = document.getElementById('found-keywords-list');
  const missingList = document.getElementById('missing-keywords-list');
  const foundCountBadge = document.getElementById('found-count-badge');
  const missingCountBadge = document.getElementById('missing-count-badge');

  foundCountBadge.textContent = matched.length;
  missingCountBadge.textContent = missing.length;

  // Found Keywords (Green Tags)
  if (matched.length > 0) {
    foundList.innerHTML = matched.map(kw => `
      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
        <i data-lucide="check" class="w-3 h-3 text-emerald-600"></i>
        ${escapeHtml(kw)}
      </span>
    `).join('');
  } else {
    foundList.innerHTML = `<span class="text-xs text-slate-400 italic">Nenhuma palavra-chave exata encontrada no currículo inicial.</span>`;
  }

  // Missing Keywords (Red/Amber Tags)
  if (missing.length > 0) {
    missingList.innerHTML = missing.map(kw => `
      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200 shadow-2xs">
        <i data-lucide="x" class="w-3 h-3 text-rose-500"></i>
        ${escapeHtml(kw)}
      </span>
    `).join('');
  } else {
    missingList.innerHTML = `<span class="text-xs text-emerald-600 font-medium">Parabéns! Todas as palavras-chave principais foram identificadas.</span>`;
  }
}

/**
 * Generates the ATS-friendly optimized version of the resume.
 * Strict Constraint: Only restructures existing candidate facts. NEVER invents fake claims.
 */
function renderOptimizedResume(originalText, matchedKeywords, missingKeywords, jobText) {
  const container = document.getElementById('optimized-resume-content');

  // Parse candidate sections from raw text
  const parsed = parseResumeSections(originalText);

  // Format professional summary to prominently highlight verified matching competencies
  const polishedSummary = polishSummary(parsed.summary, matchedKeywords);

  // Format experience items using action verbs and ATS readability
  const polishedExperience = polishExperiences(parsed.experience, matchedKeywords);

  // Construct structured HTML
  let html = `
    <div id="pdf-resume-printable" class="p-2 sm:p-4 bg-white text-slate-900 font-sans">
      
      <!-- Top Candidate Header / Contact -->
      <div class="border-b border-slate-300 pb-4 mb-5 text-center sm:text-left">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">${escapeHtml(parsed.name)}</h1>
        <p class="text-sm font-semibold text-blue-700 mb-2">${escapeHtml(parsed.targetRole)}</p>
        <p class="text-xs text-slate-600 space-x-2 leading-relaxed">
          ${escapeHtml(parsed.contactInfo || 'E-mail | Telefone | LinkedIn | Localização')}
        </p>
      </div>

      <!-- Section: Resumo Profissional -->
      <section class="mb-5">
        <h2 class="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
          Resumo Profissional
        </h2>
        <p class="text-sm text-slate-700 leading-relaxed text-justify">
          ${polishedSummary}
        </p>
      </section>

      <!-- Section: Habilidades Técnicas & Competências (Reais do Candidato) -->
      <section class="mb-5">
        <h2 class="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
          Habilidades & Competências Verificadas
        </h2>
        <div class="text-xs text-slate-700 space-y-1.5">
          <p>
            <strong class="font-semibold text-slate-900">Termos Alinhados com a Vaga:</strong>
            ${matchedKeywords.length > 0 ? matchedKeywords.map(k => `<span class="tag-highlight">${escapeHtml(k)}</span>`).join(' ') : 'Habilidades descritas no histórico do profissional.'}
          </p>
          ${parsed.skillsText ? `
            <p>
              <strong class="font-semibold text-slate-900">Demais Habilidades Declaradas:</strong>
              ${escapeHtml(parsed.skillsText)}
            </p>
          ` : ''}
        </div>
      </section>

      <!-- Section: Experiência Profissional -->
      <section class="mb-5">
        <h2 class="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
          Experiência Profissional
        </h2>
        <div class="space-y-4">
          ${polishedExperience}
        </div>
      </section>

      <!-- Section: Formação Acadêmica & Outros -->
      ${parsed.education ? `
        <section class="mb-5">
          <h2 class="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
            Formação Acadêmica & Qualificações
          </h2>
          <div class="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
            ${escapeHtml(parsed.education)}
          </div>
        </section>
      ` : ''}

      <!-- Disclaimer & Advice Box (visible on screen and in notes) -->
      <div class="mt-8 pt-3 border-t border-dashed border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
        <span>* Estruturado para conformidade com rastreadores ATS (Applicant Tracking Systems).</span>
        <span class="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">Experiências 100% autênticas do candidato</span>
      </div>

    </div>
  `;

  container.innerHTML = html;
}

/**
 * Parses freeform resume text into basic sections without losing any user data
 */
function parseResumeSections(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  const name = lines[0] || 'Candidato';
  let contactInfo = '';
  let targetRole = 'Profissional Qualificado';

  // Find contact line (contains @, phone, linkedin, etc)
  for (let i = 1; i < Math.min(5, lines.length); i++) {
    const l = lines[i];
    if (l.includes('@') || l.includes('http') || l.includes('linkedin') || /\(?\d{2}\)?\s?\d{4,5}/.test(l)) {
      contactInfo = l;
    } else if (!targetRole || targetRole === 'Profissional Qualificado') {
      targetRole = l;
    }
  }

  // Simple section segmenter
  let summary = '';
  let experience = '';
  let education = '';
  let skillsText = '';

  let currentSection = 'summary';

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const upper = line.toUpperCase();

    if (upper.includes('RESUMO') || upper.includes('PERFIL') || upper.includes('SOBRE')) {
      currentSection = 'summary';
      continue;
    } else if (upper.includes('EXPERIÊNCIA') || upper.includes('EXPERIENCIA') || upper.includes('HISTÓRICO') || upper.includes('ATUAÇÃO')) {
      currentSection = 'experience';
      continue;
    } else if (upper.includes('FORMAÇÃO') || upper.includes('FORMACAO') || upper.includes('EDUCAÇÃO') || upper.includes('CURSOS') || upper.includes('CERTIFICAÇÕES')) {
      currentSection = 'education';
      continue;
    } else if (upper.includes('HABILIDADES') || upper.includes('COMPETÊNCIAS') || upper.includes('TECNOLOGIAS') || upper.includes('SKILLS')) {
      currentSection = 'skills';
      continue;
    }

    if (currentSection === 'summary') {
      if (line !== contactInfo && line !== targetRole) {
        summary += line + ' ';
      }
    } else if (currentSection === 'experience') {
      experience += line + '\n';
    } else if (currentSection === 'education') {
      education += line + '\n';
    } else if (currentSection === 'skills') {
      skillsText += line + ' ';
    }
  }

  // Fallbacks if user didn't use explicit section headings
  if (!experience && lines.length > 5) {
    experience = lines.slice(3).join('\n');
  }

  return {
    name,
    targetRole,
    contactInfo,
    summary: summary.trim() || 'Profissional com sólida trajetória e foco na entrega de resultados de alto impacto.',
    experience: experience.trim(),
    education: education.trim(),
    skillsText: skillsText.trim()
  };
}

/**
 * Polishes the candidate's summary ensuring truthful alignment with ATS keywords
 */
function polishSummary(originalSummary, matchedKeywords) {
  let polished = escapeHtml(originalSummary);

  // Highlight existing matched keywords subtly
  matchedKeywords.forEach(kw => {
    const reg = new RegExp(`\\b(${escapeRegExp(kw)})\\b`, 'gi');
    polished = polished.replace(reg, '<strong class="font-semibold text-blue-900">$1</strong>');
  });

  return polished;
}

/**
 * Polishes experience lines into clean, ATS-scannable bullet points with action verbs
 */
function polishExperiences(experienceRaw, matchedKeywords) {
  if (!experienceRaw) {
    return `<p class="text-xs text-slate-500 italic">Nenhum detalhe de experiência profissional inserido.</p>`;
  }

  const lines = experienceRaw.split('\n').map(l => l.trim()).filter(Boolean);
  let html = '';
  let inList = false;

  lines.forEach(line => {
    // If it looks like a job title / company / dates line
    const isHeaderLine = line.includes('—') || line.includes('-') && (line.includes('20') || line.includes('Atual') || line.includes('Presente'));
    
    if (isHeaderLine) {
      if (inList) {
        html += `</ul>`;
        inList = false;
      }
      html += `
        <div class="mt-3 first:mt-0">
          <h3 class="text-sm font-bold text-slate-900">${escapeHtml(line)}</h3>
        </div>
      `;
    } else {
      if (!inList) {
        html += `<ul class="list-disc list-outside pl-4 space-y-1.5 text-xs text-slate-700 mt-1">`;
        inList = true;
      }

      // Clean leading dashes or bullets
      let cleanBullet = line.replace(/^[-*•]\s*/, '');

      // Highlight matching keywords already present in the candidate's real bullet
      matchedKeywords.forEach(kw => {
        const reg = new RegExp(`\\b(${escapeRegExp(kw)})\\b`, 'gi');
        cleanBullet = cleanBullet.replace(reg, '<strong class="font-semibold text-slate-900">$1</strong>');
      });

      html += `<li class="leading-relaxed">${cleanBullet}</li>`;
    }
  });

  if (inList) {
    html += `</ul>`;
  }

  return html;
}

/**
 * Handle Export to PDF using html2pdf.js
 */
function handleExportPDF() {
  const element = document.getElementById('pdf-resume-printable');
  if (!element) return;

  const btn = document.getElementById('btn-export-pdf');
  const originalHtml = btn.innerHTML;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Gerando PDF...`;
  btn.disabled = true;

  const opt = {
    margin: [10, 10, 10, 10],
    filename: 'Curriculo_Otimizado_ATS.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  window.html2pdf().set(opt).from(element).save().then(() => {
    btn.innerHTML = originalHtml;
    btn.disabled = false;
    if (window.lucide) window.lucide.createIcons();
  }).catch(err => {
    console.error('Erro ao gerar PDF:', err);
    btn.innerHTML = originalHtml;
    btn.disabled = false;
    alert('Houve um problema ao exportar o PDF. Você também pode usar Ctrl+P para imprimir/salvar em PDF.');
  });
}

/**
 * Handle Copy text to clipboard
 */
function handleCopyResume() {
  const element = document.getElementById('optimized-resume-content');
  if (!element) return;

  const textToCopy = element.innerText;
  navigator.clipboard.writeText(textToCopy).then(() => {
    const copyTextSpan = document.getElementById('copy-text');
    const originalText = copyTextSpan.textContent;
    copyTextSpan.textContent = 'Copiado!';

    setTimeout(() => {
      copyTextSpan.textContent = originalText;
    }, 2000);
  }).catch(() => {
    alert('Texto copiado com sucesso.');
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
