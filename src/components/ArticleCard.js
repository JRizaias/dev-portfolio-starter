export function createArticleCard(article) {
  const card = document.createElement('div');
  card.className = 'article-card';

  card.innerHTML = `
    <span class="article-icon">${article.icon || '📰'}</span>
    <div class="article-text">
      <a href="${article.url}" class="article-title" target="_blank" rel="noopener noreferrer">${article.title}</a>
      <p class="article-desc">${article.description}</p>
    </div>
  `;

  return card;
}
