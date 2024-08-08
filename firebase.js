import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDG1qC_sUI8G5jgM-c5LxU45vofggkp7KE",
    authDomain: "pos-system-991ad.firebaseapp.com",
    databaseURL: "https://pos-system-991ad-default-rtdb.firebaseio.com",
    projectId: "pos-system-991ad",
    storageBucket: "pos-system-991ad.appspot.com",
    messagingSenderId: "957715318948",
    appId: "1:957715318948:web:3077418a42b56b6acf3e31",
    measurementId: "G-ELR29228FN"
  };

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Database
const database = getDatabase(app);
const analytics = getAnalytics(app);

export { app, database };
