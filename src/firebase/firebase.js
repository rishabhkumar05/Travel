// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0zFEXV0n79_SHegoLnkcEIefjuFbtKIc",
  authDomain: "travel-site-9b6df.firebaseapp.com",
  projectId: "travel-site-9b6df",
  storageBucket: "travel-site-9b6df.firebasestorage.app",
  messagingSenderId: "229490808104",
  appId: "1:229490808104:web:f41dc84f09d757a7f3ec1d",
  measurementId: "G-GT1ZLYJ13X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);