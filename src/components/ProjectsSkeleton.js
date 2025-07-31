// src/components/ProjectsSkeleton.js
/**
 * Renderiza uma seção de skeleton loaders para projetos
 * @param {number} count - Quantos skeleton cards exibir
 * @returns {HTMLElement}
 */
export function createProjectsSkeleton(count = 6) {
  const section = document.createElement('section');
  section.className = 'card projects-section';

  const heading = document.createElement('h2');
  heading.textContent = 'Projects';
  heading.className = 'skeleton';
  heading.style.width = '10rem';
  heading.style.height = '2rem';
  section.appendChild(heading);

  const grid = document.createElement('ul');
  grid.className = 'project-grid';
  grid.setAttribute('role', 'list');
  grid.style.listStyle = 'none';
  grid.style.padding = '0';
  grid.style.margin = '0';

  for (let i = 0; i < count; i++) {
    const li = document.createElement('li');
    li.setAttribute('role', 'listitem');
    li.style.display = 'flex';
    li.style.flexDirection = 'column';
    li.style.height = '100%';

    const card = document.createElement('div');
    card.className = 'project-card skeleton';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.gap = '0.5rem';
    card.style.padding = '1.1rem 1.3rem';
    card.innerHTML = `
      <span class="skeleton" style="width:5rem;height:1.2rem;"></span>
      <h3 class="skeleton" style="width:60%;height:1.5rem;"></h3>
      <div class="buttons" style="display:flex;gap:0.7rem;">
        <span class="skeleton" style="width:4.5rem;height:2rem;border-radius:0.5em;"></span>
        <span class="skeleton" style="width:4.5rem;height:2rem;border-radius:0.5em;"></span>
      </div>
    `;
    li.appendChild(card);
    grid.appendChild(li);
  }

  section.appendChild(grid);
  return section;
}
