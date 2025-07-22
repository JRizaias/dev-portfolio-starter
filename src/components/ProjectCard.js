// src/components/ProjectCard.js
export function createProjectCard(project, onViewDetails) {
  const card = document.createElement('div');
  card.className = 'project-card';

  card.innerHTML = `
    <span style="font-size:0.9em;color:#888">${project.year ?? ''}</span>
    <h3>${project.title}</h3>
    <div class="buttons">
      <button class="btn pv-details-btn" type="button">Ver detalhes</button>
      ${project.article ? `<a href="${project.article}" class="btn" target="_blank">Article</a>` : ''}
      ${project.demo ? `<a href="${project.demo}" class="btn" target="_blank">Demo</a>` : ''}
    </div>
  `;

  card.querySelector('.pv-details-btn').addEventListener('click', () => {
    if (typeof onViewDetails === 'function') {
      onViewDetails(project);
    }
  });

  return card;
}
