// src/components/ProjectViewer.js

function sanitizeHTML(html) {
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
}

function highlightBlocks(container) {
  if (window.hljs) {
    container.querySelectorAll('pre code').forEach(block => {
      window.hljs.highlightElement(block);
    });
  }
}

import i18n from '../i18n.js';

export function createProjectViewer(project, isSearchMode = false) {
  const wrapper = document.createElement('section');
  wrapper.className = 'project-viewer';

  if (!project) {
    wrapper.innerHTML = `<div class="pv-empty">${i18n.t('select_project') || 'Selecione um projeto para ver detalhes.'}</div>`;
    return wrapper;
  }

  const titleElem = document.createElement('h2');
  const yearElem = document.createElement('span');
  yearElem.className = 'pv-year';
  const articleElem = document.createElement('article');
  articleElem.tabIndex = 0;

  function renderProjectContent() {
    const lang = i18n.language || localStorage.getItem('language') || 'pt';
    titleElem.textContent = project[`title_${lang}`] || project.title || 'Sem título';
    yearElem.textContent = project.year || '';
    if (window.marked) {
      articleElem.innerHTML = window.marked.parse(project[`description_${lang}`] || project.description || '');
    } else {
      articleElem.textContent = project[`description_${lang}`] || project.description || '';
    }
    highlightBlocks(articleElem);
  }

  const contentDiv = document.createElement('div');
  contentDiv.className = 'pv-content';
  if (!isSearchMode) {
    contentDiv.appendChild(titleElem);
    contentDiv.appendChild(yearElem);
  }
  contentDiv.appendChild(articleElem);
  wrapper.appendChild(contentDiv);

  renderProjectContent();
  i18n.on('languageChanged', renderProjectContent);

  return wrapper;
}
