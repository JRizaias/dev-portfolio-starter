// src/components/ArticleCard.js
import i18n from '../i18n.js';
export function createArticleCard(article, onArticleDetails) {
  const card = document.createElement('div');
  card.className = 'article-card';
  card.tabIndex = 0; // Acessível com teclado

  // Clique no card inteiro abre detalhe do artigo
  card.addEventListener('click', () => onArticleDetails(article));
  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') onArticleDetails(article);
  });

  // Monta visual
  const lang = i18n.language || localStorage.getItem('language') || 'pt';
  card.innerHTML = `
    <span class="article-icon">${article.icon}</span>
    <div class="article-text">
      <span class="article-title">${article[`title_${lang}`] || article.title || 'Sem título'}</span>
      <p class="article-desc">${article[`description_${lang}`] || article.description || 'Sem descrição'}</p>
    </div>
  `;
  return card;
}