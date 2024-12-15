import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBuDES51IFIceNP9LQLwv9VFwcioIAk1WE",
    authDomain: "chat-app-a75d3.firebaseapp.com",
    projectId: "chat-app-a75d3",
    storageBucket: "chat-app-a75d3.firebasestorage.app",
    messagingSenderId: "803683276632",
    appId: "1:803683276632:web:184b5f77b3acc93de8b72d"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };