import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAn4JxkyWYqNa245GthAVpdwgNx749D7VE",
    authDomain: "byahero-b7022.firebaseapp.com",
    projectId: "byahero-b7022",
    storageBucket: "byahero-b7022.firebasestorage.app",
    messagingSenderId: "685430821662",
    appId: "1:685430821662:web:f710a3b300ef070260af0f",
    measurementId: "G-6185G899PZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Keep only if you use it

// Initialize and export Auth and methods
export const auth = getAuth(app);
export { onAuthStateChanged, signInWithEmailAndPassword, signOut };
