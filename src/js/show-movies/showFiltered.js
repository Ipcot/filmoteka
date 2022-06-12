import renderMarkup from '../utils/render-markup';
import { resetTotalHits } from '../pagination';
import MoviesAPI from '../services/movies-api';
import showSpinner from '../utils/spinner';

const moviesAPI = new MoviesAPI();

function searchWithFilter(genreIds) {
  moviesAPI.setFilter(genreIds);
  showFitered(1);
}

function showFitered(page = 1) {
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

// setTimeout(() => searchWithFilter([28, 12, 16]), 3000);

const filterBtn = document.querySelector('.genre-filter__btn');
 const filterModal = document.querySelector('.filter-modal');
 const filterClose = document.querySelector('.filter-close');
 const okBtn = document.querySelector('.filter-btn');

filterBtn.addEventListener('click', openFilterModal);
filterClose.addEventListener('click', closeFilterModal);

okBtn.addEventListener('click', () => {
  const selectedGenres = document.querySelectorAll('.custom-checkbox') ;
  const genreIds = Array.from(selectedGenres).map(genre => genre.dataset.id);
  showSpinner(true);
  setTimeout(() =>  searchWithFilter(genreIds), 1000);
  closeFilterModal();
}
);

function openFilterModal() {
  filterModal.classList.remove('is-hidden');

}

function closeFilterModal() {
  filterModal.classList.add('is-hidden');
}