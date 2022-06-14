import renderMarkup from './render-markup';
import { Notify } from 'notiflix';

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

refs.queueBtn.addEventListener('click', () => onLibBtnClick(LS_QUEUE));
refs.watchedBtn.addEventListener('click', () => onLibBtnClick(LS_WATCHED));

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

function onLibBtnClick(key) {
  renderLsData(key);
  localStorage.setItem(LS_LIB_LAST, key);
}

export function renderLsData(key) {
  showLibDull(false);

  const lsData = localStorage.getItem(key);
  const place = key === LS_QUEUE ? 'the queue' : 'watched';
  const warning = `No movies in ${place}.`;

  if (!lsData) {
    Notify.warning(warning);
    showLibDull(true);
    renderMarkup([]);
    return;
  }

  const lsDataParsed = JSON.parse(lsData);
  renderMarkup(lsDataParsed, true);

  if (lsDataParsed.length === 0) {
    Notify.warning(warning);
    showLibDull(true);
    return;
  }

  Notify.info(`You have ${lsDataParsed.length} movies in ${place}.`);
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
