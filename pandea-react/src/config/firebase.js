import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHtQ0E74_tAyyFCoYrJNDLQqGb7U2DrS0",
  authDomain: "pandea-tienda.firebaseapp.com",
  projectId: "pandea-tienda",
  storageBucket: "pandea-tienda.firebasestorage.app",
  messagingSenderId: "1027160232171",
  appId: "1:1027160232171:web:8fe399396619b2e4702eae",
  measurementId: "G-NM1CRLQXG4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
