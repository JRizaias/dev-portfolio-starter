// src/main.js
import { createNavBar } from './components/NavBar.js';
import { createSidebar } from './components/Sidebar.js';
import { createFooter } from './components/Footer.js';
import { createAreaCard } from './components/AreaCard.js';
import { createAreaViewer } from './components/AreaViewer.js';
import { createProjectViewer } from './components/ProjectViewer.js';
import { createArticlesSection } from './components/ArticlesSection.js';
import { createArticleViewer } from './components/ArticleViewer.js'; // NOVO
import { createProjectsSection } from './components/ProjectsSection.js';
import projects from './data/projects.json' assert { type: "json" };
import articles from './data/articles.json' assert { type: "json" };

// Estado global simples para navegação SPA
let selectedArea = null;
let selectedProject = null;
let selectedArticle = null;

// Agrupa projetos por área
function groupProjectsByArea(projects) {
  const areasMap = {};
  projects.forEach(p => {
    if (Array.isArray(p.areas)) {
      p.areas.forEach(area => {
        if (!areasMap[area]) areasMap[area] = [];
        areasMap[area].push(p);
      });
    }
  });
  return areasMap;
}

// Cria seção inicial com cards de Áreas de Atuação
function createAreasSection() {
  const section = document.createElement('section');
  section.className = 'card';

  const heading = document.createElement('h2');
  heading.textContent = 'Áreas de Atuação';
  heading.style.marginBottom = '1rem';
  section.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'area-grid';

  const areasMap = groupProjectsByArea(projects);
  Object.entries(areasMap).forEach(([area, projs]) => {
    grid.appendChild(createAreaCard(area, projs.length, handleSelectArea));
  });

  section.appendChild(grid);
  return section;
}

// Callbacks de navegação SPA
function handleSelectArea(area) {
  selectedArea = area;
  selectedProject = null;
  selectedArticle = null;
  renderMainContent();
}

function handleProjectDetails(project) {
  selectedProject = project;
  selectedArticle = null;
  renderMainContent();
}

function handleBackToAreas() {
  selectedArea = null;
  selectedProject = null;
  selectedArticle = null;
  renderMainContent();
}

function handleBackToProjects() {
  selectedProject = null;
  selectedArticle = null;
  renderMainContent();
}

function handleArticleDetails(article) {
  selectedArticle = article;
  selectedArea = null;
  selectedProject = null;
  renderMainContent();
}

function handleBackToArticles() {
  selectedArticle = null;
  renderMainContent();
}

// Renderização principal do conteúdo central da página
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function highlightMatches(text, query) {
  if (!query || !text) return text;
  // Normalize and remove punctuation for tolerant highlighting
  const normalize = s => s ? s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[\p{P}$+<=>^`|~]/gu, '') : '';
  const keywords = query.trim().split(/\s+/).map(normalize).filter(Boolean);
  if (!keywords.length) return text;
  // Tokenize text for highlighting
  let raw = text;
  let norm = normalize(text);
  // Find all match positions
  let matches = [];
  keywords.forEach(kw => {
    let idx = norm.indexOf(kw);
    while (idx !== -1 && kw.length > 0) {
      matches.push([idx, idx + kw.length]);
      idx = norm.indexOf(kw, idx + kw.length);
    }
  });
  if (!matches.length) return text;
  // Merge overlapping matches
  matches.sort((a, b) => a[0] - b[0]);
  let merged = [];
  matches.forEach(([start, end]) => {
    if (!merged.length || start > merged[merged.length - 1][1]) {
      merged.push([start, end]);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end);
    }
  });
  // Build highlighted string
  let result = '';
  let last = 0;
  merged.forEach(([start, end]) => {
    // Map normalized indices back to raw text indices
    let rawStart = findRawIndex(norm, raw, start);
    let rawEnd = findRawIndex(norm, raw, end);
    result += raw.slice(last, rawStart);
    result += '<mark>' + raw.slice(rawStart, rawEnd) + '</mark>';
    last = rawEnd;
  });
  result += raw.slice(last);
  return result;
}
// Helper to map normalized string index to raw text index
function findRawIndex(norm, raw, idx) {
  let n = 0, r = 0;
  while (n < idx && r < raw.length) {
    let c = raw[r];
    let normChar = c.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[\p{P}$+<=>^`|~]/gu, '');
    if (normChar.length > 0) n += normChar.length;
    r++;
  }
  return r;
}

