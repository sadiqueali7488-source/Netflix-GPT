// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWMaKPWtesOGYeICljIUon2O__fxWNPfc",
  authDomain: "netflixgpt-3229a.firebaseapp.com",
  projectId: "netflixgpt-3229a",
  storageBucket: "netflixgpt-3229a.firebasestorage.app",
  messagingSenderId: "306931249934",
  appId: "1:306931249934:web:7bae598f20bcb57dbbdd5f",
  measurementId: "G-W1MDLNHXD6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
