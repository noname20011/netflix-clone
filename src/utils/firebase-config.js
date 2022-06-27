import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDKK-_SzscEOU6hREPqGb_3-hjdDE05mrc",
    authDomain: "netflix-db-react.firebaseapp.com",
    projectId: "netflix-db-react",
    storageBucket: "netflix-db-react.appspot.com",
    messagingSenderId: "541956481883",
    appId: "1:541956481883:web:ebf3c00d62a479bd3df07e",
    measurementId: "G-G6JXS7Q5GF"
};

const app = initializeApp(firebaseConfig);
export const  firebaseAuth = getAuth(app)