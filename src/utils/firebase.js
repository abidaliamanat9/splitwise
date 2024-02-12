import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAgmASZD191IBpMBCr3YHA-F3Subp9t-8s",
  authDomain: "splitwise-aa18a.firebaseapp.com",
  projectId: "splitwise-aa18a",
  storageBucket: "splitwise-aa18a.appspot.com",
  messagingSenderId: "1086864912103",
  appId: "1:1086864912103:web:fe7af0b25d866db051bc42",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };
