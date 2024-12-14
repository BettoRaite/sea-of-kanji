import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  collection,
  connectFirestoreEmulator,
  getFirestore,
} from "firebase/firestore";

const ENV = process.env.NEXT_ENV;

const firebaseConfig = {
  apiKey: "AIzaSyDWf4BLhYduWTH-kMr7w_T7sLpUX3goBFQ",
  authDomain: "blogging-api-c7cc6.firebaseapp.com",
  projectId: "blogging-api-c7cc6",
  storageBucket: "blogging-api-c7cc6.firebasestorage.app",
  messagingSenderId: "760098660193",
  appId: "1:760098660193:web:bb42f10fc36e50190def20",
  measurementId: "G-3TLZSYS02K",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const wordCollectionsRef = collection(db, "wordCollections");

if (ENV !== "PROD") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}
