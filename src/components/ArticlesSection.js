import { createArticleCard } from './ArticleCard.js';

export function createArticlesSection(articles, onArticleDetails) {
  const section = document.createElement('section');
  section.className = 'card articles-section';

  const heading = document.createElement('h2');
  heading.textContent = 'Artigos';
  section.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'article-grid'; // <--- aqui!

  articles.forEach(article => {
    grid.appendChild(createArticleCard(article, onArticleDetails));
  });

  section.appendChild(grid);
  return section;
}
