import showSpinner from '../js/utils/spinner';
import modalTpl from '../templates/modal.hbs';
import { onBtnWatchedClick, onBtnQueueClick } from './add-watched-and-queue';

import MoviesAPI from './services/movies-api';
const moviesAPI = new MoviesAPI();

const refs = {
  modal: document.querySelector('.js-modal'),
  backdrop: document.querySelector('.js-backdrop'),
  modalClose: document.querySelector('.js-modal-close'),
};

export default function onOpenModal(id) {
  showSpinner(true);
  window.addEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.remove('backdrop--is-hidden');
  createModal(id);
  refs.modalClose.addEventListener('click', onCloseModal);
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.querySelector('.js-modal-watched').removeEventListener('click', onBtnWatchedClick);
  document.querySelector('.js-modal-queue').removeEventListener('click', onBtnQueueClick);
  refs.backdrop.classList.add('backdrop--is-hidden');
  refs.modal.innerHTML = '';
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
  moviesAPI
    .fetchMovieDetails(movieId)
    .then(movieObj => {
      const markup = modalTpl(movieObj);
      refs.modal.innerHTML = markup;
    })
    .finally(() => {
      showSpinner(false);
      checkLsId(movieId, 'watched');
      checkLsId(movieId, 'queue');
      document.querySelector('.js-modal-watched').addEventListener('click', onBtnWatchedClick);
      document.querySelector('.js-modal-queue').addEventListener('click', onBtnQueueClick);
    });
}

function checkLsId(id, key) {
  const lsValue = localStorage.getItem(key);
  if (!lsValue) {
    return;
  }

  const lsValueParsed = JSON.parse(lsValue);

  console.log(lsValueParsed, id);
  console.log(refs.modal.firstElementChild);

  if (lsValueParsed.includes(id)) {
    enableBtn(key);
  }
}

function enableBtn(key) {
  console.log(`.js-modal-${key}`);
  const btn = document.querySelector(`.js-modal-${key}`);
  btn.classList.add('modal__btn--active');
}

function disableBtn(key) {
  const btn = document.querySelector(`.js-modal-${key}`);
  btn.classList.remove('modal__btn--active');
}
