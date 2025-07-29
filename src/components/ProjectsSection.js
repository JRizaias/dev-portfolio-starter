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

  const heading = document.createElement('h2');
  // Título fixo 'Projects' quando exibindo resultados filtrados de busca
  heading.textContent = 'Projects';
  section.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'project-grid';

  projects.forEach(project => {
    grid.appendChild(createProjectCard(project, onProjectDetails));
  });

  section.appendChild(grid);
  return section;
}
