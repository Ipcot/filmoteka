import getPopular from './get-popular';
import { getSearched } from './search-movies';

const form = document.querySelector('#movie-search');

export default function showMovies(page) {
  window.scrollTo({
    top: 220,
    behavior: 'smooth',
  });

  if (form.dataset.touched) {
    return getSearched(page);
  }

  getPopular(page);
}

getPopular(1);
