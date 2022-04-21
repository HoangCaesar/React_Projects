import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAqyG_HwWSwQ-h22jsYzlze_GCX6SFo-u0",
    authDomain: "instagram-cb8c9.firebaseapp.com",
    projectId: "instagram-cb8c9",
    storageBucket: "instagram-cb8c9.appspot.com",
    messagingSenderId: "144896950964",
    appId: "1:144896950964:web:59bfe87e1683142cef0de1",
    measurementId: "G-MYCYHRR81X"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
