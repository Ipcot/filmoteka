const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '0d3c19a06e728eab3e881b744ba766c6';

class MoviesAPI {
  #searchQuery;

  constructor() {
    this.#searchQuery = '';
  }

  async fetchPopularMovies(page = 1) {
    const pathname = '/trending/movie/week';
    const params = new URLSearchParams({
      api_key: API_KEY,
      page,
    });

    const url = `${BASE_URL}${pathname}?${params}`;
    const response = await fetch(url);
    const data = await this.#parseWithErrorHandling(response);
    return data;
  }

  async fetchMoviesWithQuery(page = 1) {
    const pathname = '/search/movie';
    const params = new URLSearchParams({
      api_key: API_KEY,
      query: this.#searchQuery,
      page,
    });

    const url = `${BASE_URL}${pathname}?${params}`;

    const response = await fetch(url);
    const data = await this.#parseWithErrorHandling(response);
    return data;
  }

  async fetchMovieDetails(id) {
    const pathname = `/movie/${id}`;
    const params = new URLSearchParams({
      api_key: API_KEY,
    });

    const url = `${BASE_URL}${pathname}?${params}`;

    const response = await fetch(url);
    const data = await this.#parseWithErrorHandling(response);
    return data;
  }

  setSearchQuery(newSearchQuery) {
    this.#searchQuery = newSearchQuery;
  }

  #parseWithErrorHandling(response) {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  }
}

export default MoviesAPI;
