// src/components/About.js
import i18n from '../i18n.js';

export function createAbout() {
  const aboutSection = document.createElement('section');
  aboutSection.className = 'about-page';

  // 1. Cabeçalho Principal
  const mainHeading = document.createElement('h1');
  mainHeading.className = 'about-main-heading';
  
  function updateMainHeading() {
    mainHeading.textContent = i18n.t('about_main_heading');
  }
  updateMainHeading();
  i18n.on('languageChanged', updateMainHeading);
  
  aboutSection.appendChild(mainHeading);

  // 2. Seção de Introdução Pessoal
  const introSection = document.createElement('div');
  introSection.className = 'about-intro-section';

  // Texto à esquerda
  const textContent = document.createElement('div');
  textContent.className = 'about-text-content';

  const introParagraph1 = document.createElement('p');
  const introParagraph2 = document.createElement('p');
  const introParagraph3 = document.createElement('p');

  function updateIntroText() {
    introParagraph1.textContent = i18n.t('about_intro_p1');
    introParagraph2.textContent = i18n.t('about_intro_p2');
    introParagraph3.textContent = i18n.t('about_intro_p3');
  }
  updateIntroText();
  i18n.on('languageChanged', updateIntroText);

  textContent.appendChild(introParagraph1);
  textContent.appendChild(introParagraph2);
  textContent.appendChild(introParagraph3);

  // Foto à direita
  const imageContainer = document.createElement('div');
  imageContainer.className = 'about-image-container';

  const profileImage = document.createElement('img');
  profileImage.className = 'about-profile-image';
  profileImage.src = './src/assets/profile-image.jpg'; // Ajustar caminho conforme necessário
  profileImage.alt = 'Profile photo';
  profileImage.loading = 'lazy';

  imageContainer.appendChild(profileImage);

  introSection.appendChild(textContent);
  introSection.appendChild(imageContainer);
  aboutSection.appendChild(introSection);

  // 3. Seção de Contato
  const contactSection = document.createElement('div');
  contactSection.className = 'about-contact-section';

  const contactHeading = document.createElement('h2');
  contactHeading.className = 'about-contact-heading';
  
  function updateContactHeading() {
    contactHeading.textContent = i18n.t('about_contact_heading');
  }
  updateContactHeading();
  i18n.on('languageChanged', updateContactHeading);

  const contactInvite = document.createElement('p');
  contactInvite.className = 'about-contact-invite';
  
  function updateContactInvite() {
    contactInvite.textContent = i18n.t('about_contact_invite');
  }
  updateContactInvite();
  i18n.on('languageChanged', updateContactInvite);

  // Lista de opções de contato
  const contactList = document.createElement('ul');
  contactList.className = 'about-contact-list';

  const contactOptions = [
    { key: 'email', icon: '✉️', link: 'mailto:seu-email@exemplo.com' },
    { key: 'github', icon: '<img src="/assets/icons/icons-github.png" alt="GitHub" class="nav-img-icon" />', link: 'https://github.com/seu-usuario' },
    { key: 'services', icon: '💼', link: '#produtos-servicos' }
  ];

  contactOptions.forEach(option => {
    const listItem = document.createElement('li');
    listItem.className = 'about-contact-item';

    const link = document.createElement('a');
    link.href = option.link;
    link.className = 'about-contact-link';
    if (option.link.startsWith('http')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }

    const icon = document.createElement('span');
    icon.className = 'about-contact-icon';
    if (option.icon.startsWith('<img')) {
      icon.innerHTML = option.icon;
    } else {
      icon.textContent = option.icon;
    }

    const text = document.createElement('span');
    text.className = 'about-contact-text';
    
    function updateContactText() {
      text.textContent = i18n.t(`about_contact_${option.key}`);
    }
    updateContactText();
    i18n.on('languageChanged', updateContactText);

    link.appendChild(icon);
    link.appendChild(text);
    listItem.appendChild(link);
    contactList.appendChild(listItem);
  });

  contactSection.appendChild(contactHeading);
  contactSection.appendChild(contactInvite);
  contactSection.appendChild(contactList);
  aboutSection.appendChild(contactSection);

  return aboutSection;
}
