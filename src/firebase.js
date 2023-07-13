import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBd1hFG4wcix-OiD3u3wL8pTNG-4Y9vT7A",
    authDomain: "library-management-5b383.firebaseapp.com",
    projectId: "library-management-5b383",
    storageBucket: "library-management-5b383.appspot.com",
    messagingSenderId: "357137298041",
    appId: "1:357137298041:web:305f3efd45fc57aaad1aa8",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };