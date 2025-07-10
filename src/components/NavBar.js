// src/components/NavBar.js
export function createNavBar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';

  // Container esquerdo (links de navegação)
  const leftSection = document.createElement('div');
  leftSection.className = 'nav-left';

  const links = [
    { href: 'index.html', label: '📝 Notes' },
    { href: 'blog.html', label: '📖 Blog' },
    { href: 'projects.html', label: '🤖 Projects' },
    { href: 'about.html', label: '👤 About' }
  ];

  links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.innerHTML = link.label;
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
