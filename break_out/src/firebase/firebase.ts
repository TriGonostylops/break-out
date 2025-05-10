import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAu5lMMsGoko3_OZAL5etpn3ZV52iy5fQ0",
    authDomain: "escape-a27b5.firebaseapp.com",
    projectId: "escape-a27b5",
    storageBucket: "escape-a27b5.firebasestorage.app",
    messagingSenderId: "108808134392",
    appId: "1:108808134392:web:67842efcefcb017b69250d"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
