 import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
 import {signInWithPopup} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import "firebase/auth";
import Notiflix from 'notiflix';


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
    

const auth = getAuth(app);
const formDataSign = {};
let email = ''
let password = '';
const btnLogin = document.getElementById('btnM');
const btnSign = document.getElementById('btnC');
const btnExit = document.getElementById('btnB');
const btnGoogle = document.getElementById('btnG');
const myLibrary = document.querySelector('.library');
const form = document.querySelector('.modal-body-sign');

 form.addEventListener('submit', onFormSubmitSignIn);
 form.addEventListener('input', onFormInput);
 btnGoogle.addEventListener('click', onFormcoogle);

function onFormInput(e) {
    formDataSign[e.target.name] = e.target.value;
     email = formDataSign.email;
    password = formDataSign.password;

}

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user)
        btnLogin.classList.add('btn-is-hidden');
        btnSign.classList.add('btn-is-hidden');
        btnExit.classList.remove('btn-is-hidden');
        btnGoogle.classList.add('btn-is-hidden');

    }
    else {
        alert = 'no user';
    }
     
 });


function onFormSubmitSignIn(e) {
   
    e.preventDefault()
    e.target.reset();
    signInWithEmailAndPassword(auth, email, password).then(successSignIn).catch(function (error) {
        Notiflix.Notify.failure(`${error.code}`)
        Notiflix.Notify.failure(`${error.message}`);
    });
}

function successSignIn() { 
    Notiflix.Notify.success('Welcom in our site'); 
    popupSign.style.display = 'none';
    document.getElementById("overlay").style.display = "none";
    btnLogin.classList.add('btn-is-hidden');
    btnSign.classList.add('btn-is-hidden');
    myLibrary.classList.remove('library-is-hidden');
    btnGoogle.classList.add('btn-is-hidden');
    btnExit.classList.remove('btn-is-hidden');
   
} 


function onFormcoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        myLibrary.classList.remove('library-is-hidden');
        btnGoogle.classList.add('btn-is-hidden');
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

