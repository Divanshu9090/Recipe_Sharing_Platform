// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqoajetWZTwt9k2xXdxcSZqCSumgNeP4g",
  authDomain: "recipe-76527.firebaseapp.com",
  projectId: "recipe-76527",
  storageBucket: "recipe-76527.appspot.com",
  messagingSenderId: "969061166306",
  appId: "1:969061166306:web:2158e82726f90b17a4c2bb",
  measurementId: "G-6RV5156LZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;