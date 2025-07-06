// src/components/ArticleCard.js

export async function renderArticleCards(containerId) {
  try {
    const response = await fetch('/src/data/articles.json');
    const articles = await response.json();

    const container = document.getElementById(containerId);
    container.innerHTML = ''; // limpa antes de inserir

    articles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'article-card';

      card.innerHTML = `
        <span class="article-icon">${article.icon}</span>
        <div class="article-text">
          <a href="${article.link}" class="article-title">${article.title}</a>
          <p class="article-desc">${article.description}</p>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Erro ao carregar os artigos:', error);
  }
}
