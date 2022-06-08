(() => {
  const refs = {
    openMenuBtn: document.querySelector('[footer-button]'),
    closeMenuBtn: document.querySelector('[data-modal-team-close]'),
    Menu: document.querySelector('[data-modal-team ]'),
    bodyRef: document.querySelector('body'),
  };

  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);

  function toggleMenu() {
    refs.Menu.classList.toggle('is-hidden');
    refs.bodyRef.classList.toggle('no-scroll');
  }
})();
