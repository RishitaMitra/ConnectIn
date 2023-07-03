//import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import 'firebase/firestore';

import 'firebase/compat/storage';
//import { storage } from 'firebase/storage';
//import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAjFSnETX2Uy8IsV2Rz3DJREfQSx0GR0Es",
    authDomain: "linkedin-clone-1d263.firebaseapp.com",
    projectId: "linkedin-clone-1d263",
    storageBucket: "linkedin-clone-1d263.appspot.com",
    messagingSenderId: "387075031259",
    appId: "1:387075031259:web:69fd05651c1adcc8550cfe"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
//const storage = getStorage(firebaseApp);
const storage = firebase.storage(); // Add this line
const storageRef = storage.ref();

export { db, auth, storage, storageRef };