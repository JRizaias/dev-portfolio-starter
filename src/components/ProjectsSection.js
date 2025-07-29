// src/components/ProjectsSection.js
import { createProjectCard } from './ProjectCard.js';

/**
 * Cria uma seção de projetos filtrados, exibindo cards diretamente (sem agrupamento por área).
 * @param {Array} projects - Lista de projetos filtrados.
 * @param {Function} onProjectDetails - Callback para visualizar detalhes do projeto.
 * @returns {HTMLElement}
 */
export function createProjectsSection(projects, onProjectDetails) {
  const section = document.createElement('section');
  section.className = 'card projects-section';

  const heading = document.createElement('h2');
  heading.textContent = i18n.t('projects');
  section.appendChild(heading);
  // Atualiza título ao trocar idioma
  i18n.on('languageChanged', () => {
    heading.textContent = i18n.t('projects');
  });

  const grid = document.createElement('div');
  grid.className = 'project-grid';

  projects.forEach(project => {
    grid.appendChild(createProjectCard(project, onProjectDetails));
  });

  section.appendChild(grid);
  return section;
}
