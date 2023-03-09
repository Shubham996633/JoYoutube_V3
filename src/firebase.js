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
//     apiKey: api,
//     authDomain: "jotest-c964a.firebaseapp.com",
//     projectId: "jotest-c964a",
//     storageBucket: "jotest-c964a.appspot.com",
//     messagingSenderId: "843622392006",
//     appId: "1:843622392006:web:8cc5c02ca045d7779ff7c7"
// };



firebase.initializeApp(firebaseConfig)

export default firebase.auth()
