import { createSearchBar } from './SearchBar.js';
import i18n from '../i18n.js';

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

  const links = [
    { href: 'index.html', icon: '<img src="src/assets/icons/icons-notes.png" alt="Notes" class="nav-img-icon" />', label: 'Notes' },
    { href: 'projects.html', icon: '🛠️', label: 'Projects' },
    { href: 'about.html', icon: '<img src="src/assets/icons/icons-about.png" alt="About" class="nav-img-icon" />', label: 'About' }
  ];

  links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.setAttribute('aria-label', link.label);
    a.setAttribute('title', link.label);

    // Marcar página atual com aria-current
    if (window.location.pathname.includes(link.href)) {
      a.setAttribute('aria-current', 'page');
    }

    const iconSpan = document.createElement('span');
    iconSpan.className = 'nav-icon';
    iconSpan.setAttribute('aria-hidden', 'true');
    if (link.icon.startsWith('<img')) {
      iconSpan.innerHTML = link.icon;
    } else {
      iconSpan.textContent = link.icon;
    }

    const labelSpan = document.createElement('span');
    labelSpan.className = 'nav-label';
    labelSpan.textContent = link.label;

    a.appendChild(iconSpan);
    a.appendChild(labelSpan);
    leftSection.appendChild(a);
  });

  const rightSection = document.createElement('div');
  rightSection.className = 'nav-right';


  // Link para GitHub
  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/JRizaias';
  githubLink.innerHTML = '<img src="src/assets/icons/icons-github.png" alt="GitHub" class="nav-img-icon" />';
  githubLink.className = 'nav-icon';
  githubLink.setAttribute('aria-label', 'GitHub');
  githubLink.setAttribute('title', 'GitHub');
  githubLink.setAttribute('target', '_blank');
  githubLink.setAttribute('rel', 'noopener noreferrer');
  rightSection.appendChild(githubLink);

  // Botões de idioma

  const langBR = document.createElement('button');
  langBR.innerHTML = '<img src="src/assets/icons/brazil-flag.png" alt="Português" class="nav-img-icon" />';
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
  langEN.innerHTML = '<img src="src/assets/icons/usa-flag.png" alt="English" class="nav-img-icon" />';
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
