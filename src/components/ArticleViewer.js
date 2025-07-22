// src/components/ArticleViewer.js
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
  backBtn.innerHTML = '← Voltar';
  backBtn.onclick = onBack;

  const title = document.createElement('h2');
  title.textContent = article.title;
  title.style.margin = '0';

  header.appendChild(backBtn);
  header.appendChild(title);
  section.appendChild(header);

  // Aqui renderiza o markdown
  const markdownDiv = document.createElement('div');
  markdownDiv.className = 'article-content';

  // Garante que marked.js já está disponível globalmente
  if (window.marked) {
    markdownDiv.innerHTML = window.marked.parse(article.content || '');
  } else {
    markdownDiv.textContent = article.content || '';
  }

  section.appendChild(markdownDiv);
  return section;
}
