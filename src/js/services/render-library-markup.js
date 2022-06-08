import MoviesAPI from './movies-api';
import renderMarkup from '../utils/render-markup';
 import Notiflix from 'notiflix';

const moviesAPI = new MoviesAPI();

const LS_LIB_LAST = 'libraryLast';
const LS_QUEUE = 'queue';
const LS_WATCHED = 'watched';

let movieObjs = [];

const refs = {
  watchedBtn: document.querySelector('.btn-library-watched'),
  queueBtn: document.querySelector('.btn-library-queue'),
  libraryBtn: document.querySelector('[data-page="library"]'),
};

refs.libraryBtn.addEventListener('click', onMyLibraryClick);
refs.queueBtn.addEventListener('click', onQueueBtnClick);
refs.watchedBtn.addEventListener('click', onWatchedBtnClick);

function onMyLibraryClick() {
  const libraryLast = localStorage.getItem(LS_LIB_LAST);

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
  movieIds.forEach((movieId, i) => {
    if (i === movieIds.length - 1) {
      fetchMovie(movieId, true);
      return ;
    }

    if (i === 0) {
      movieObjs = [];
    
    }

    fetchMovie(movieId);
  });
}

function fetchMovie(id, render = false) {
  moviesAPI.fetchMovieDetails(id).then(data => {
    movieObjs.push(data);
    render && renderMarkup(movieObjs, true);
  });
}

function renderLsData(key) {
  const lsData = localStorage.getItem(key);
  if (!lsData) {
    return Notiflix.Notify.failure('No watched movies in your library.');
  }
  const lsDataParsed = JSON.parse(lsData);

  renderLibraryMarkup(lsDataParsed);
  Notiflix.Notify.info(`Hooray! You have ${lsData.length} movies in collection.`);
}
