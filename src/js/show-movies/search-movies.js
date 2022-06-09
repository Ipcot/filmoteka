import MoviesAPI from '../services/movies-api';
import renderMarkup from '../utils/render-markup';
import { resetTotalHits } from '../pagination';

const moviesAPI = new MoviesAPI();

const searchMovies = query => {
  moviesAPI.setSearchQuery(query);
  getSearched(1);
};

export function getSearched(page = 1) {
  moviesAPI.fetchMoviesWithQuery(page).then(({ results, total_results }) => {
    renderMarkup(results);
    if (page === 1) {
      resetTotalHits(total_results);
    }
  });
}

export default searchMovies;
