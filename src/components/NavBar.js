// src/components/NavBar.js
export function createNavBar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';

  const links = [
    { href: 'index.html', label: '🏠 Notes' },
    { href: 'blog.html', label: '📖 Blog' },
    { href: 'projects.html', label: '🛠️ Projects' },
    { href: 'about.html', label: '👤 About' }
  ];

  links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.innerHTML = link.label;
    nav.appendChild(a);
  });

  return nav;
}
