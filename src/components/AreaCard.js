// src/components/AreaCard.js
export function createAreaCard(area, count, onSelect) {
  const card = document.createElement('div');
  card.className = 'area-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `${area} (${count} projetos)`);
  card.innerHTML = `
    <h3>${area}</h3>
    <span class="area-count">${count} projeto${count > 1 ? 's' : ''}</span>
  `;
  card.addEventListener('click', () => onSelect(area));
  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') onSelect(area);
  });
  return card;
}
