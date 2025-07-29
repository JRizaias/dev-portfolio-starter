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

export function createProjectViewer(project, isSearchMode = false) {
  const wrapper = document.createElement('section');
  wrapper.className = 'project-viewer';

  if (!project) {
    wrapper.innerHTML = `<div class="pv-empty">Selecione um projeto para ver detalhes.</div>`;
    return wrapper;
  }

  const md = window.marked.parse(project.description_pt || project.description || '', {sanitize: true});

  if (isSearchMode) {
    wrapper.innerHTML = `
      <div class="pv-content">
        <article tabindex="0">${md}</article>
      </div>
    `;
  } else {
    wrapper.innerHTML = `
      <div class="pv-content">
        <h2>${sanitizeHTML(project.title_pt || project.title || 'Sem título')}</h2>
        <span class="pv-year">${sanitizeHTML(project.year || '')}</span>
        <article tabindex="0">${md}</article>
      </div>
    `;
  }

  highlightBlocks(wrapper);

  return wrapper;
}
