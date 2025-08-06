// src/main.js
import i18n from './i18n.js';
import { createNavBar } from './components/NavBar.js';
import { createSidebar } from './components/Sidebar.js';
import { createFooter } from './components/Footer.js';
import { createAreaCard } from './components/AreaCard.js';
import { createAreaViewer } from './components/AreaViewer.js';
import { createProjectViewer } from './components/ProjectViewer.js';
import { createArticlesSection } from './components/ArticlesSection.js';
import { createArticleViewer } from './components/ArticleViewer.js'; // NOVO
import { createProjectsSection } from './components/ProjectsSection.js';
import { createAbout } from './components/About.js';
import { createProjectsSkeleton } from './components/ProjectsSkeleton.js';
import projects from './data/projects.json' assert { type: "json" };
import articles from './data/articles.json' assert { type: "json" };
import './components/About.css';

// Estado global simples para navegação SPA
let selectedArea = null;
let selectedProject = null;
let selectedArticle = null;

// Novo: estado de roteamento SPA
let currentView = null;
let currentSlug = null;

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
  function renderHeading() {
    heading.textContent = i18n.t('areas_heading');
  }
  renderHeading();
  heading.style.marginBottom = '1rem';
  section.appendChild(heading);const grid = document.createElement('div');
  grid.className = 'area-grid';

  const areasMap = groupProjectsByArea(projects);
  console.log('[DEBUG] Áreas agrupadas:', Object.keys(areasMap));
  Object.entries(areasMap).forEach(([area, projs]) => {
    grid.appendChild(createAreaCard(area, projs.length, handleSelectArea));
  });

  section.appendChild(grid);
  return section;
}

// Callbacks de navegação SPA
function handleSelectArea(area) {
  // Use o nome original (slug) da área para URL
  navigateTo('area', area);
}

function handleProjectDetails(project) {
  // Use o slug/id do projeto para URL
  navigateTo('project', project.slug || project.id || project.title);
}

function handleBackToAreas() {
  navigateTo(null, null); // Home
}

function handleBackToProjects() {
  if (selectedArea) {
    navigateTo('area', selectedArea);
  } else {
    navigateTo(null, null);
  }
}

function handleArticleDetails(article) {
  // Use o slug/id do artigo para URL
  navigateTo('article', article.slug || article.id || article.title);
}

