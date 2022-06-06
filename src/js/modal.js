import modalTpl from '../templates/modal.hbs';

import MoviesAPI from './services/movies-api';
const moviesAPI = new MoviesAPI();
const refs = {
    modal: document.querySelector('.js-modal'),
    modalOpen: document.querySelectorAll('.collection__item'),
    modalClose: document.querySelector('.js-modal-close'),
    backdrop: document.querySelector('.backdrop'),
}

refs.modalOpen.forEach(item => {
    item.addEventListener('click', onOpenModal);
});

export default function onOpenModal(id) {
    window.addEventListener('keydown', onEscKeyPress);
    refs.modal.classList.remove('backdrop--is-hidden');
    createModal(id);
 }

refs.modalClose.addEventListener('click', onCloseModal);

function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    refs.modal.classList.add('backdrop--is-hidden');
}

refs.backdrop.addEventListener('click', onBackdropClick);

function onBackdropClick(e) {
    if (e.currentTarget === e.target) {
        onCloseModal();
    }
}
function onEscKeyPress(e) {
    if (e.code === 'Escape') {
        onCloseModal();
    }
}

let movieId = 361745;

const picturePath = 'https://image.tmdb.org/t/p/w300';

function createModal() {
    moviesAPI.fetchMovieDetails(movieId).then(movieObj => {
    const { poster_path, title } = movieObj;
    console.log(picturePath + poster_path + title);
    const markup = modalTpl(movieObj);
    refs.modal.innerHTML = '';
    refs.modal.insertAdjacentHTML('afterbegin', markup);
})}

