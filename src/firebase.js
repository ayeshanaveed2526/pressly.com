// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1gOa54w6v3_S3-oxHL48RFDmzgLLUKpY",
  authDomain: "prey-133dc.firebaseapp.com",
  projectId: "prey-133dc",
  storageBucket: "prey-133dc.firebasestorage.app",
  messagingSenderId: "520569846687",
  appId: "1:520569846687:web:ef9d48cee6e6b77fb41baa",
  measurementId: "G-1TD0CJTKFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };