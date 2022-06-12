import teamTemplates from '../templates/our-team.hbs';
import members from './data/our-team.json';

const refs = {
  openMenuBtn: document.querySelector('.footer__link'),
  closeMenuBtn: document.querySelector('.modal-content__close-btn-team '),
};

refs.openMenuBtn.addEventListener('click', renderOurTEam);
//refs.closeMenuBtn.addEventListener('click');

function renderOurTEam() {
  const markup = teamTemplates(members);
  refs.openMenuBtn.insertAdjacentHTML('afterbegin', markup);
  return markup;
}
export default renderOurTEam;
