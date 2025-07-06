// src/components/Sidebar.js
export function createSidebar() {
  const aside = document.createElement('aside');
  aside.className = 'sidebar';

  aside.innerHTML = `
    <section>
      <h2>About Me</h2>
      <p>Sou Izaias, desenvolvedor de soluções digitais. Este é meu “digital garden”.</p>
    </section>
    <section>
      <h3>Stay Connected</h3>
      <ul>
        <li><a href="mailto:izaias@sertaosoft.com">✉️ Email Newsletter</a></li>
        <li><a href="/rss.xml">📰 RSS Feed</a></li>
      </ul>
    </section>
    <section>
      <h3>Guides</h3>
      <ul>
        <li><a href="#">React & Power Automate</a></li>
        <li><a href="#">Power BI Modern</a></li>
      </ul>
    </section>
    <section>
      <h3>Fun Stuff</h3>
      <ul>
        <li><a href="#">Meu primeiro PC</a></li>
        <li><a href="#">Retrospectiva 2024</a></li>
      </ul>
    </section>
    <section>
      <h3>Project Writeups</h3>
      <ul>
        <li><a href="#">SertãoSoft App</a></li>
        <li><a href="#">Painel BI Interativo</a></li>
      </ul>
    </section>
  `;

  return aside;
}
