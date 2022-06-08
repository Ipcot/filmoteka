import MoviesAPI from './movies-api';
import renderMarkup from '../utils/render-markup';
const myLibraryWatched = document.querySelector('.btn-library-watched');
const myLibraryQueue = document.querySelector('.btn-library-queue');
const myLibraryBtn = document.querySelector('[data-page="library"]');
const movieObjs = [];
const moviesAPI = new MoviesAPI();
const Array = [338953, 361743, 675353, 831946, 526896];

export default async function renderLibraryMarkup(movieIds) {
  await movieIds.forEach(async movieId => {
    fetchMovie(movieId);
  });

  async function fetchMovie(id) {
    moviesAPI.fetchMovieDetails(id).then(data => {
      console.log(data);
      movieObjs.push(data);
    });
  }
  renderMarkup(movieObjs);
}

myLibraryBtn.addEventListener('click', onMyLibraryClick);
myLibraryQueue.addEventListener('click', () => renderLsData('queue'));
myLibraryWatched.addEventListener('click', () => renderLsData('watched'));

function onMyLibraryClick() {
  renderLsData('watched');
}

function renderLsData(key) {
  const lsqData = localStorage.getItem(key);
  if (!lsqData) {
    return;
  }
  const lsqDataParsed = JSON.parse(lsqData);

  renderLibraryMarkup(lsqDataParsed);
}

// moviesAPI
//   .fetchMovieDetails(movieId)
//     .map(({ title, release_date, poster_path, id, vote_average, genres }) => {
//       const movie_genres = genres
//         .map(genre => genre.name)
//         .slice(0, 2)
//         .join(', ');
//       const releaseYear = new Date(release_date).getFullYear();
//       let poster = emptyImg;
//       if (poster_path) {
//         poster = `https://image.tmdb.org/t/p/w300${poster_path}`;
//       }
//       return { title, releaseYear, poster, id, vote_average, movie_genres };
//     });
//   const markup = normalizedMovies
//     .map(({ title, releaseYear, poster, id, vote_average, movie_genres }) => {
//       return `<div class="movies-card">
//             <img class="movies" src="https://image.tmdb.org/t/p/w300${poster}" data-id="${id}">
//             <p class="movies_name">
//               ${title}
//               <div class="movies_info">
//                 <span class="genres">${movie_genres} | ${releaseYear}</span>
//                 <span class="rating">${vote_average}</span>
//               </div>
//             </p></div>`;
//     })
//     .join('');
//   libraryGall.innerHTML = markup;
// }

// // import emptyImg from '../../img/blank.jpg';
// // import MoviesAPI from './services/movies-api';

// // const moviesAPI = new MoviesAPI();
// export default function renderLibraryMarkup(movArr) {
//   // const libraryGall = document.querySelector('.film-container');

//   const normalizedMovies = movArr.map(
//     ({ title, release_date, poster_path, id, vote_average, genres }) => {
//       const movie_genres = genres
//         .map(genre => genre.name)
//         .slice(0, 2)
//         .join(', ');
//       const releaseYear = new Date(release_date).getFullYear();
//       let poster = emptyImg;
//       if (poster_path) {
//         poster = `https://image.tmdb.org/t/p/w300${poster_path}`;
//       }
//       return { title, releaseYear, poster, id, vote_average, movie_genres };
//     },
//   );
//   const markup = normalizedMovies
//     .map(({ title, releaseYear, poster, id, vote_average, movie_genres }) => {
//       return `<div class="movies-card">
//       <img class="movies" src="https://image.tmdb.org/t/p/w300${poster}" data-id="${id}">
//       <p class="movies_name">
//         ${title}
//         <div class="movies_info">
//           <span class="genres">${movie_genres} | ${releaseYear}</span>
//           <span class="rating">${vote_average}</span>
//         </div>
//       </p></div>`;
//     })
//     .join('');
//   libraryGall.insertAdjacentHTML('beforeend', markup);
// }