function filterProjects(projects, query) {
  if (!query) return projects;
  // Normalize and remove punctuation from both haystack and query
  const normalize = s => s ? s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[\p{P}$+<=>^`|~]/gu, '') : '';
  const normQuery = normalize(query.trim());
  if (!normQuery) return projects;
  return projects.filter(p => {
    let haystack = '';
    if (p.title) haystack += ' ' + p.title;
    if (p.description) haystack += ' ' + p.description;
    if (p.content) haystack += ' ' + p.content;
    if (p.tags && Array.isArray(p.tags)) haystack += ' ' + p.tags.join(' ');
    if (p.areas && Array.isArray(p.areas)) haystack += ' ' + p.areas.join(' ');
    if (p.year) haystack += ' ' + p.year;
    if (p.icon) haystack += ' ' + p.icon;
    haystack = normalize(haystack);
    return haystack.includes(normQuery);
  });
}

function filterArticles(articles, query) {
  if (!query) return articles;
  // Normalize and remove punctuation from both haystack and keywords
  const normalize = s => s ? s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[\p{P}$+<=>^`|~]/gu, '') : '';
  const keywords = query.trim().split(/\s+/).map(normalize).filter(Boolean);
  if (!keywords.length) return articles;
  return articles.filter(a => {
    let haystack = '';
    if (a.title) haystack += ' ' + a.title;
    if (a.description) haystack += ' ' + a.description;
    if (a.content) haystack += ' ' + a.content;
    if (a.icon) haystack += ' ' + a.icon;
    if (a.tags && Array.isArray(a.tags)) haystack += ' ' + a.tags.join(' ');
    haystack = normalize(haystack);
    return keywords.every(kw => haystack.includes(kw));
  });
}

function filterAreas(projects, query) {
  if (!query) return groupProjectsByArea(projects);
  // Only keep areas with at least one matching project
  const filteredProjects = filterProjects(projects, query);
  return groupProjectsByArea(filteredProjects);
}

