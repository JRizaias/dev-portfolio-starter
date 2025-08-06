// src/components/Sidebar.js
import i18n from '../i18n.js';

export function createSidebar() {
  const aside = document.createElement('aside');
  aside.className = 'sidebar';

  // Função para carregar dados de projetos e artigos
  async function loadData() {
    try {
      const [projectsResponse, articlesResponse] = await Promise.all([
        fetch('/src/data/projects.json'),
        fetch('/src/data/articles.json')
      ]);
      
      const projects = await projectsResponse.json();
      const articles = await articlesResponse.json();
      
      return [...projects, ...articles];
    } catch (error) {
      console.error('Erro ao carregar dados para o Sidebar:', error);
      return [];
    }
  }

  // Função para filtrar itens por tag
  function filterByTag(items, tag) {
    return items.filter(item => item.tags && item.tags.includes(tag));
  }

  // Função para renderizar uma seção com itens dinâmicos
  function renderSection(title, items, currentLang) {
    if (items.length === 0) return '';
    
    const itemsHtml = items.map(item => {
      const title = currentLang === 'pt' ? (item.title_pt || item.title) : (item.title_en || item.title);
      const description = currentLang === 'pt' ? (item.description_pt || item.description) : (item.description_en || item.description);
      const type = item.areas ? 'projetos' : 'artigos'; // projetos têm 'areas', artigos não
      
      return `<li><a href="/${type}/${item.slug}" title="${description}">${title}</a></li>`;
    }).join('');
    
    return `
      <section>
        <h3>${title}</h3>
        <ul>${itemsHtml}</ul>
      </section>
    `;
  }

  async function renderContent() {
    const currentLang = i18n.language;
    const allItems = await loadData();
    
    // Filtrar itens por tags
    const guideItems = filterByTag(allItems, 'guide');
    const funItems = filterByTag(allItems, 'fun-stuff');
    const writeupItems = filterByTag(allItems, 'project-writeups');
    
    aside.innerHTML = `
      <section>
        <h2>${i18n.t('sidebar_about_me')}</h2>
        <p>${i18n.t('sidebar_about_desc')}</p>
      </section>
      ${renderSection(i18n.t('sidebar_guides'), guideItems, currentLang)}
      ${renderSection(i18n.t('sidebar_fun'), funItems, currentLang)}
      ${renderSection(i18n.t('sidebar_writeups'), writeupItems, currentLang)}
    `;
  }

  renderContent();
  // Não adiciona listener de idioma aqui. Sidebar deve ser recriado do zero pelo fluxo central.
  return aside;
}

