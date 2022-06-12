 import { initializeApp } from 'firebase/app';
import "firebase/auth";
import Notiflix from 'notiflix';
import { getAuth, signOut } from "firebase/auth";


  const firebaseConfig = {
  apiKey: "AIzaSyCEh-PhyLvp37s4JHs3nZxSzYF7eS7AZRg",
  authDomain: "my-project-4b6d5.firebaseapp.com",
  projectId: "my-project-4b6d5",
  storageBucket: "my-project-4b6d5.appspot.com",
  messagingSenderId: "913935347567",
  appId: "1:913935347567:web:09ad01b972720beed9429a",
  measurementId: "G-P5E25QHTXN"
};

const app = initializeApp(firebaseConfig);


const btnLogin = document.getElementById('btnM');
const btnSign = document.getElementById('btnC');
const btnExit = document.getElementById('btnB');
const myLibrary = document.querySelector('.library');
 

btnExit.addEventListener('click', onWebExit )

function onWebExit() {
   
const auth = getAuth(app);
signOut(auth).then(successExit).catch((error) => {
  Notiflix.Notify.failure(`${error.code}`)
  Notiflix.Notify.failure(`${error.message}`);
});
}


function successExit() { 
    Notiflix.Notify.success('Always waiting for us'); 
    myLibrary.classList.add('library-is-hidden');
    btnLogin.classList.remove('btn-is-hidden');
    btnSign.classList.remove('btn-is-hidden');
    btnExit.classList.add('btn-is-hidden');
} 
