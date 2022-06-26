import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDKjI4vS3snDsbE7ajLJu0vimLPI4T74FE",
    authDomain: "mymovies-b6a33.firebaseapp.com",
    projectId: "mymovies-b6a33",
    storageBucket: "mymovies-b6a33.appspot.com",
    messagingSenderId: "901446639185",
    appId: "1:901446639185:web:bcc69a3986d252a9816270",
    measurementId: "G-TBG03E43MV"
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
