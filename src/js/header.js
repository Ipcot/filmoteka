import { showPagination } from './pagination';
import onGoToMyLibrary from './services/render-library-markup';
import searchMovies from './show-movies/search-movies';

export const refs = {
  body: document.querySelector('body'),
  conteinerHeader: document.querySelector('.header__container'),
  btnsLibs: document.querySelectorAll('.library-menu__button'),
  navMenu: document.querySelector('.navigation__menu'),
  navLinks: document.querySelectorAll('.navigation__link'),
  homeLink: document.querySelector('[init]'),
  switchLinkRefs: document.querySelectorAll('[data-action="switch-page"]'),
  rootControl: document.querySelector('.search-conteiner'),
  searchForm: document.querySelector('[data-root="search-form"]'),
  refLibsSelect: document.querySelector('[data-root="library-buttons"]'),
  switchTheme: document.querySelector('.switch-btn'),
  modal: document.querySelector('div .modal'),
  modalTeam: document.querySelector('.backdrop-container-team__content-team'),
  logoText: document.querySelector('.logo__text'),
  logoTextSpan: document.querySelector('.logo__text__span'),
};
//------------removeActive------------//

const removeActive = root =>
  root.querySelectorAll('.active').forEach(element => element.classList.remove('active'));

// -------lib----------//

const showLibSelector = () => {
  const { rootControl, refLibsSelect } = refs;
  removeActive(rootControl);

  refLibsSelect.classList.add('active');
};
// -------------home----------//

const showSearchForm = () => {
  const { rootControl, searchForm } = refs;
  removeActive(rootControl);

  searchForm.classList.add('active');
};

//---------initLab-----------//

const initLibrary = () => {
  const { conteinerHeader } = refs;
  showPagination(false);

  conteinerHeader.classList.add('header__container_library');
  conteinerHeader.classList.remove('header__container_home');

  localStorage.setItem('page', 'library');

  showLibSelector();
  onGoToMyLibrary();
};

// -----------initHome-----------//

const initHome = () => {
  showPagination(true);
  const { conteinerHeader } = refs;

  conteinerHeader.classList.remove('header__container_library');
  conteinerHeader.classList.add('header__container_home');

  localStorage.setItem('page', 'home');

  showSearchForm();
};
//-------------Listener---------//

const handleLink = e => {
  e.preventDefault();

  const link = e.currentTarget;
  const value = link.getAttribute('data-page');

  const { navMenu } = refs;
  removeActive(navMenu);

  navMenu.querySelector(`[data-page="${value}"]`).classList.add('active');

  if (value === 'home') initHome();
  if (value === 'library') initLibrary();
};
refs.switchLinkRefs.forEach(link => link.addEventListener('click', handleLink));

// -------libBtn----//

const handleLibType = e => {
  const { btnsLibs } = refs;
  const link = e.currentTarget;

  btnsLibs.forEach(element => element.classList.remove('is-active'));
  link.classList.add('is-active');
};

refs.btnsLibs.forEach(element => element.addEventListener('click', handleLibType));

const handleSearch = e => {
  e.preventDefault();

  const { searchQuery } = e.target.elements;

  const query = searchQuery.value.trim();

  searchMovies(query);

  // e.target.reset();
};

refs.searchForm.addEventListener('submit', handleSearch);

// -------------getLS------------//
const initPage = localStorage.getItem('page');

if (initPage) {
  if (initPage === 'home') initHome();
  if (initPage === 'library') initLibrary();

  refs.navLinks.forEach(link => {
    if (link.getAttribute('data-page') === initPage) link.classList.add('active');
    else link.classList.remove('active');
  });
} else {
  initHome();
  refs.homeLink.classList.add('active');
}

//---------------SWITCH THEME--------------//

const { body, switchTheme, modal, logoText, logoTextSpan } = refs;

const theme = {
  ORIGINALLY: 'originally-theme',
  PATRIOTIC: 'patriotic-theme',
};

const { ORIGINALLY, PATRIOTIC } = theme;

let currentTheme = localStorage.getItem('currentTheme');

if (!currentTheme) {
  currentTheme = ORIGINALLY;
  localStorage.setItem('currentTheme', ORIGINALLY);
} else {
  body.classList.add(currentTheme);
}

if (currentTheme === PATRIOTIC) {
  switchTheme.classList.add('switch-on');
  modal.classList.add('switch-on');
  // modalTeam.classList.add('switch-on');
  logoText.classList.add('patriotic__blu');
  logoTextSpan.classList.add('patriotic__yellow');
} else {
  switchTheme.classList.remove('switch-on');
  modal.classList.remove('switch-on');
  // modalTeam.classList.remove('switch-on');
  logoText.classList.remove('patriotic__blu');
  logoTextSpan.classList.remove('patriotic__yellow');
}

// switchTheme.click = currentTheme === ORIGINALLY ? false : true;

const changeTheme = () => {
  body.classList.toggle(PATRIOTIC);
  body.classList.toggle(ORIGINALLY);

  switchTheme.classList.toggle('switch-on');

  modal.classList.toggle('switch-on');
  // modalTeam.classList.toggle('switch-on');

  logoText.classList.toggle('patriotic__blu');
  logoTextSpan.classList.toggle('patriotic__yellow');

  localStorage.setItem('currentTheme', body.classList.contains(PATRIOTIC) ? PATRIOTIC : ORIGINALLY);
};

switchTheme.addEventListener('click', changeTheme);
