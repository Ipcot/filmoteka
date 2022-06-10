import MoviesAPI from '../services/movies-api';
import renderMarkup from '../utils/render-markup';
import { resetTotalHits } from '../pagination';

const moviesAPI = new MoviesAPI();

const homeBtn = document.querySelectorAll('[data-page="home"]');
console.log(homeBtn);
homeBtn.forEach(btn => btn.addEventListener('click', () => getPopular(1)));

const getPopular = (page = 1) => {
  moviesAPI.fetchPopularMovies(page).then(({ results, total_results }) => {
    renderMarkup(results);
    if (page === 1) {
      resetTotalHits(total_results);
    }
  });
};

export default getPopular;
