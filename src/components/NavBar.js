// src/components/NavBar.js
export function createNavBar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';

  // Container esquerdo (links de navegação)
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

    const iconSpan = document.createElement('span');
    iconSpan.className = 'nav-icon';
    iconSpan.textContent = link.icon;

    const labelSpan = document.createElement('span');
    labelSpan.className = 'nav-label';
    labelSpan.textContent = link.label;

    a.appendChild(iconSpan);
    a.appendChild(labelSpan);
    leftSection.appendChild(a);
  });

  // Container direito (idiomas + ícones adicionais)
  const rightSection = document.createElement('div');
  rightSection.className = 'nav-right';

  // Alternar tema escuro
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = '🌓';
  themeToggle.className = 'nav-icon';
  themeToggle.title = 'Toggle theme';
  rightSection.appendChild(themeToggle);

  // GitHub link
  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/JRizaias';
  githubLink.innerHTML = '🐙';
  githubLink.className = 'nav-icon';
  githubLink.title = 'GitHub';
  githubLink.target = '_blank';
  rightSection.appendChild(githubLink);

  // Botões de idioma (🇺🇸 / 🇧🇷)
  const langBR = document.createElement('button');
  langBR.innerHTML = '🇧🇷';
  langBR.className = 'nav-icon';
  langBR.title = 'Português';
  rightSection.appendChild(langBR);

  const langEN = document.createElement('button');
  langEN.innerHTML = '🇺🇸';
  langEN.className = 'nav-icon';
  langEN.title = 'English';
  rightSection.appendChild(langEN);

  nav.appendChild(leftSection);
  nav.appendChild(rightSection);

  return nav;
}