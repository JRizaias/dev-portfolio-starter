import { createArticleCard } from './ArticleCard.js';
import i18n from '../i18n.js';

export function createArticlesSection(articles, onArticleDetails) {
  const section = document.createElement('section');
  section.className = 'card articles-section';

  const articlesHeading = document.createElement('h2');
  function renderHeading() {
    const lang = i18n.language || localStorage.getItem('language') || 'pt';
    articlesHeading.textContent = lang === 'pt' ? 'Artigos' : 'Articles';
  }
  renderHeading();
  section.appendChild(articlesHeading);
  i18n.on('languageChanged', renderHeading);

  const grid = document.createElement('div');
  grid.className = 'article-grid'; // <--- aqui!

  articles.forEach(article => {
    grid.appendChild(createArticleCard(article, onArticleDetails));
  });

  section.appendChild(grid);
  return section;
}
