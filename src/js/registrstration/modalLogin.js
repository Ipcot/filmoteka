


 let popup = document.getElementById('popup'),
  btnMod = document.getElementById('btnM'),
  close = document.getElementById('close'),
  form = document.querySelector('.modal-body');


btnMod.addEventListener('click', onclick);


 function onclick() {
    popup.style.display = 'block';
    document.getElementById("overlay").style.display = "block";
}

  close.onclick = function () {
    popup.style.display = 'none';
    document.getElementById("overlay").style.display="none";		
}