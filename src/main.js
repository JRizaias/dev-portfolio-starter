// src/main.js
import { createNavBar } from './components/NavBar.js';
import { createSidebar } from './components/Sidebar.js';
import { createFooter } from './components/Footer.js';
import { createAreaCard } from './components/AreaCard.js';
import { createAreaViewer } from './components/AreaViewer.js';
import { createProjectViewer } from './components/ProjectViewer.js';
import { createArticlesSection } from './components/ArticlesSection.js'; // NOVO
import projects from './data/projects.json' assert { type: "json" };
import articles from './data/articles.json' assert { type: "json" }; // NOVO

// Estado global simples para navegação SPA
let selectedArea = null;
let selectedProject = null;

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

// Callback quando o usuário seleciona uma área
function handleSelectArea(area) {
  selectedArea = area;
  selectedProject = null;
  renderMainContent();
}

// Callback quando o usuário clica em "Ver detalhes" de um projeto
function handleProjectDetails(project) {
  selectedProject = project;
  renderMainContent();
}

// Callback para voltar da lista de projetos para a lista de áreas
function handleBackToAreas() {
  selectedArea = null;
  selectedProject = null;
  renderMainContent();
}

// Callback para voltar do detalhe do projeto para a lista de projetos da área
function handleBackToProjects() {
  selectedProject = null;
  renderMainContent();
}

// Renderização principal do conteúdo central da página
function renderMainContent() {
  const main = document.querySelector('.main-content');
  main.innerHTML = '';

  if (!selectedArea && !selectedProject) {
    // Tela inicial: 1) áreas  2) artigos
    main.appendChild(createAreasSection());
    main.appendChild(createArticlesSection(articles)); // NOVO
  } else if (selectedArea && !selectedProject) {
    // Lista de projetos da área selecionada
    const projs = projects.filter(p => (p.areas || []).includes(selectedArea));
    main.appendChild(createAreaViewer(selectedArea, projs, handleProjectDetails, handleBackToAreas));
  } else if (selectedProject) {
    // Detalhe do projeto selecionado
    const section = document.createElement('section');
    section.className = 'card';
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = '← Voltar';
    btn.style.marginBottom = '1rem';
    btn.onclick = selectedArea ? handleBackToProjects : handleBackToAreas;
    section.appendChild(btn);
    section.appendChild(createProjectViewer(selectedProject));
    main.appendChild(section);
  }
}

// Renderização de toda a página (navbar, sidebar, main, footer)
function renderPage() {
  const layout = document.getElementById('layout');
  layout.innerHTML = '';

  const navbar = createNavBar();
  layout.appendChild(navbar);

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'content-wrapper';

  const sidebar = createSidebar();
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
