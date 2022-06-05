// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxwosphc_g70Twvo72zTeR16TMQeI921s",
    authDomain: "meme-dic.firebaseapp.com",
    projectId: "meme-dic",
    storageBucket: "meme-dic.appspot.com",
    messagingSenderId: "598278706275",
    appId: "1:598278706275:web:4f3bf1037be4673f239456",
    measurementId: "G-F4LC4Y6WDL"
  };

// initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//사용 안할 예정
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
