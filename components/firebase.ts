import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQuGRIUD-H6ud9eaNG-vfbTseHvL9O-oA",
  authDomain: "kubernetic-1f55a.firebaseapp.com",
  projectId: "kubernetic-1f55a",
  storageBucket: "kubernetic-1f55a.appspot.com",
  messagingSenderId: "16113786173",
  appId: "1:16113786173:web:fe80941820296912357954",
  measurementId: "G-2J7C38KCC1"
};

var db
if (!firebase.apps.length) {
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  db = firebaseApp.firestore();
} else {
  const firebaseApp = firebase.app()
  db = firebaseApp.firestore();
}

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;