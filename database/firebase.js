import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCRjeOXhMEN0g6b_zX1iUcg4QJD6y09YUY",
  authDomain: "lab06andrade-25902.firebaseapp.com",
  projectId: "lab06andrade-25902",
  storageBucket: "lab06andrade-25902.appspot.com",
  messagingSenderId: "117305253212",
  appId: "1:117305253212:web:274063b9a333a316ad7599",
  measurementId: "G-F3HNWCFTYZ"
};

initializeApp(firebaseConfig);

export const database = getFirestore();