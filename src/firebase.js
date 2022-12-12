import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCPzEE7werBqT-743vGGys2Dq21QLnlSAk",
  authDomain: "shevamicro.firebaseapp.com",
  projectId: "shevamicro",
  storageBucket: "shevamicro.appspot.com",
  messagingSenderId: "861788363236",
  appId: "1:861788363236:web:89952184580df825200ff1",
  measurementId: "G-J4E0MNNHMQ"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{db}