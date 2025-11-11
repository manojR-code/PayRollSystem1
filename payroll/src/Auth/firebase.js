// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(import.meta.env.VITE_FIREBASEKEY)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEKEY,
  authDomain: "voiceera-4275a.firebaseapp.com",
  projectId: "voiceera-4275a",
  storageBucket: "voiceera-4275a.firebasestorage.app",
  messagingSenderId: "267402750838",
  appId: "1:267402750838:web:296f94e384fc8ea16fe857",
  measurementId: "G-CD3NT3QCSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };