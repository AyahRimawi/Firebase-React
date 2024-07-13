import { initializeApp } from "firebase/app";

// import { getAuth } from 'firebase/auth';
// import { GoogleAuthProvider } from "firebase/auth";
// import { signOut } from "firebase/auth";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";

// import { getFireStore } from "firebase/firestore";
// import { getDocs } from "firebase/firestore";
// import { collection } from "firebase/firestore";
// import { addDoc } from "firebase/firestore";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA42FpCHdt_lXBrQ4ujSFYR2Cu-Ehrvgx8",
  authDomain: "fir-course-8eab7.firebaseapp.com",
  projectId: "fir-course-8eab7",
  storageBucket: "fir-course-8eab7.appspot.com",
  messagingSenderId: "980641102522",
  appId: "1:980641102522:web:f6f939732f6aeeef6f6083",
  measurementId: "G-1JFKNM16MC",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signOut };
export const db = getFirestore(app);
export { getDocs };
export { collection };
export { addDoc };
