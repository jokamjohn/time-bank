import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyBOc4Al2il7opa_i-uTKNQx8AcPMkQ_-Ys",
  authDomain: "timebank-ug.firebaseapp.com",
  databaseURL: "https://timebank-ug.firebaseio.com",
  projectId: "timebank-ug",
  storageBucket: "timebank-ug.appspot.com",
  messagingSenderId: "34209197167",
  appId: "1:34209197167:web:90697afb3c58526f7eb19a",
  measurementId: "G-VFPRKLBQC1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const db = firebase.firestore();

export const auth = firebase.auth();
