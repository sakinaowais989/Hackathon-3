import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBS4ocGa97uVQGPLZjK6oG9-iQuvg_SKdE",
  authDomain: "saylani-portal-c4eab.firebaseapp.com",
  projectId: "saylani-portal-c4eab",
  storageBucket: "saylani-portal-c4eab.appspot.com",
  messagingSenderId: "774535300852",
  appId: "1:774535300852:web:8aab94ffd811c62ef380a1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
