// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQlaKc80yICtmIK89KBj6Z4kE_dEA8Vzo",
  authDomain: "eleven-psychics-3b304.firebaseapp.com",
  projectId: "eleven-psychics-3b304",
  storageBucket: "eleven-psychics-3b304.appspot.com",
  messagingSenderId: "1236434148",
  appId: "1:1236434148:web:80c6ab2d4dd7f7b65f40f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore();
export const storage = getStorage();