function renderMainContent() {
  const main = document.querySelector('.main-content');
  main.innerHTML = '';

  // Visualização detalhada do artigo (SPA)
  if (selectedArticle) {
    main.appendChild(createArticleViewer(selectedArticle, handleBackToArticles));
    return;
  }

  if (!selectedArea && !selectedProject) {
    const query = globalSearchQuery && globalSearchQuery.trim();
    if (!query) {
      // Default behavior: show all areas, projects, and articles as before
      main.appendChild(createAreasSection());
      main.appendChild(createArticlesSection(articles, handleArticleDetails));
      return;
    }

    // Exibir projetos filtrados diretamente durante busca global
    const filteredProjects = filterProjects(projects, query);
    const filteredArticles = filterArticles(articles, query);
    let hasResults = false;

    if (filteredProjects.length > 0 || filteredArticles.length > 0) {
      if (filteredProjects.length > 0) {
        hasResults = true;
        if (typeof createProjectsSection === 'function') {
          main.appendChild(createProjectsSection(filteredProjects, handleProjectDetails, true)); // isSearchMode = true
        } else {
          const section = document.createElement('section');
          section.className = 'card';
          const heading = document.createElement('h2');
          heading.textContent = 'Projetos';
          heading.style.marginBottom = '1rem';
          section.appendChild(heading);
          const grid = document.createElement('div');
          grid.className = 'area-grid';
          filteredProjects.forEach(p => {
            grid.appendChild(createProjectCard(p, handleProjectDetails, true)); // isSearchMode = true
          });
          section.appendChild(grid);
          main.appendChild(section);
        }
        section.className = 'card';
        const heading = document.createElement('h2');
        heading.textContent = 'Projetos';
        heading.style.marginBottom = '1rem';
        section.appendChild(heading);
        const grid = document.createElement('div');
        grid.className = 'area-grid';
        filteredProjects.forEach(p => {
          grid.appendChild(createProjectCard(p, handleProjectDetails, true)); // isSearchMode = true
        });
        section.appendChild(grid);
        main.appendChild(section);
      }
    }

    // Articles Section (reuse default card/component logic)
    if (filteredArticles.length > 0) {
      hasResults = true;
      main.appendChild(createArticlesSection(filteredArticles, handleArticleDetails));
    }

    if (!hasResults && query) {
      const msg = document.createElement('div');
      msg.className = 'no-results-msg';
      msg.textContent = 'Nenhum item encontrado para sua busca.';
      msg.style.margin = '2.5rem auto';
      msg.style.fontSize = '1.15rem';
      msg.style.textAlign = 'center';
      msg.style.color = '#888';
      main.appendChild(msg);
    }
    return;
  } else if (selectedArea && !selectedProject) {
    // Lista de projetos da área selecionada
    const projs = projects.filter(p => (p.areas || []).includes(selectedArea));
    main.appendChild(createAreaViewer(selectedArea, projs, handleProjectDetails, handleBackToAreas));
  } else if (selectedProject) {
    // Detalhe do projeto selecionado
    const section = document.createElement('section');
    section.className = 'card';

    // Header flexível com botão de voltar e título do projeto
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.gap = '0.7rem';
    header.style.marginBottom = '1.1rem';

    // Botão minimalista
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.type = 'button';
    backBtn.innerHTML = '← Voltar';
    backBtn.onclick = selectedArea ? handleBackToProjects : handleBackToAreas;

    // Título do projeto
    const title = document.createElement('h2');
    title.textContent = selectedProject.titulo;
    title.style.margin = '0';

    // Monta o header e adiciona à seção
    header.appendChild(backBtn);
    header.appendChild(title);
    section.appendChild(header);

    // Conteúdo do projeto
    section.appendChild(createProjectViewer(selectedProject));
    main.appendChild(section);
  }
}

// Renderização de toda a página (navbar, sidebar, main, footer)
// Sidebar state management
let isSidebarCollapsed = false;

function saveSidebarState(collapsed) {
  try {
    localStorage.setItem('sidebarCollapsed', collapsed ? '1' : '0');
  } catch (e) {}
}

function loadSidebarState() {
  try {
    return localStorage.getItem('sidebarCollapsed') === '1';
  } catch (e) { return false; }
}

function handleSidebarToggle() {
  isSidebarCollapsed = !isSidebarCollapsed;
  saveSidebarState(isSidebarCollapsed);
  updateSidebarVisibility();
}

function updateSidebarVisibility() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    if (isSidebarCollapsed) {
      sidebar.classList.add('hidden');
    } else {
      sidebar.classList.remove('hidden');
    }
  }
}

// Global search state
let globalSearchQuery = '';
let globalSearchDebounceTimer = null;

function handleGlobalSearchInput(query) {
  globalSearchQuery = query;
  // Debounce: only update after user stops typing for 200ms
  clearTimeout(globalSearchDebounceTimer);
  globalSearchDebounceTimer = setTimeout(() => {
    renderMainContent();
  }, 200);
}

function renderPage() {
  isSidebarCollapsed = loadSidebarState();
  const layout = document.getElementById('layout');
  layout.innerHTML = '';

  const navbar = createNavBar(handleSidebarToggle, handleGlobalSearchInput);
  layout.appendChild(navbar);

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'content-wrapper';

  const sidebar = createSidebar();
  if (isSidebarCollapsed) sidebar.classList.add('hidden');
  contentWrapper.appendChild(sidebar);

  const main = document.createElement('main');
  main.className = 'main-content';
  contentWrapper.appendChild(main);

  layout.appendChild(contentWrapper);

  // Footer fora do main para não sumir em renderizações SPA
  layout.appendChild(createFooter());

  renderMainContent();
}


// Inicialização ao carregar DOM
document.addEventListener('DOMContentLoaded', renderPage);
