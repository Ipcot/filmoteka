import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = '0d3c19a06e728eab3e881b744ba766c6';

class MoviesAPI {
  #searchQuery;

  constructor() {
    this.#searchQuery = '';
  }

  async fetchPopularMovies(page = 1) {
    const pathname = '/trending/movie/week';
    const params = new URLSearchParams({
      page,
    });

    return this.#fetchData(pathname, params);
  }

  async fetchMoviesWithQuery(page = 1) {
    if (this.#searchQuery === '') {
      return;
    }

    const pathname = '/search/movie';
    const params = new URLSearchParams({
      query: this.#searchQuery,
      page,
    });

    return this.#fetchData(pathname, params);
  }

  async fetchMovieDetails(id) {
    const pathname = `/movie/${id}`;

    return this.#fetchData(pathname);
  }

  async #fetchData(pathname, params = new URLSearchParams()) {
    params.append('api_key', API_KEY);

    const response = axios.get(pathname, { params });
    const { data } = await response;
    return data;
  }

  setSearchQuery(newSearchQuery) {
    this.#searchQuery = newSearchQuery;
  }
}

export default MoviesAPI;
