import MoviesAPI from '../services/movies-api';
import { renderLibraryItem } from './render-markup';
import renderMarkup from './render-markup';
import Notiflix from 'notiflix';

const moviesAPI = new MoviesAPI();

const LS_LIB_LAST = 'libraryLast';
const LS_QUEUE = 'queue';
const LS_WATCHED = 'watched';

const refs = {
  watchedBtn: document.querySelector('.btn-library-watched'),
  queueBtn: document.querySelector('.btn-library-queue'),
  libraryBtn: document.querySelector('[data-page="library"]'),
  dull: document.querySelector('.js-lib-dull'),
  moviesContainer: document.querySelector('.js-movies'),
};

refs.queueBtn.addEventListener('click', onQueueBtnClick);
refs.watchedBtn.addEventListener('click', onWatchedBtnClick);

function onGoToMyLibrary() {
  const libraryLast = localStorage.getItem(LS_LIB_LAST);

  if (libraryLast === LS_QUEUE) {
    refs.queueBtn.classList.add('is-active');
    refs.watchedBtn.classList.remove('is-active');
  } else {
    refs.watchedBtn.classList.add('is-active');
    refs.queueBtn.classList.remove('is-active');
  }

  if (!libraryLast) {
    return renderLsData(LS_WATCHED);
  }

  renderLsData(libraryLast);
}

function onQueueBtnClick() {
  showLibDull(false);
  renderLsData(LS_QUEUE);
  localStorage.setItem(LS_LIB_LAST, LS_QUEUE);
}

function onWatchedBtnClick() {
  showLibDull(false);
  renderLsData(LS_WATCHED);
  localStorage.setItem(LS_LIB_LAST, LS_WATCHED);
}

function renderLibraryMarkup(movieIds) {
  renderMarkup([]);

  movieIds.forEach(movieId => {
    moviesAPI.fetchMovieDetails(movieId).then(data => {
      renderLibraryItem(data);
    });
  });
}

export function renderLsData(key) {
  const lsData = localStorage.getItem(key);
  const place = key === LS_QUEUE ? 'the queue' : 'watched';

  if (!lsData) {
    Notiflix.Notify.warning(`No movies added to ${place}.`);
    showLibDull(true);
    renderMarkup([]);
    return;
  }

  const lsDataParsed = JSON.parse(lsData);

  lsDataParsed.length === 0 && showLibDull(true);

  renderLibraryMarkup(lsDataParsed);
  Notiflix.Notify.info(`You have ${lsDataParsed.length} movies in ${place}.`);
}

export function showLibDull(isShown) {
  if (isShown) {
    refs.moviesContainer.classList.add('visually-hidden');
    return refs.dull.classList.remove('visually-hidden');
  }

  refs.moviesContainer.classList.remove('visually-hidden');
  refs.dull.classList.add('visually-hidden');
}

export default onGoToMyLibrary;
