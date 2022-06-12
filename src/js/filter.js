import genres from './data/genres.json';
import filterTpl from '../templates/filter.hbs';
import searchWithFilter from './show-movies/showFiltered';

const filterPanel = document.querySelector('.js-filter-panel');
filterPanel.innerHTML = filterTpl(genres);

const refs = {
  filter: document.querySelector('.js-genres-filter'),
  closeFilterBtn: document.querySelector('.js-close-filter'),
  openFilterBtn: document.querySelector('.genre-filter__btn'),
};

refs.filter.addEventListener('submit', onFilterSubmit);
refs.openFilterBtn.addEventListener('click', showFilter);
refs.closeFilterBtn.addEventListener('click', hideFilter);

function onFilterSubmit(e) {
  e.preventDefault();

  const checked = e.currentTarget.querySelectorAll(':checked');
  const ids = [...checked].map(item => item.value);

  searchWithFilter(ids);
}

function showFilter() {
  filterPanel.classList.remove('visually-hidden');
}

function hideFilter() {
  filterPanel.classList.add('visually-hidden');
}
