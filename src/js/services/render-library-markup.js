import MoviesAPI from './movies-api';
import { renderLibraryItem } from '../utils/render-markup';
import renderMarkup from '../utils/render-markup';
import Notiflix from 'notiflix';

const moviesAPI = new MoviesAPI();

const LS_LIB_LAST = 'libraryLast';
const LS_QUEUE = 'queue';
const LS_WATCHED = 'watched';

const refs = {
  watchedBtn: document.querySelector('.btn-library-watched'),
  queueBtn: document.querySelector('.btn-library-queue'),
  libraryBtn: document.querySelector('[data-page="library"]'),
};

// refs.libraryBtn.addEventListener('click', onGoToMyLibrary);
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
  renderLsData(LS_QUEUE);
  localStorage.setItem(LS_LIB_LAST, LS_QUEUE);
}

function onWatchedBtnClick() {
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

function renderLsData(key) {
  const lsData = localStorage.getItem(key);
  const place = key === LS_QUEUE ? 'the queue' : 'watched';

  if (!lsData) {
    Notiflix.Notify.warning(`No movies added to ${place}.`);
    return renderMarkup([]);
  }

  const lsDataParsed = JSON.parse(lsData);

  renderLibraryMarkup(lsDataParsed);
  Notiflix.Notify.info(`You have ${lsDataParsed.length} movies in ${place}.`);
}

export default onGoToMyLibrary;
