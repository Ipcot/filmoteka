import MoviesAPI from '../services/movies-api';
import renderMarkup from '../utils/render-markup';
import { resetTotalHits } from '../pagination';

import showSpinner from '../utils/spinner';

const moviesAPI = new MoviesAPI();

const form = document.querySelector('#movie-search');
const homeBtn = document.querySelectorAll('[data-page="home"]');

homeBtn.forEach(btn =>
  btn.addEventListener('click', () => {
    getPopular(1);
    form.removeAttribute('data-touched');
  }),
);

const getPopular = (page = 1) => {
  showSpinner(true);
  moviesAPI
    .fetchPopularMovies(page)
    .then(({ results, total_results }) => {
      renderMarkup(results);
      if (page === 1) {
        resetTotalHits(total_results);
      }
    })
    .finally(() => showSpinner(false));
};

export default getPopular;
