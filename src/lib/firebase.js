import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-df911.firebaseapp.com",
  projectId: "reactchat-df911",
  storageBucket: "reactchat-df911.appspot.com",
  messagingSenderId: "1061085750986",
  appId: "1:1061085750986:web:717a5ba1438550b4cbb633"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()