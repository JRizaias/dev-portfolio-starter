// src/components/ArticleCard.js
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
  card.innerHTML = `
    <span class="article-icon">${article.icon}</span>
    <div class="article-text">
      <span class="article-title">${article.title}</span>
      <p class="article-desc">${article.description}</p>
    </div>
  `;
  return card;
}