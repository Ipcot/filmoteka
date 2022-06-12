let watchedMovies = [];
let queueMovies = [];

export function addMovieIdToLocalStorage(key, movieId) {
  if (!localStorage.getItem(key)) {
    watchedMovies.push(movieId);
    localStorage.setItem(key, JSON.stringify(watchedMovies));
    return;
  }
  watchedMovies = JSON.parse(localStorage.getItem(key));

  if (watchedMovies.includes(movieId)) {
    watchedMovies = JSON.parse(localStorage.getItem(key));
    watchedMovies = watchedMovies.filter(item => item !== movieId);
    localStorage.setItem(key, JSON.stringify(watchedMovies));
    return;
  }
  if (!watchedMovies.includes(movieId)) {
    watchedMovies = JSON.parse(localStorage.getItem(key));
    watchedMovies.push(movieId);
    localStorage.setItem(key, JSON.stringify(watchedMovies));
  }
}

export function addMovieToQueue(key, movieId) {
  if (!localStorage.getItem(key)) {
    queueMovies.push(movieId);
    localStorage.setItem(key, JSON.stringify(queueMovies));
    return;
  }

  queueMovies = JSON.parse(localStorage.getItem(key));

  if (queueMovies.includes(movieId)) {
    queueMovies = JSON.parse(localStorage.getItem(key));
    queueMovies = queueMovies.filter(item => item !== movieId);
    localStorage.setItem(key, JSON.stringify(queueMovies));
    return;
  }
  if (!queueMovies.includes(movieId)) {
    queueMovies = JSON.parse(localStorage.getItem(key));
    queueMovies.push(movieId);
    localStorage.setItem(key, JSON.stringify(queueMovies));
  }
}
