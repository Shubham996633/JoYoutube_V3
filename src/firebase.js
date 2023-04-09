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
//   apiKey: api,
//   authDomain: "jo369-457d0.firebaseapp.com",
//   projectId: "jo369-457d0",
//   storageBucket: "jo369-457d0.appspot.com",
//   messagingSenderId: "705224312307",
//   appId: "1:705224312307:web:a62d01490f85d0f2c07e86"
// };


firebase.initializeApp(firebaseConfig)

export default firebase.auth()
