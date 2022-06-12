import renderMarkup from '../utils/render-markup';
import { resetTotalHits } from '../pagination';
import MoviesAPI from '../services/movies-api';
import showSpinner from '../utils/spinner';

const moviesAPI = new MoviesAPI();

function searchWithFilter(genreIds) {
  moviesAPI.setFilter(genreIds);
  showFitered(1);
}

function showFitered(page) {
  showSpinner(true);
  moviesAPI
    .fetchFiteredMovies(page)
    .then(({ results, total_results }) => {
      renderMarkup(results);
      if (page === 1) {
        resetTotalHits(total_results);
      }
    })
    .finally(() => showSpinner(false));
}

export default searchWithFilter;
