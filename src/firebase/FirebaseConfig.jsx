// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0C83HhBDbqwUeW2r2kiQsbHrwiI_h9QM",

  authDomain: "e-commerce-4c049.firebaseapp.com",

  projectId: "e-commerce-4c049",

  storageBucket: "e-commerce-4c049.appspot.com",

  messagingSenderId: "580342381485",

  appId: "1:580342381485:web:9a2727e385392a2dbabf24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
