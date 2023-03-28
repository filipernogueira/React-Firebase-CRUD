import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBjBJQaHyTUpTYKRkzwOSO_Wawri2A-hc4",
    authDomain: "crud-react-app-11dc9.firebaseapp.com",
    projectId: "crud-react-app-11dc9",
    storageBucket: "crud-react-app-11dc9.appspot.com",
    messagingSenderId: "312312739685",
    appId: "1:312312739685:web:2d71ca72919b5f12e6138c"
};

const app = initializeApp(firebaseConfig);

// este comando não estava no site da firebase
export const db = getFirestore(app);