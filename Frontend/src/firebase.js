import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "you api key",
    authDomain: "raushan-social-media.firebaseapp.com",
    projectId: "raushan-social-media",
    storageBucket: "raushan-social-media.appspot.com",
    messagingSenderId: "your sender id",
    appId: "your api id",
    measurementId: "G9"
};

firebase.initializeApp(firebaseConfig)

export default firebase