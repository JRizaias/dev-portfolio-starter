export function createNavBar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main Navigation');

  const leftSection = document.createElement('div');
  leftSection.className = 'nav-left';

  const links = [
    { href: 'index.html', icon: '🏠', label: 'Notes' },
    { href: 'blog.html', icon: '📖', label: 'Blog' },
    { href: 'projects.html', icon: '🛠️', label: 'Projects' },
    { href: 'about.html', icon: '👤', label: 'About' }
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
    iconSpan.textContent = link.icon;

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
  githubLink.innerHTML = '🐙';
  githubLink.className = 'nav-icon';
  githubLink.setAttribute('aria-label', 'GitHub');
  githubLink.setAttribute('title', 'GitHub');
  githubLink.setAttribute('target', '_blank');
  githubLink.setAttribute('rel', 'noopener noreferrer');
  rightSection.appendChild(githubLink);

  // Botões de idioma
  const langBR = document.createElement('button');
  langBR.innerHTML = '🇧🇷';
  langBR.className = 'nav-icon';
  langBR.setAttribute('aria-label', 'Mudar para Português');
  langBR.setAttribute('title', 'Português');
  langBR.setAttribute('type', 'button');
  rightSection.appendChild(langBR);

  const langEN = document.createElement('button');
  langEN.innerHTML = '🇺🇸';
  langEN.className = 'nav-icon';
  langEN.setAttribute('aria-label', 'Switch to English');
  langEN.setAttribute('title', 'English');
  langEN.setAttribute('type', 'button');
  rightSection.appendChild(langEN);

  nav.appendChild(leftSection);
  nav.appendChild(rightSection);

  return nav;
}
