import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGwtSUTJ_W9rO2QLcHWTfz76U9GOOPRi0",
  authDomain: "blogapp-48df7.firebaseapp.com",
  projectId: "blogapp-48df7",
  storageBucket: "blogapp-48df7.appspot.com",
  messagingSenderId: "621784057473",
  appId: "1:621784057473:web:46d83625f56dc39a5f6f80",
  measurementId: "G-83WW8FDH0W",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = () => getFirestore(app);
