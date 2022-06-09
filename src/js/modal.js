import modalTpl from '../templates/modal.hbs';

import MoviesAPI from './services/movies-api';
const moviesAPI = new MoviesAPI();
const refs = {
  modal: document.querySelector('.js-modal'),
  backdrop: document.querySelector('.js-backdrop'),
  modalClose: document.querySelector('.js-modal-close'),
};

export default function onOpenModal(id) {
  window.addEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.remove('backdrop--is-hidden');
  createModal(id);
  refs.modalClose.addEventListener('click', onCloseModal);
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.add('backdrop--is-hidden');
}

refs.backdrop.addEventListener('click', onBackdropClick);

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

function createModal(movieId) {
  moviesAPI.fetchMovieDetails(movieId).then(movieObj => {
    const markup = modalTpl(movieObj);
    refs.modal.innerHTML = markup;
  });
}
