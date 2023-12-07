
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBpbFYoEq8S3WYuL8cXMt64LkmSqcfUYY",
  authDomain: "hotel-app-e99ae.firebaseapp.com",
  projectId: "hotel-app-e99ae",
  storageBucket: "hotel-app-e99ae.appspot.com",
  messagingSenderId: "362391621435",
  appId: "1:362391621435:web:af5d8713d7ae653092311e",
  measurementId: "G-NE32L00KGL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);

export { db, auth, storage, storageRef, collection, addDoc };

