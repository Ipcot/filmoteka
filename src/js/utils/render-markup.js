import moviesPageTpl from '../../templates/moviesPage.hbs';
import dullImg from '../../img/poster.jpg';
import genresList from '../data/genres.json';

const imgResource = 'https://image.tmdb.org/t/p/w300';

const moviesContainer = document.querySelector('.js-collection');

function renderMarkup(list, isLibrary) {
  const markup = list.map(item => moviesPageTpl(transformMovieData(item, isLibrary))).join('');
  moviesContainer.innerHTML = markup;
}

function transformMovieData(movie, isLibrary) {
  const { title, release_date, poster_path, vote_average: rating, id } = movie;

  const year = release_date ? release_date.slice(0, 4) : 'unknown';
  const poster = poster_path ? imgResource + poster_path : dullImg;
  const vote_average = isLibrary ? rating : null;
  const genres = isLibrary ? transformLibGenres(movie.genres) : getGenreNames(movie.genre_ids);

  return {
    poster,
    title,
    year,
    vote_average,
    genres,
    id,
  };
}

function transformLibGenres(genresList) {
  if (genresList.length === 0) {
    return ['unknown'];
  }

  const genres = genresList.map(genre => genre.name);
  return sliceGenresList(genres);
}

function getGenreNames(genreIds) {
  if (genreIds.length === 0) {
    return ['unknown'];
  }

  const genres = genreIds.map(genreId => {
    const currentGenre = genresList.find(genre => genre.id === genreId);
    return currentGenre.name;
  });

  return sliceGenresList(genres);
}

function sliceGenresList(genres) {
  if (genres.length <= 3) {
    return genres;
  }

  const genresSliced = genres.slice(0, 2);
  genresSliced.push('Other');

  return genresSliced;
}

export default renderMarkup;
