// src/main.js
import { createNavBar } from './components/NavBar.js';
import { createSidebar } from './components/Sidebar.js';
import { createFooter } from './components/Footer.js';
import { createProjectCard } from './components/ProjectCard.js';
import { renderArticleCards } from './components/ArticleCard.js';

import projects from './data/projects.json' assert { type: "json" };

/**
 * Cria a seção de introdução (hero)
 */
function createHeroSection() {
  const hero = document.createElement('section');
  hero.className = 'card';
  hero.style.marginTop = '0';
  hero.innerHTML = `
    <h1>Hey, I'm Izaias!</h1>
    <p>Desenvolvedor de soluções modernas, apaixonado por usabilidade e performance.</p>
  `;
  return hero;
}

/**
 * Cria a seção de artigos (Deep Dives)
 */
function createArticlesSection() {
  const section = document.createElement('section');
  section.className = 'card';

  const heading = document.createElement('h2');
  heading.textContent = 'Deep Dives';
  heading.style.marginBottom = '1rem';
  section.appendChild(heading);

  const articlesGrid = document.createElement('div');
  articlesGrid.id = 'articles';
  articlesGrid.className = 'article-grid';
  section.appendChild(articlesGrid);

  return section;
}

/**
 * Cria a seção de projetos
 */
function createProjectsSection() {
  const section = document.createElement('section');
  section.className = 'card';

  const heading = document.createElement('h2');
  heading.textContent = 'Projects';
  heading.style.marginBottom = '1rem';
  section.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'project-grid';

  projects.forEach(project => {
    grid.appendChild(createProjectCard(project));
  });

  section.appendChild(grid);
  return section;
}

/**
 * Cria e renderiza a estrutura da página principal
 */
function renderPage() {
  const layout = document.getElementById('layout');

  // NAVBAR - ocupa o topo da página
  const navbar = createNavBar();

  // Botão de toggle do sidebar na navbar
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'toggle-sidebar';
  toggleBtn.textContent = '☰';
  toggleBtn.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('hidden');
  });
  navbar.prepend(toggleBtn);

  layout.appendChild(navbar);

  // WRAPPER abaixo da navbar
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'content-wrapper';

  // SIDEBAR
  const sidebar = createSidebar();
  contentWrapper.appendChild(sidebar);

  // MAIN CONTENT
  const main = document.createElement('main');
  main.className = 'main-content';

  main.appendChild(createHeroSection());
  main.appendChild(createArticlesSection());
  renderArticleCards('articles');
  main.appendChild(createProjectsSection());
  main.appendChild(createFooter());

  contentWrapper.appendChild(main);

  layout.appendChild(contentWrapper);
}

document.addEventListener('DOMContentLoaded', renderPage);