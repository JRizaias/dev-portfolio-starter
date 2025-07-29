// src/components/ArticleViewer.js
import i18n from '../i18n.js';

export function createArticleViewer(article, onBack) {
  const section = document.createElement('section');
  section.className = 'card article-viewer';

  // Header com botão voltar e título do artigo
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.gap = '0.7rem';
  header.style.marginBottom = '1.1rem';

  const backBtn = document.createElement('button');
  backBtn.className = 'back-btn';
  backBtn.type = 'button';
  function renderBackBtn() {
    backBtn.innerHTML = i18n.t('back_btn');
  }
  renderBackBtn();
  backBtn.onclick = onBack;
  i18n.on('languageChanged', renderBackBtn);

  const title = document.createElement('h2');
  function renderArticleContent() {
    const lang = i18n.language || localStorage.getItem('language') || 'pt';
    title.textContent = article[`title_${lang}`] || article.title || 'Sem título';
    if (window.marked) {
      markdownDiv.innerHTML = window.marked.parse(article[`content_${lang}`] || article.content || '');
    } else {
      markdownDiv.textContent = article[`content_${lang}`] || article.content || '';
    }
  }
  title.style.margin = '0';

  header.appendChild(backBtn);
  header.appendChild(title);
  section.appendChild(header);

  // Renderiza o markdown
  const markdownDiv = document.createElement('div');
  markdownDiv.className = 'article-content';

  renderArticleContent();

  // Atualiza ao trocar idioma
  i18n.on('languageChanged', renderArticleContent);

  section.appendChild(markdownDiv);
  return section;
}
