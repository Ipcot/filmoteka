import { addMovieIdToLocalStorage, addMovieToQueue } from './add-to-localstorage';

export function onBtnWatchedClick(e) {
  const WATCHED_ID_KEY = 'watched id';
  const movieId = e.target.dataset.id;
  addMovieIdToLocalStorage(WATCHED_ID_KEY, movieId);
}

export function onBtnQueueClick(e) {
  const QUEUE_ID_KEY = 'queue id';
  const movieId = e.target.dataset.id;
  addMovieToQueue(QUEUE_ID_KEY, movieId);
}
