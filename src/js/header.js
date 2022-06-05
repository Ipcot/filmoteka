export const refs = {
  conteinerHeader: document.querySelector('.header__container'),
  btnsLibs: document.querySelectorAll('.library-menu__button'),
  navMenu: document.querySelector('.navigation__menu'),
  navLinks: document.querySelectorAll('.navigation__link'),
  homeLink: document.querySelector('[init]'),
  switchLinkRefs: document.querySelectorAll('[data-action="switch-page"]'),
  rootControl: document.querySelector('.search-conteiner'),
  searchForm: document.querySelector('[data-root="search-form"]'),
  refLibsSelect: document.querySelector('[data-root="library-buttons"]'),
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

  conteinerHeader.classList.add('header__container_library');
  conteinerHeader.classList.remove('header__container_home');

  localStorage.setItem('page', 'library');

  showLibSelector();
};

// -----------initHome-----------//

const initHome = () => {
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

  const {
    elements: { searchQuery },
  } = e.target;

  const query = searchQuery.value.trim();

  console.log(query);

  e.target.reset();
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
