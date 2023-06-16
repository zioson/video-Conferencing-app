// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkFnNU-hEKIr8fQCsTJhpyyv6k1pe0v4k",
  authDomain: "zoom-clone-9c130.firebaseapp.com",
  projectId: "zoom-clone-9c130",
  storageBucket: "zoom-clone-9c130.appspot.com",
  messagingSenderId: "280409282501",
  appId: "1:280409282501:web:096b037ef06128af395dac",
  measurementId: "G-HKD812LSET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app)
export const firebaseDb=getFirestore(app)


export const userRef = collection(firebaseDb,"users")