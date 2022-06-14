import teamTemplates from '../templates/our-team.hbs';
import members from './data/our-team.json';

const refs = {
  openMenuBtn: document.querySelector('.footer__link'),
  modal: document.querySelector('.js-modal'),
  backdrop: document.querySelector('.js-backdrop'),
  modalClose: document.querySelector('.js-modal-close'),
};

refs.openMenuBtn.addEventListener('click', onOpenModal);

function onOpenModal(id) {
  renderOurTeam();
  document.body.style.overflow = 'hidden';
  refs.backdrop.classList.remove('backdrop--is-hidden');

  refs.modalClose.addEventListener('click', onCloseModal);
  refs.backdrop.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscKeyPress);
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);

  document.body.style.overflow = 'auto';
  refs.backdrop.classList.add('backdrop--is-hidden');
  refs.modal.innerHTML = '';
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function renderOurTeam() {
  const markup = teamTemplates(members);
  refs.modal.innerHTML = markup;
}
