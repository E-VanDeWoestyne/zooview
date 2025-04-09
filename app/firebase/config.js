import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtNvMTFwN9AtZNof9jGfbPhiRU-Qve2PE",
  authDomain: "zooview-5d44b.firebaseapp.com",
  projectId: "zooview-5d44b",
  storageBucket: "zooview-5d44b.firebasestorage.app",
  messagingSenderId: "252617031387",
  appId: "1:252617031387:web:54b5fbfe44a8be829a16fe",
  measurementId: "G-9Z0JCZN8JJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
