
import firebase from 'firebase/compat/app';
 
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyD1XeajU5Lvl48VFFwkd_mrsjDACmIvZMk",
  authDomain: "chat-reactjs-f493b.firebaseapp.com",
  databaseURL: "https://chat-reactjs-f493b-default-rtdb.firebaseio.com",
  projectId: "chat-reactjs-f493b",
  storageBucket: "chat-reactjs-f493b.appspot.com",
  messagingSenderId: "1005045536208",
  appId: "1:1005045536208:web:e55913b38c5f9a802f95d5",
  measurementId: "G-XEFLFQNQBN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
 

  const auth = firebase.auth();
  const db = firebase.firestore();


  if (window.location.hostname === 'localhost') {
    db.useEmulator('localhost', '8080') ;
    auth.useEmulator('http://localhost:9099'); 
 
  }
  

  export { db, auth };
  export default firebase;