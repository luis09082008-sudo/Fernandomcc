import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBekVKPUlQ_tekKQZe_VRISmFLAmwflKyQ",
  authDomain: "app-financas-89241.firebaseapp.com",
  projectId: "app-financas-89241",
  storageBucket: "app-financas-89241.firebasestorage.app",
  messagingSenderId: "611271974198",
  appId: "1:611271974198:web:00303cd895793f051ea797",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();