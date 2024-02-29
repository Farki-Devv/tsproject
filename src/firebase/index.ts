import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBkIiMMZBOKpYKjuwdxUFVchXc_qvPw0-Y",
  authDomain: "gym-project-100e8.firebaseapp.com",
  projectId: "gym-project-100e8",
  storageBucket: "gym-project-100e8.appspot.com",
  messagingSenderId: "186288451283",
  appId: "1:186288451283:web:29362cba287b5c9d3fee26"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const db = getFirestore(app)

export { auth ,  db}
