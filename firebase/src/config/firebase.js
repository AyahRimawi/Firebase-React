import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

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
