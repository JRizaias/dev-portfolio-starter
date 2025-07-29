// src/components/Footer.js
import i18n from '../i18n.js';

export function createFooter() {
  const footer = document.createElement('footer');
  function renderContent() {
    footer.innerHTML = `© ${new Date().getFullYear()} Izaias Ferreira – SertãoSoft · ${i18n.t('footer_text')}`;
  }
  renderContent();
  i18n.on('languageChanged', renderContent);
  return footer;
}

