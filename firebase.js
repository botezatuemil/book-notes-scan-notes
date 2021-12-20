import * as firebase from 'firebase/compat';
import "firebase/compat/firestore";
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCRQMqrwovMG-KT1eRbfEhu8YdDERzTh9Y",
    authDomain: "booknotes-ad0d7.firebaseapp.com",
    projectId: "booknotes-ad0d7",
    storageBucket: "booknotes-ad0d7.appspot.com",
    messagingSenderId: "959284811968",
    appId: "1:959284811968:web:2e509aaa57252ec634b525",
    measurementId: "G-S18HGQB6XZ"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}
else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {db, auth, provider, app};
