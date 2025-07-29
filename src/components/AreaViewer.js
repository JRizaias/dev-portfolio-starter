// src/components/AreaViewer.js
import i18n from '../i18n.js';
import { createProjectCard } from './ProjectCard.js';

export function createAreaViewer(area, projects, onProjectDetails, onBack, isSearchMode = false) {
  const section = document.createElement('section');
  section.className = 'card area-viewer';

  if (!isSearchMode) {
    // Header flexível com botão de voltar e título da área
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
      backBtn.innerHTML = i18n.t('back_btn');
    }
    renderBackBtn();
    backBtn.onclick = onBack;
    // Atualiza ao trocar idioma
    i18n.on('languageChanged', renderBackBtn);

    // Título da área
    const title = document.createElement('h2');
    title.textContent = area;
    title.style.margin = '0';

    header.appendChild(backBtn);
    header.appendChild(title);
    section.appendChild(header);
  }

  // Grid de projetos
  const grid = document.createElement('div');
  grid.className = 'project-grid';

  projects.forEach(p => {
    grid.appendChild(createProjectCard(p, onProjectDetails, isSearchMode));
  });

  section.appendChild(grid);

  return section;
}
