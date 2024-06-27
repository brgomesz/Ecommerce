// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVXj8ESh3NGLCF_ntt9GbIstx-dPWNajA",
  authDomain: "anajuceramica.firebaseapp.com",
  projectId: "anajuceramica",
  storageBucket: "anajuceramica.appspot.com",
  messagingSenderId: "83032628280",
  appId: "1:83032628280:web:6ca4a0c4e5152eb8709acd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)