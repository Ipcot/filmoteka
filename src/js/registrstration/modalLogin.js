


let popup = document.getElementById('popup'),
    popupSign = document.getElementById('popupSign'),
    btnLogin = document.getElementById('btnM'),
    btnSign = document.getElementById('btnC'),
     close = document.getElementById('close'),
  btnCloseSign = document.getElementById('closeSign'),
  form = document.querySelector('.modal-body');


  
btnLogin.addEventListener('click', onclick);
btnSign.addEventListener('click', onclickSign);
btnCloseSign.addEventListener('click', onclickClose);


 function onclick() {
    popup.style.display = 'block';
    document.getElementById("overlay").style.display = "block";
}

  close.onclick = function () {
    popup.style.display = 'none';
    document.getElementById("overlay").style.display="none";		
}

function onclickSign() {
     popupSign.style.display = 'block';
    document.getElementById("overlay").style.display = "block";
}

function onclickClose() {
    popupSign.style.display = 'none';
    document.getElementById("overlay").style.display="none";		
}