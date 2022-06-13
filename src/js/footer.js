import teamTemplates from '../templates/our-team.hbs';
import members from './services/our-team.json';

const refs = {
  openMenuBtn: document.querySelector('.footer__link'),
  // modalClose: document.querySelector('.js-modal-close'),
};

refs.openMenuBtn.addEventListener('click', renderOurTEam);

function renderOurTEam() {
  const markup = teamTemplates(members);
  refs.openMenuBtn.insertAdjacentHTML('afterbegin', markup);
  return markup;
}
export default renderOurTEam;
