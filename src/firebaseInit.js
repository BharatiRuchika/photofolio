// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAdZZnCIc8Abipclb8W0c_njzJ4hX1gpk",
  authDomain: "photofolio-add3e.firebaseapp.com",
  projectId: "photofolio-add3e",
  storageBucket: "photofolio-add3e.appspot.com",
  messagingSenderId: "548666604784",
  appId: "1:548666604784:web:73c34ac2ab700228ff9635",
  measurementId: "G-MP0JEWTVDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const db = getFirestore(app)