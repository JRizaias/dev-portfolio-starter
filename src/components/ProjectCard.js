// src/components/ProjectCard.js
import i18n from '../i18n.js';
export function createProjectCard(project, onViewDetails) {
  console.log('[createProjectCard] Received project:', project, 'Keys:', Object.keys(project));
  const card = document.createElement('div');
  card.className = 'project-card';
  // Acessibilidade: torna o card navegável por Tab e descreve o conteúdo
  card.tabIndex = 0;
  const lang = i18n.language || localStorage.getItem('language') || 'pt';
  const title = project[`title_${lang}`] || project.title || 'Sem título';
  card.setAttribute('aria-label', `${title}${project.year ? ' ' + project.year : ''}`);

  card.innerHTML = `
    <span style="font-size:0.9em;color:#888">${project.year ?? ''}</span>
    <h3>${title}</h3>
    <div class="buttons">
      <button class="btn pv-details-btn" type="button">Ver detalhes</button>
      ${project.article ? `<a href="${project.article}" class="btn" target="_blank" rel="noopener noreferrer">Article</a>` : ''}
      ${project.demo ? `<a href="${project.demo}" class="btn" target="_blank" rel="noopener noreferrer">Demo</a>` : ''}
    </div>
  `;

  // Clique e teclado ativam detalhes
  card.querySelector('.pv-details-btn').addEventListener('click', () => {
    if (typeof onViewDetails === 'function') {
      onViewDetails(project);
    }
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const btn = card.querySelector('.pv-details-btn');
      if (btn) btn.click();
    }
  });

  return card;
}
