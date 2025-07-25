// src/main.js
import { createNavBar } from './components/NavBar.js';
import { createSidebar } from './components/Sidebar.js';
import { createFooter } from './components/Footer.js';
import { createAreaCard } from './components/AreaCard.js';
import { createAreaViewer } from './components/AreaViewer.js';
import { createProjectViewer } from './components/ProjectViewer.js';
import { createArticlesSection } from './components/ArticlesSection.js';
import { createArticleViewer } from './components/ArticleViewer.js'; // NOVO
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
function renderMainContent() {
  const main = document.querySelector('.main-content');
  main.innerHTML = '';

  // Visualização detalhada do artigo (SPA)
  if (selectedArticle) {
    main.appendChild(createArticleViewer(selectedArticle, handleBackToArticles));
    return;
  }

  if (!selectedArea && !selectedProject) {
    // Tela inicial: 1) áreas  2) artigos
    main.appendChild(createAreasSection());
    main.appendChild(createArticlesSection(articles, handleArticleDetails));
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

function renderPage() {
  isSidebarCollapsed = loadSidebarState();
  const layout = document.getElementById('layout');
  layout.innerHTML = '';

  const navbar = createNavBar(handleSidebarToggle);
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
