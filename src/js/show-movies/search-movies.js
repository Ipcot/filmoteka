import MoviesAPI from '../services/movies-api';
import renderMarkup from '../utils/render-markup';

const moviesAPI = new MoviesAPI();

const searchMovies = query => {
  moviesAPI.setSearchQuery(query);
  getSearched();
};

export function getSearched(page = 1) {
  moviesAPI.fetchMoviesWithQuery(page).then(({ results }) => renderMarkup(results));
}

export default searchMovies;
