import MoviesAPI from './movies-api';

// Делаем instance класса
const moviesAPI = new MoviesAPI();

// Ищем по запросу:
moviesAPI.setSearchQuery('soul'); // установить запрос
moviesAPI.fetchMoviesWithQuery(4); // ищем нужную страницу (defaut = 1)

// Ищем популярное:
moviesAPI.fetchPopularMovies(); // default = 1 страница
moviesAPI.fetchPopularMovies(7); // ищем нужную страницу

// Ищем по id:
moviesAPI.fetchMovieDetails(453395);

// Пример объекта, который возвращает промис 1 или 2 функции:
moviesAPI.fetchMoviesWithQuery(5).then(console.log);

// Пример объекта, который возвращает промис 3 функции:
moviesAPI.fetchMovieDetails(361743).then(console.log);
