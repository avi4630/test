import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBiyIVqqBUv_i1OD0MfGoZFX4S_SFFnTcY",
  authDomain: "avinash-mane.firebaseapp.com",
  databaseURL: "https://avinash-mane-default-rtdb.firebaseio.com",
  projectId: "avinash-mane",
  storageBucket: "avinash-mane.appspot.com",
  messagingSenderId: "627714163394",
  appId: "1:627714163394:web:8d40bb4dcd5bf5b602315b"
};

let fireBaseDb = firebase.initializeApp(firebaseConfig);

export default fireBaseDb.database().ref();
