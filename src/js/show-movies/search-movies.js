import MoviesAPI from '../services/movies-api';
import renderMarkup from '../utils/render-markup';
import { resetTotalHits } from '../pagination';
import showSpinner from '../utils/spinner';

const moviesAPI = new MoviesAPI();

const form = document.querySelector('#movie-search');
const dull = document.querySelector('.js-home-dull');
const moviesContainer = document.querySelector('.js-movies');

const searchMovies = query => {
  showHomeDull(false);
  form.setAttribute('data-touched', 'true');
  moviesAPI.setSearchQuery(query);
  getSearched(1);
};

export function getSearched(page = 1) {
  showSpinner(true);
  moviesAPI
    .fetchMoviesWithQuery(page)
    .then(({ results, total_results }) => {
      renderMarkup(results);
      results.length === 0 && showHomeDull(true);
      page === 1 && resetTotalHits(total_results);
    })
    .finally(() => showSpinner(false));
}

export function showHomeDull(isShown) {
  if (isShown) {
    moviesContainer.classList.add('visually-hidden');
    return dull.classList.remove('visually-hidden');
  }

  moviesContainer.classList.remove('visually-hidden');
  dull.classList.add('visually-hidden');
}

export default searchMovies;
