// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxD9DEW_HKKXFPflaSMtLuK3GJSzzA39c",
  authDomain: "login-signup-app-d6a9b.firebaseapp.com",
  projectId: "login-signup-app-d6a9b",
  storageBucket: "login-signup-app-d6a9b.firebasestorage.app",
  messagingSenderId: "12425156636",
  appId: "1:12425156636:web:134f8d1fc1caa4474c67d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
