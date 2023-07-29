// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi5KLkwXQ8pmJ9hoi0GNKsJecxMjbdNII",
  authDomain: "removals-selfstrorage.firebaseapp.com",
  projectId: "removals-selfstrorage",
  storageBucket: "removals-selfstrorage.appspot.com",
  messagingSenderId: "827656648357",
  appId: "1:827656648357:web:dcf15ab52471c4c074bf4c",
  measurementId: "G-TXGF7M4TNT",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();

export { app, auth };
