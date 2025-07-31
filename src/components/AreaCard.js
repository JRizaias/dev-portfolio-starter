// src/components/AreaCard.js
import { navigateTo } from '../main.js';
export function createAreaCard(area, count, onSelect, isSearchMode = false) {
  const card = document.createElement('div');
  card.className = 'area-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `${area} (${count} projetos)`);
  card.innerHTML = `
    <h3>${area}</h3>
    <span class="area-count">${count} projeto${count > 1 ? 's' : ''}</span>
  `;
  if (isSearchMode) {
    card.classList.add('disabled');
    card.tabIndex = -1;
    card.setAttribute('aria-disabled', 'true');
  } else {
    card.addEventListener('click', () => navigateTo('area', area));
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') navigateTo('area', area);
    });
  }
  return card;
}
