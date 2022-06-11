import MoviesAPI from '../services/movies-api';
import renderMarkup from '../utils/render-markup';
import { resetTotalHits } from '../pagination';
import showSpinner from '../utils/spinner';

const moviesAPI = new MoviesAPI();

const form = document.querySelector('#movie-search');

const searchMovies = query => {
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
      if (page === 1) {
        resetTotalHits(total_results);
      }
    })
    .finally(() => showSpinner(false));
}

export default searchMovies;
