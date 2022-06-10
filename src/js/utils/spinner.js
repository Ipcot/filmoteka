const loader = document.getElementById('preloader');

function showSpinner(isSpinnerVisible) {
  if (isSpinnerVisible) {
    loader.classList.add('visible');
    preloader.classList.remove('hidden');
    return;
  }

  loader.classList.add('hidden');
  preloader.classList.remove('visible');
}

export default showSpinner;
