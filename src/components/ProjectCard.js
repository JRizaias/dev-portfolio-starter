// src/components/ProjectCard.js
export function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';

  card.innerHTML = `
    <span style="font-size:0.9em;color:#888">${project.year}</span>
    <h3>${project.title}</h3>
    <div>${project.description}</div>
    <div class="buttons">
      ${project.article ? `<a href="${project.article}" class="btn">Article</a>` : ''}
      ${project.demo ? `<a href="${project.demo}" class="btn">Demo</a>` : ''}
    </div>
  `;

  return card;
}
