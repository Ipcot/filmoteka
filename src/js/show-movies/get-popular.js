import MoviesAPI from '../services/movies-api';
import renderMarkup from '../utils/render-markup';
import { resetTotalHits } from '../pagination';

const moviesAPI = new MoviesAPI();

const getPopular = (page = 1) => {
 moviesAPI.fetchPopularMovies(page).then(({ results, total_results }) => {
   renderMarkup(results);
   resetTotalHits(total_results);
 });};

export default getPopular;
