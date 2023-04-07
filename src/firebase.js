import { api } from "./api";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: api,
    authDomain: "jo-369.firebaseapp.com",
    projectId: "jo-369",
    storageBucket: "jo-369.appspot.com",
    messagingSenderId: "80482138636",
    appId: "1:80482138636:web:f85fb85e095c2dde048c29"
};

// const firebaseConfig = {
//     apiKey: "AIzaSyAgWutJGf9RgouJT9KGQZOC_0yJaT38ht4",
//     authDomain: "jotest-369.firebaseapp.com",
//     projectId: "jotest-369",
//     storageBucket: "jotest-369.appspot.com",
//     messagingSenderId: "283191561111",
//     appId: "1:283191561111:web:db0e6e8658bd03f016d2d2"
//   };


firebase.initializeApp(firebaseConfig)

export default firebase.auth()
