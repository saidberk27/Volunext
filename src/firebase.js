// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0B8n2Y4qjHoGdGdNNPbCyAg404DhDjOg",
    authDomain: "volunext.firebaseapp.com",
    projectId: "volunext",
    storageBucket: "volunext.firebasestorage.app",
    messagingSenderId: "978943727010",
    appId: "1:978943727010:web:488e34a44ebba170bb8efb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
