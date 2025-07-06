// src/components/Footer.js
export function createFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = `© ${new Date().getFullYear()} Izaias Ferreira – SertãoSoft`;
  return footer;
}
