// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKSGnfa0BjFDZ9BOHQeiXlIH1_u75IhzM",
  authDomain: "mealio-de315.firebaseapp.com",
  projectId: "mealio-de315",
  storageBucket: "mealio-de315.firebasestorage.app",
  messagingSenderId: "994701541972",
  appId: "1:994701541972:ios:a420efbf3ccba0834f63c1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
