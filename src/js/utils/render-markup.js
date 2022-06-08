import moviesPageTpl from '../../templates/moviesPage.hbs';
import dullImg from '../../img/poster.jpg';
import genresList from './genres.json';

const imgResource = 'https://image.tmdb.org/t/p/w300';

const moviesContainer = document.querySelector('.js-collection');

function renderMarkup(list) {
  const markup = list.map(item => moviesPageTpl(transformMovieData(item))).join('');
  moviesContainer.innerHTML = markup;
}

function transformMovieData(movie) {
  const { title, release_date, poster_path, vote_average, genre_ids, id } = movie;

  const genres = getGenreNames(genre_ids);
  const year = release_date.slice(0, 4);

  return {
    poster: poster_path ? imgResource + poster_path : dullImg,
    title,
    year,
    vote_average,
    genres,
    id,
  };
}

function getGenreNames(genreIds) {
  const genres = genreIds.map(genreId => {
    const currentGenre = genresList.find(genre => genre.id === genreId);
    return currentGenre.name;
  });

  if (genres.length <= 3) {
    return genres;
  }

  const genresSliced = genres.slice(0, 2);
  genresSliced.push('Other');

  return genresSliced;
}

export default renderMarkup;
