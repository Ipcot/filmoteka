import { renderLsData } from './utils/render-library-markup';
import { currentMovie } from './modal';

const libraryBtn = document.querySelector('[data-page="library"]');

export default function onModalBtnClick(e) {
  const { addTo } = e.currentTarget.dataset;

  addMovieToLS(addTo, currentMovie);
  toggleBtn(addTo);

  const activeLibBtn = document.querySelector(`.btn-library-${addTo}`);
  checkPlace(activeLibBtn) && renderLsData(addTo);
}

function addMovieToLS(key, movie) {
  const lsValue = localStorage.getItem(key);

  if (!lsValue) {
    localStorage.setItem(key, JSON.stringify([movie]));
    return;
  }

  let movies = JSON.parse(lsValue);
  const isMovieInLS = movies.find(item => item.id === movie.id);

  if (isMovieInLS) {
    movies = movies.filter(item => item.id !== movie.id);
  } else {
    movies.push(movie);
  }

  localStorage.setItem(key, JSON.stringify(movies));
}

function checkPlace(btn) {
  return libraryBtn.classList.contains('active') && btn.classList.contains('is-active');
}

function toggleBtn(key) {
  const classActive = 'modal__btn--active';
  const btn = document.querySelector(`.js-modal-${key}`);

  if (btn.classList.contains(classActive)) {
    btn.classList.remove(classActive);
    btn.textContent = 'add to ' + key;
    return;
  }

  btn.classList.add(classActive);
  btn.textContent = 'remove from ' + key;
}
