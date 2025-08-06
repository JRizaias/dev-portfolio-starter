import { createSearchBar } from './SearchBar.js';
import i18n from '../i18n.js';
import { navigateTo } from '../main.js';

export function createNavBar(onToggleSidebar, onSearchInput) {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main Navigation');

  const leftSection = document.createElement('div');
  leftSection.className = 'nav-left';

  // Sidebar toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'toggle-sidebar';
  toggleBtn.type = 'button';
  toggleBtn.setAttribute('aria-label', 'Alternar navegação lateral');
  toggleBtn.setAttribute('title', 'Mostrar/ocultar menu lateral');
  toggleBtn.tabIndex = 0;
  toggleBtn.innerHTML = '<span aria-hidden="true">☰</span>';
  toggleBtn.addEventListener('click', onToggleSidebar);
  toggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggleSidebar();
    }
  });
  leftSection.appendChild(toggleBtn);

  // Search bar (global)
  const searchBar = createSearchBar(onSearchInput);
  leftSection.appendChild(searchBar);

  // Navigation links usando SPA
  const navLinks = [
    { 
      view: null, 
      slug: null, 
      icon: '<img src="/assets/icons/icons-notes.png" alt="Home" class="nav-img-icon" />', 
      labelKey: 'menu_home' 
    },
    { 
      view: 'about', 
      slug: null, 
      icon: '<img src="/assets/icons/icons-about.png" alt="About" class="nav-img-icon" />', 
      labelKey: 'menu_about' 
    }
  ];

  navLinks.forEach(linkData => {
    const linkBtn = document.createElement('button');
    linkBtn.className = 'nav-link-btn';
    linkBtn.type = 'button';
    
    function updateLinkLabel() {
      linkBtn.setAttribute('aria-label', i18n.t(linkData.labelKey));
      linkBtn.setAttribute('title', i18n.t(linkData.labelKey));
    }
    updateLinkLabel();
    i18n.on('languageChanged', updateLinkLabel);

    // Marcar página atual
    const currentPath = window.location.pathname;
    if ((linkData.view === null && currentPath === '/') || 
        (linkData.view === 'about' && currentPath === '/about')) {
      linkBtn.setAttribute('aria-current', 'page');
      linkBtn.classList.add('active');
    }

    const iconSpan = document.createElement('span');
    iconSpan.className = 'nav-icon';
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.innerHTML = linkData.icon;

    const labelSpan = document.createElement('span');
    labelSpan.className = 'nav-label';
    
    function updateLabel() {
      labelSpan.textContent = i18n.t(linkData.labelKey);
    }
    updateLabel();
    i18n.on('languageChanged', updateLabel);

    linkBtn.appendChild(iconSpan);
    linkBtn.appendChild(labelSpan);

    // Event listener para navegação SPA
    linkBtn.addEventListener('click', () => {
      navigateTo(linkData.view, linkData.slug);
    });

    leftSection.appendChild(linkBtn);
  });

  const rightSection = document.createElement('div');
  rightSection.className = 'nav-right';

  // Link para GitHub
  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com';
  githubLink.innerHTML = '<img src="/assets/icons/icons-github.png" alt="GitHub" class="nav-img-icon" />';
  githubLink.className = 'nav-icon';
  githubLink.setAttribute('aria-label', 'GitHub');
  githubLink.setAttribute('title', 'GitHub');
  githubLink.setAttribute('target', '_blank');
  githubLink.setAttribute('rel', 'noopener noreferrer');
  rightSection.appendChild(githubLink);

  // Botões de idioma

  const langBR = document.createElement('button');
  langBR.innerHTML = '<img src="/assets/icons/brazil-flag.png" alt="Português" class="nav-img-icon" />';
  langBR.className = 'nav-icon';
  langBR.setAttribute('aria-label', 'Mudar para Português');
  langBR.setAttribute('title', 'Português');
  langBR.setAttribute('type', 'button');
  langBR.onclick = () => {
    i18n.changeLanguage('pt');
    localStorage.setItem('language', 'pt');
  };
  rightSection.appendChild(langBR);

  const langEN = document.createElement('button');
  langEN.innerHTML = '<img src="/assets/icons/usa-flag.png" alt="English" class="nav-img-icon" />';
  langEN.className = 'nav-icon';
  langEN.setAttribute('aria-label', 'Switch to English');
  langEN.setAttribute('title', 'English');
  langEN.setAttribute('type', 'button');
  langEN.onclick = () => {
    i18n.changeLanguage('en');
    localStorage.setItem('language', 'en');
  };
  rightSection.appendChild(langEN);

  nav.appendChild(leftSection);
  nav.appendChild(rightSection);

  return nav;
}
