import getPopular from './get-popular';
// import { getSearched } from './search-movies';
// import onPageChange from '../pagination';

export default function showMovies(page) {
  getPopular(page);
}
