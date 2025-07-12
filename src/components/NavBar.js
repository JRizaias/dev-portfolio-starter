// src/components/NavBar.js
export function createNavBar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';

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
    nav.appendChild(a);
  });

  return nav;
}
