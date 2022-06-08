import modalTpl from '../templates/modal.hbs';

import MoviesAPI from './services/movies-api';
const moviesAPI = new MoviesAPI();
const refs = {
  modal: document.querySelector('.js-modal'),
  modalClose: document.querySelector('.js-modal-close'),
  backdrop: document.querySelector('.backdrop'),
};

export default function onOpenModal(id) {
  window.addEventListener('keydown', onEscKeyPress);
  refs.modal.classList.remove('backdrop--is-hidden');
  createModal(id);
}

refs.modalClose.addEventListener('click', onCloseModal);

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.modal.classList.add('backdrop--is-hidden');
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
    refs.modal.innerHTML = '';
    refs.modal.insertAdjacentHTML('afterbegin', markup);
  });
}