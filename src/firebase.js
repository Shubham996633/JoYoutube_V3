import { api } from "./api";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: api,
    authDomain: "jo-7b896.firebaseapp.com",
    projectId: "jo-7b896",
    storageBucket: "jo-7b896.appspot.com",
    messagingSenderId: "849657929493",
    appId: "1:849657929493:web:2f4ed59b204cb7560e531c",
    measurementId: "G-F0H03L5VK0"
};

firebase.initializeApp(firebaseConfig)

export default firebase.auth()