import showSpinner from '../js/utils/spinner';
import modalTpl from '../templates/modal.hbs';
import onModalBtnClick from './add-watched-and-queue';
import MoviesAPI from './services/movies-api';
import dullImg from '../img/poster.jpg';
import showConfetti from './utils/confetti';
const imgResource = 'https://image.tmdb.org/t/p/w300';

const moviesAPI = new MoviesAPI();

const refs = {
  modal: document.querySelector('.js-modal'),
  backdrop: document.querySelector('.js-backdrop'),
  modalClose: document.querySelector('.js-modal-close'),
};

export let currentMovie = null;

export default function onOpenModal(id) {
  showSpinner(true);
  showConfetti();
  createModal(id);

  document.body.style.overflow = 'hidden';
  refs.backdrop.classList.remove('backdrop--is-hidden');

  refs.modalClose.addEventListener('click', onCloseModal);
  refs.backdrop.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscKeyPress);
}

function onCloseModal() {
  const modalBtns = document.querySelectorAll('[data-add-to]');
  modalBtns.forEach(btn => btn.removeEventListener('click', onModalBtnClick));
  window.removeEventListener('keydown', onEscKeyPress);

  refs.backdrop.classList.add('backdrop--is-hidden');
  document.body.style.overflow = 'auto';
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

function createModal(movieId) {
  moviesAPI
    .fetchMovieDetails(movieId)
    .then(movieData => {
      refs.modal.innerHTML = modalTpl(transform(movieData));

      currentMovie = movieData;
    })
    .finally(() => {
      showSpinner(false);

      checkLsId(movieId, 'watched');
      checkLsId(movieId, 'queue');

      const modalBtns = document.querySelectorAll('[data-add-to]');
      modalBtns.forEach(btn => btn.addEventListener('click', onModalBtnClick));
    });
}

function checkLsId(id, key) {
  const lsValue = localStorage.getItem(key);

  if (!lsValue) {
    return;
  }

  const lsValueParsed = JSON.parse(lsValue);

  if (lsValueParsed.find(movie => movie.id === Number(id))) {
    enableBtn(key);
  }
}

function enableBtn(key) {
  const btn = document.querySelector(`.js-modal-${key}`);
  btn.classList.add('modal__btn--active');
  btn.textContent = 'remove from ' + key;
}

function transform(movieData) {
  const { poster_path, genres: genresList } = movieData;

  let genres = genresList.map(g => g.name);

  if (genres.length > 3) {
    genres = genres.slice(0, 2);
    genres.push('Other');
  }

  return {
    ...movieData,
    poster: poster_path ? imgResource + poster_path : dullImg,
    genres: genresList.length > 0 ? genres.join(', ') : 'Unknown',
  };
}
