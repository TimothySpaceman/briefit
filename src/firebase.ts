import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBJEbj1ZIw_dsHXyrQRwHLAXojiAxUbMk4",
    authDomain: "briefit-e6569.firebaseapp.com",
    projectId: "briefit-e6569",
    storageBucket: "briefit-e6569.firebasestorage.app",
    messagingSenderId: "603872851917",
    appId: "1:603872851917:web:c051a716c9fbccbde2b684"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);