import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCrdqgxDljhBpW0F0bdnctIu-Y2C_I3RE",
  authDomain: "crypto-news-e2d1b.firebaseapp.com",
  projectId: "crypto-news-e2d1b",
  storageBucket: "crypto-news-e2d1b.appspot.com",
  messagingSenderId: "887086736105",
  appId: "1:887086736105:web:640b503940ebdd0d1ec678",
  measurementId: "G-SMJRW2ZY6W",
};

const app = firebase.initializeApp(firebaseConfig);
export default app;

//export const auth = getAuth(app);
const auth = getAuth(app);
export { auth };
const db = getFirestore();
export { db };
