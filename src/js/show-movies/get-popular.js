import MoviesAPI from '../services/movies-api';
import renderMarkup from '../utils/render-markup';

const moviesAPI = new MoviesAPI();

const getPopular = (page = 1) => {
  moviesAPI.fetchPopularMovies(page).then(({ results }) => renderMarkup(results));
};

export default getPopular;
