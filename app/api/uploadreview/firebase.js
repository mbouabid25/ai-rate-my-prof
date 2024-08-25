// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaGWKRYiKGGPK_xG1Yz2oR8tte3wk4cm4",
  authDomain: "ai-ratemyprof-66207.firebaseapp.com",
  projectId: "ai-ratemyprof-66207",
  storageBucket: "ai-ratemyprof-66207.appspot.com",
  messagingSenderId: "446434155723",
  appId: "1:446434155723:web:3af577ee4c97bce8344f4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };