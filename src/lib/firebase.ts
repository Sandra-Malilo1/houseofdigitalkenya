// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABskHpYTM7YFeh1eJXCGjXruG6AqRjkTA",
  authDomain: "webloom-contact.firebaseapp.com",
  projectId: "webloom-contact",
  storageBucket: "webloom-contact.firebasestorage.app",
  messagingSenderId: "900809051507",
  appId: "1:900809051507:web:c487be03469addfd628906",
  measurementId: "G-R0F767FRRF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (to save messages)
export const db = getFirestore(app);
