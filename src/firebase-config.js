import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5CfeMfxyPrlJWEZYQqMSA5okfkOo8q1M",
  authDomain: "crypto-news2.firebaseapp.com",
  projectId: "crypto-news2",
  storageBucket: "crypto-news2.appspot.com",
  messagingSenderId: "958285231795",
  appId: "1:958285231795:web:5d7e426c8679d4826be2c6",
  measurementId: "G-CM6GJJ5HGE",
};

const app = firebase.initializeApp(firebaseConfig);
export default app;

//export const auth = getAuth(app);
const auth = getAuth(app);
export { auth };
const db = getFirestore();
export { db };