function handleBackToArticles() {
  navigateTo(null, null); // Home ou lista de artigos
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
  // Normalize and remove punctuation from both haystack and keywords
  const normalize = s => s ? s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[\p{P}$+<=^`|~]/gu, '') : '';
  const keywords = query.trim().split(/\s+/).map(normalize).filter(Boolean);
  if (!keywords.length) return projects;
  return projects.filter(p => {
    let haystack = '';
    // Títulos
    if (p.title) haystack += ' ' + p.title;
    if (p.title_pt) haystack += ' ' + p.title_pt;
    if (p.title_en) haystack += ' ' + p.title_en;
    // Descrições
    if (p.description) haystack += ' ' + p.description;
    if (p.description_pt) haystack += ' ' + p.description_pt;
    if (p.description_en) haystack += ' ' + p.description_en;
    // Conteúdo
    if (p.content) haystack += ' ' + p.content;
    if (p.content_pt) haystack += ' ' + p.content_pt;
    if (p.content_en) haystack += ' ' + p.content_en;
    // Outros
    if (p.tags && Array.isArray(p.tags)) haystack += ' ' + p.tags.join(' ');
    if (p.areas && Array.isArray(p.areas)) haystack += ' ' + p.areas.join(' ');
    if (p.year) haystack += ' ' + p.year;
    if (p.icon) haystack += ' ' + p.icon;
    haystack = normalize(haystack);
    return keywords.every(kw => haystack.includes(kw));
  });
}

function filterArticles(articles, query) {
  if (!query) return articles;
  // Normalize and remove punctuation from both haystack and keywords
  const normalize = s => s ? s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[\p{P}$+<=^`|~]/gu, '') : '';
  const keywords = query.trim().split(/\s+/).map(normalize).filter(Boolean);
  if (!keywords.length) return articles;
  return articles.filter(a => {
    let haystack = '';
    // Títulos
    if (a.title) haystack += ' ' + a.title;
    if (a.title_pt) haystack += ' ' + a.title_pt;
    if (a.title_en) haystack += ' ' + a.title_en;
    // Descrições
    if (a.description) haystack += ' ' + a.description;
    if (a.description_pt) haystack += ' ' + a.description_pt;
    if (a.description_en) haystack += ' ' + a.description_en;
    // Conteúdo
    if (a.content) haystack += ' ' + a.content;
    if (a.content_pt) haystack += ' ' + a.content_pt;
    if (a.content_en) haystack += ' ' + a.content_en;
    // Outros
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

let isRendering = false;

function fadeInMain(main) {
  main.classList.remove('fade-in');
  // Force reflow to restart animation
  void main.offsetWidth;
  main.classList.add('fade-in');
}

function renderMainContent() {
  const main = document.querySelector('.main-content');
  main.innerHTML = '';
  isRendering = true;


  // Visualização detalhada do artigo (SPA)
  if (selectedArticle) {
    main.appendChild(createArticleViewer(selectedArticle, handleBackToArticles));
    return;
  }
  // Corrige atualização do título da aba ao trocar idioma na lista de artigos
  if (currentView === 'article' && !selectedArticle) {
    document.title = `${i18n.t('tab_articles') || 'Artigos'} | Izaias's website`;
  }

  if (!selectedArea && !selectedProject) {
    const query = globalSearchQuery && globalSearchQuery.trim();
    if (!query) {
      // Default behavior: show all areas, projects, and articles as before
      main.appendChild(createAreasSection());
      main.appendChild(createArticlesSection(articles, handleArticleDetails));
      fadeInMain(main);
      isRendering = false;
      return;
    }

    // Exibir projetos filtrados diretamente durante busca global
    const filteredProjects = filterProjects(projects, query);
    const filteredArticles = filterArticles(articles, query);
    let hasResults = false;

    if (filteredProjects.length > 0 || filteredArticles.length > 0) {
      if (filteredProjects.length > 0) {
        hasResults = true;
        // Show skeletons before rendering real content
        main.appendChild(createProjectsSkeleton(Math.min(filteredProjects.length, 6)));
        fadeInMain(main);
        setTimeout(() => {
          main.innerHTML = '';
          main.appendChild(createProjectsSection(filteredProjects, handleProjectDetails, true)); // isSearchMode = true
          fadeInMain(main);
          isRendering = false;
        }, 400);
        return;
      }
    }

    // Articles Section (reuse default card/component logic)
    if (filteredArticles.length > 0) {
      hasResults = true;
      main.appendChild(createArticlesSection(filteredArticles, handleArticleDetails));
      fadeInMain(main);
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
      fadeInMain(main);
    }
    return;
  } else if (selectedArea && !selectedProject) {
    // Lista de projetos da área selecionada (usando busca tolerante e multilíngue)
    const normalize = s => s ? s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[\p{P}$+<=>^`|~]/gu, '') : '';
    // Se houver busca global, filtrar também pelo termo
    let areaProjects = projects.filter(p =>
      (p.areas || []).some(area => normalize(area) === normalize(selectedArea))
    );
    if (globalSearchQuery && globalSearchQuery.trim()) {
      areaProjects = filterProjects(areaProjects, globalSearchQuery);
    }
    console.log('[DEBUG] Filtrando projetos para área:', selectedArea, '| Encontrados:', areaProjects.length, '| Todos projetos:', projects.map(p => p.areas));
    main.appendChild(createAreaViewer(selectedArea, areaProjects, handleProjectDetails, handleBackToAreas));
    fadeInMain(main);
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
    function renderBackBtn() {
      backBtn.innerHTML = i18n.t('back_btn') || '← Voltar';
    }
    renderBackBtn();backBtn.onclick = selectedArea ? handleBackToProjects : handleBackToAreas;

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

// Novo: renderPage(view, slug)
function renderPage(view, slug) {
  // Atualiza o título da aba conforme a navegação
  let title = i18n.t('tab_home') || "Izaias's website";
  if (view === 'project') title = `${i18n.t('tab_projects') || 'Projects'} | Izaias's website`;
  else if (view === 'article') title = `${i18n.t('tab_articles') || 'Artigos'} | Izaias's website`;
  else if (view === 'about') title = `${i18n.t('tab_about') || 'About'} | Izaias's website`;
  else if (view === 'area' && slug) {
    // Tenta traduzir a área, senão usa o slug capitalizado
    let areaName = i18n.exists && i18n.exists('area_' + slug) ? i18n.t('area_' + slug) : (slug.charAt(0).toUpperCase() + slug.slice(1));
    title = `${areaName} | Izaias's website`;
  }
  document.title = title;

  // Atualiza estado global de navegação
  currentView = view;
  currentSlug = slug;
  selectedArea = null;
  selectedProject = null;
  selectedArticle = null;

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
  layout.appendChild(createFooter());

  // Lógica de roteamento
  if (!view) {
    renderMainContent();
    return;
  }
  if (view === 'area') {
    // Buscar área pelo slug
    selectedArea = slug;
    renderMainContent();
    return;
  }
  if (view === 'project') {
    const project = projects.find(p => (p.slug || p.id || p.title) === slug);
    if (project) {
      selectedProject = project;
      renderMainContent();
      return;
    }
  }
  if (view === 'article') {
    const article = articles.find(a => (a.slug || a.id || a.title) === slug);
    if (article) {
      selectedArticle = article;
      renderMainContent();
      return;
    }
  }
  if (view === 'about') {
    main.appendChild(createAbout());
    return;
  }
  // Se não encontrou, volta para home
  renderMainContent();
}

// Listener global para troca de idioma (i18n)
i18n.on('languageChanged', () => {
  renderPage(currentView, currentSlug);
});

// SPA: navegação com history.pushState
function navigateTo(view, slug) {
  let url = '/';
  if (view === 'area' && slug) url = `/area/${encodeURIComponent(slug)}`;
  else if (view === 'project' && slug) url = `/project/${encodeURIComponent(slug)}`;
  else if (view === 'article' && slug) url = `/article/${encodeURIComponent(slug)}`;
  else if (view === 'about') url = '/about';
  history.pushState({view, slug}, '', url);
  renderPage(view, slug);
}


// SPA: listener para botão voltar/avançar do navegador
window.onpopstate = function(e) {
  if (e.state) {
    renderPage(e.state.view, e.state.slug);
  } else {
    renderPage(null, null);
  }
};

// Exporta navegação SPA para uso nos cards
export { navigateTo };



// Inicialização ao carregar DOM
document.addEventListener('DOMContentLoaded', () => {

  // SPA: parse URL inicial
  const path = window.location.pathname;
  
  // Primeiro verifica se é a rota /about (sem slug)
  if (path === '/about') {
    history.replaceState({view: 'about', slug: null}, '', path);
    renderPage('about', null);
    return;
  }
  
  // Depois verifica rotas com slug
  let match = path.match(/^\/(area|project|article)\/([^\/]+)$/);
  if (match) {
    const view = match[1];
    const slug = decodeURIComponent(match[2]);
    history.replaceState({view, slug}, '', path);
    renderPage(view, slug);
  } else {
    history.replaceState({view: null, slug: null}, '', '/');
    renderPage(null, null);
  }
});
