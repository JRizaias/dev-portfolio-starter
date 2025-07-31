// src/components/ProjectsSection.js
import { createProjectCard } from './ProjectCard.js';
import i18n from '../i18n.js';

/**
 * Cria uma seção de projetos filtrados, exibindo cards diretamente (sem agrupamento por área).
 * @param {Array} projects - Lista de projetos filtrados.
 * @param {Function} onProjectDetails - Callback para visualizar detalhes do projeto.
 * @returns {HTMLElement}
 */
export function createProjectsSection(projects, onProjectDetails) {
  console.log('[DEBUG][createProjectsSection] Projects recebidos:', projects.map(p => ({id: p.id, title: p.title, title_en: p.title_en, description: p.description, description_en: p.description_en})));

  const section = document.createElement('section');
  section.className = 'card projects-section';
  // Adiciona reforço semântico: heading com id exclusivo e aria-labelledby
  const heading = document.createElement('h2');
  heading.textContent = 'Projects';
  const headingId = 'projects-section-heading';
  heading.id = headingId;
  section.setAttribute('aria-labelledby', headingId);
  section.appendChild(heading);

  // Usa <ul> para grid semântico
  const grid = document.createElement('ul');
  grid.className = 'project-grid';
  grid.setAttribute('role', 'list');
  grid.style.listStyle = 'none';
  grid.style.padding = '0';
  grid.style.margin = '0';

  projects.forEach(project => {
    // Cada card vira <li> com role="listitem"
    const card = createProjectCard(project, onProjectDetails);
    const li = document.createElement('li');
    li.setAttribute('role', 'listitem');
    li.style.display = 'flex';
    li.style.flexDirection = 'column';
    li.style.height = '100%';
    li.appendChild(card);
    grid.appendChild(li);
  });

  section.appendChild(grid);
  return section;
}
