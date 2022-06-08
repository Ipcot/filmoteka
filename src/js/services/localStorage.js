// import renderLibraryMarkup from './render-library-markup';
// // import MoviesAPI from './services/movies-api';
// import Notiflix from 'notiflix';
// // const imgBlank = document.querySelector('.collection__item');
// const btnLibraryWatched = document.querySelector('.btn-library-watched');
// const btnLibraryQueue = document.querySelector('.btn-library-queue');
// const libraryGall = document.querySelector('.film-container');

// // const moviesAPI = new MoviesAPI();
// const refs = {
//   gallery: document.querySelector('.film-container'),
//   closeModalBtn: document.querySelector('.js-modal-close'),
//   modal: document.querySelector('.js-modal'),
//   body: document.querySelector('body'),
//   backdrop: document.querySelector('.backdrop'),
// };

// btnLibraryWatched.addEventListener('click', ev => {
//   btnLibraryQueue.dataset.check = 'notok';
//   toogleBtnsLibrary(btnLibraryWatched, btnLibraryQueue);
//   libraryGall.innerHTML = '';
//   renderWatchedMovies();
//   // Notiflix.Notify.info('Hooray! You have some movies in collection.');
// });

// btnLibraryQueue.addEventListener('click', ev => {
//   btnLibraryQueue.dataset.check = 'ok';
//   toogleBtnsLibrary(btnLibraryQueue, btnLibraryWatched);
//   btnLibraryWatched.classList.add('is-active');
//   libraryGall.innerHTML = '';
//   renderQueueMovies();
// });

// // Достаем инфу из LocalStorage по фильмам "WATCHED"
// function renderWatchedMovies() {
//   const getMoviesFromWatched = () => JSON.parse(localStorage.getItem('WATCHED')) || [];
//   const watchedArr = getMoviesFromWatched();

//   if (watchedArr.length === 0) {
//     libraryGall.innerHTML = '';
//     imgBlank.classList.remove('blank-img');
//   } else imgBlank.classList.add('blank-img');

//   if (watchedArr.length === 0) {
//     return Notiflix.Notify.failure('No watched movies in your library.');
//   } else {
//     Notiflix.Notify.info(`Hooray! You have ${watchedArr.length} movies in collection.`);
//     renderLibraryMarkup(watchedArr);
//   }
// }

// // Достаем инфу из LocalStorage по фильмам "QUEUE"
// function renderQueueMovies() {
//   const getMoviesFromQueue = () => JSON.parse(localStorage.getItem('QUEUE')) || [];
//   const queuedArr = getMoviesFromQueue();
//   if (queuedArr.length === 0) {
//     libraryGall.innerHTML = '';
//     imgBlank.classList.remove('blank-img');
//   } else imgBlank.classList.add('blank-img');
//   if (queuedArr.length === 0) {
//     return Notiflix.Notify.failure('Please select movies in order to add to your queue');
//   } else {
//     Notiflix.Notify.info(`Hooray! You have ${queuedArr.length} movies in collection.`);
//     renderLibraryMarkup(queuedArr);
//   }
// }
// function toogleBtnsLibrary(btnLibraryQueue, btnLibraryWatched) {
//   btnLibraryQueue.classList.add('is-active');
//   btnLibraryWatched.classList.remove('is-active');
// }
