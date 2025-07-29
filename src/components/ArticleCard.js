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

  // Elementos visuais
  const iconSpan = document.createElement('span');
  iconSpan.className = 'article-icon';
  iconSpan.textContent = article.icon;

  const textDiv = document.createElement('div');
  textDiv.className = 'article-text';

  const titleSpan = document.createElement('span');
  titleSpan.className = 'article-title';

  const descP = document.createElement('p');
  descP.className = 'article-desc';

  // Função para renderizar título e descrição conforme idioma
  function renderContent() {
    const lang = i18n.language || localStorage.getItem('language') || 'pt';
    titleSpan.textContent = article[`title_${lang}`] || article.title || 'Sem título';
    descP.textContent = article[`description_${lang}`] || article.description || 'Sem descrição';
  }
  renderContent();

  textDiv.appendChild(titleSpan);
  textDiv.appendChild(descP);
  card.appendChild(iconSpan);
  card.appendChild(textDiv);

  // Atualiza dinamicamente ao trocar idioma
  i18n.on('languageChanged', renderContent);

  return card;
}