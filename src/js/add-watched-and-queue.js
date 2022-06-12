import { addMovieIdToLocalStorage, addMovieToQueue } from './add-to-localstorage';
import { renderLsData } from './utils/render-library-markup';

const refs = {
  libraryBtn: document.querySelector('[data-page="library"]'),
  queueBtn: document.querySelector('.btn-library-queue'),
  watchedBtn: document.querySelector('.btn-library-watched'),
};

export function onBtnWatchedClick(e) {
  const WATCHED_ID_KEY = 'watched';
  const movieId = e.target.dataset.id;
  addMovieIdToLocalStorage(WATCHED_ID_KEY, movieId);
  toggleBtn(WATCHED_ID_KEY);

  checkPlace(refs.watchedBtn) && renderLsData(WATCHED_ID_KEY);
}

export function onBtnQueueClick(e) {
  const QUEUE_ID_KEY = 'queue';
  const movieId = e.target.dataset.id;
  addMovieToQueue(QUEUE_ID_KEY, movieId);
  toggleBtn(QUEUE_ID_KEY);

  checkPlace(refs.queueBtn) && renderLsData(QUEUE_ID_KEY);
}

function checkPlace(btn) {
  return refs.libraryBtn.classList.contains('active') && btn.classList.contains('is-active');
}

function toggleBtn(key) {
  const btn = document.querySelector(`.js-modal-${key}`);
  console.log(btn);
  btn.classList.toggle('modal__btn--active');
}
