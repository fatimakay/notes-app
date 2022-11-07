import { initializeApp } from "firebase/app";
import {  getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDX5NzKTEksrB0q3X8v33pzBYlUkzg421s",
    authDomain: "memoed-73535.firebaseapp.com",
    databaseURL: "https://memoed-73535-default-rtdb.firebaseio.com",
    projectId: "memoed-73535",
    storageBucket: "memoed-73535.appspot.com",
    messagingSenderId: "166503567651",
    appId: "1:166503567651:web:8e48b0f7bad4e881113c96",
    measurementId: "G-Q9ZB5EPQZV"
  };
 
  const logout = () => {
    signOut(auth);
  };   
  
  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);


  export {
    auth,
    db,
    logout,
  };
 //  const app = initializeApp(firebaseConfig);
//export const auth =getAuth(app);
//export default app