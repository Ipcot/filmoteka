import genres from './data/genres.json';
import filterTpl from '../templates/filter.hbs';
import searchWithFilter from './show-movies/showFiltered';

const filterPanel = document.querySelector('.js-filter-panel');
filterPanel.innerHTML = filterTpl(genres);

const refs = {
  filter: document.querySelector('.js-genres-filter'),
  openFilterBtn: document.querySelector('.genre-filter__btn'),
};

refs.filter.addEventListener('submit', onFilterSubmit);
refs.openFilterBtn.addEventListener('click', toggleFilter);

function onFilterSubmit(e) {
  e.preventDefault();

  const checked = e.currentTarget.querySelectorAll(':checked');
  const ids = [...checked].map(item => item.value);

  searchWithFilter(ids);
}

function toggleFilter() {
  filterPanel.classList.toggle('visually-hidden');
}

export function hideFilter() {
  filterPanel.classList.add('visually-hidden');
}

export function showFilterBtn(isShown) {
  !isShown && refs.openFilterBtn.classList.add('visually-hidden');
  isShown && refs.openFilterBtn.classList.remove('visually-hidden');
}

export function resetFilter() {
  refs.filter.reset();
}
