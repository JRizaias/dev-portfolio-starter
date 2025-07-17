// src/components/AreaViewer.js
import { createProjectCard } from './ProjectCard.js';

export function createAreaViewer(area, projects, onProjectDetails, onBack) {
  const section = document.createElement('section');
  section.className = 'card area-viewer';

  section.innerHTML = `
    <button class="btn area-back-btn" type="button">&larr; Voltar</button>
    <h2>${area}</h2>
    <div class="project-grid"></div>
  `;

  section.querySelector('.area-back-btn').addEventListener('click', onBack);

  const grid = section.querySelector('.project-grid');
  projects.forEach(p => {
    grid.appendChild(createProjectCard(p, onProjectDetails));
  });

  return section;
}
