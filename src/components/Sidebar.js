// src/components/Sidebar.js
import i18n from '../i18n.js';

export function createSidebar() {
  const aside = document.createElement('aside');
  aside.className = 'sidebar';

  function renderContent() {
    aside.innerHTML = `
      <section>
        <h2>${i18n.t('sidebar_about_me')}</h2>
        <p>${i18n.t('sidebar_about_desc')}</p>
      </section>
      <section>
        <h3>${i18n.t('sidebar_stay_connected')}</h3>
        <ul>
          <li><a href="mailto:izaias@sertaosoft.com">✉️ ${i18n.t('sidebar_newsletter')}</a></li>
          <li><a href="/rss.xml">📰 ${i18n.t('sidebar_rss')}</a></li>
        </ul>
      </section>
      <section>
        <h3>${i18n.t('sidebar_guides')}</h3>
        <ul>
          <li><a href="#">${i18n.t('sidebar_guide_react')}</a></li>
          <li><a href="#">${i18n.t('sidebar_guide_bi')}</a></li>
        </ul>
      </section>
      <section>
        <h3>${i18n.t('sidebar_fun')}</h3>
        <ul>
          <li><a href="#">${i18n.t('sidebar_fun_pc')}</a></li>
          <li><a href="#">${i18n.t('sidebar_fun_retro')}</a></li>
        </ul>
      </section>
      <section>
        <h3>${i18n.t('sidebar_writeups')}</h3>
        <ul>
          <li><a href="#">${i18n.t('sidebar_writeup_app')}</a></li>
          <li><a href="#">${i18n.t('sidebar_writeup_bi')}</a></li>
        </ul>
      </section>
    `;
  }

  renderContent();
  // Atualiza sidebar ao trocar idioma
  i18n.on('languageChanged', renderContent);

  return aside;
}

