// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyB0GRYmOqL-v5NCqO28rz2WfqPXyMy3eFU",
    authDomain: "reactchatapp26.firebaseapp.com",
    projectId: "reactchatapp26",
    storageBucket: "reactchatapp26.appspot.com",
    messagingSenderId: "881296215291",
    appId: "1:881296215291:web:a9101b8684d0aeaeb3745e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage() 