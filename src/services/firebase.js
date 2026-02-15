import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCeaGfeGxYj3YeLQw9TM6JoLhmBLL-5lZw",
  authDomain: "hackathon-15-2-2026.firebaseapp.com",
  projectId: "hackathon-15-2-2026",
  storageBucket: "hackathon-15-2-2026.firebasestorage.app",
  messagingSenderId: "1067871449633",
  appId: "1:1067871449633:web:3dff9c88ebc296ecdb2960",
  measurementId: "G-2D1F44XZTX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
