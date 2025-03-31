// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Import required Firebase services

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdqSxwDZwHmYtGrIPsyx8NLgBlq008RXI",
  authDomain: "dsa-visualiser.firebaseapp.com",
  projectId: "dsa-visualiser",
  storageBucket: "dsa-visualiser.firebasestorage.app",
  messagingSenderId: "570277648698",
  appId: "1:570277648698:web:11e2ba5a7c63ef65ff9803",
  measurementId: "G-T1GL9CT51V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  // Initialize Firebase
const auth = getAuth(app);  // Initialize Firebase Authentication

export { auth, GoogleAuthProvider, signInWithPopup };  // Export these services to use them elsewhere