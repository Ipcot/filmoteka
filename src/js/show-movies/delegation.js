import onOpenModal from '../modal';

const refs = {
  collection: document.querySelector('.js-collection'),
};

refs.collection.addEventListener('click', onMovieClick);

function onMovieClick(e) {
  if (e.target === e.currentTarget) {
    return;
  }

  const movieID = e.target.dataset.id;
  onOpenModal(movieID);
}
