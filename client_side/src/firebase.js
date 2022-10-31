// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyC9uKcZmZFeur-tx5ZPR1DpxPdvYKlt2g0",
    authDomain: "whatsapp-clone-baefc.firebaseapp.com",
    projectId: "whatsapp-clone-baefc",
    storageBucket: "whatsapp-clone-baefc.appspot.com",
    messagingSenderId: "825944090258",
    appId: "1:825944090258:web:68266782748cb5d494284b",
    measurementId: "G-SYB29J7FFT"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider();


  export {auth, db, provider};
  