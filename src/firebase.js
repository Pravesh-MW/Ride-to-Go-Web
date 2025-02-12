// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore Database
import { getDatabase } from "firebase/database";   // Realtime Database
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCfziEATKxOW_kb9fDp9m0XubiXEVNGXUM",
  authDomain: "ride-to-go.firebaseapp.com",
  projectId: "ride-to-go",
  storageBucket: "ride-to-go.firebasestorage.app",
  messagingSenderId: "1094513937912",
  appId: "1:1094513937912:web:ed143a2815a378fdb75a0d",
  measurementId: "G-Y0HNTVDEJ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




// Initialize Firestore Database
const db = getFirestore(app);

// Initialize Realtime Database (if using)
const rtdb = getDatabase(app);

export { db, rtdb };
