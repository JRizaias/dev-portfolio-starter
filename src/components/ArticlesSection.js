import { createArticleCard } from './ArticleCard.js';
import i18n from '../i18n.js';

export function createArticlesSection(articles, onArticleDetails) {
  const section = document.createElement('section');
  section.className = 'card articles-section';

  const heading = document.createElement('h2');
  heading.textContent = i18n.t('articles');
  section.appendChild(heading);
  // Atualiza título ao trocar idioma
  i18n.on('languageChanged', () => {
    heading.textContent = i18n.t('Articles');
  });

  const grid = document.createElement('div');
  grid.className = 'article-grid'; // <--- aqui!

  articles.forEach(article => {
    grid.appendChild(createArticleCard(article, onArticleDetails));
  });

  section.appendChild(grid);
  return section;
}
