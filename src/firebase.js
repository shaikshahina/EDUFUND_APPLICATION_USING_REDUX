import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDBDrmvizysPqzojcgMvXv8mDNAussiLis",
  authDomain: "react-firebase-auth-33d2a.firebaseapp.com",
  projectId: "react-firebase-auth-33d2a",
  storageBucket: "react-firebase-auth-33d2a.appspot.com",
  messagingSenderId: "967128591643",
  appId: "1:967128591643:web:32c5834ba9e593b661b7be"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth };