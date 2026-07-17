import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDeu5ienCvHyl6J40UAqv_G1zo2R3GboLU",
  authDomain: "delegate-wallet-440c9.firebaseapp.com",
  projectId: "delegate-wallet-440c9",
  storageBucket: "delegate-wallet-440c9.firebasestorage.app",
  messagingSenderId: "689797205370",
  appId: "1:689797205370:web:8267120d2dee28a2715ac3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    onSnapshot
};