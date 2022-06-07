const refs = {
  modal: document.querySelector('[data-modal]'),
  modalOpen: document.querySelector('[data-modal-open]'),
  modalClose: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('.backdrop'),
};

refs.modalOpen.addEventListener('click', onOpenModal);

function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress);
  refs.modal.classList.remove('backdrop--is-hidden');
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
