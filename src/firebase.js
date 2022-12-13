import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDHNg5xsxgh4OSoaRTOeoibTe2qVUfG7_k",
  authDomain: "newmicroblog-eca05.firebaseapp.com",
  projectId: "newmicroblog-eca05",
  storageBucket: "newmicroblog-eca05.appspot.com",
  messagingSenderId: "814067894171",
  appId: "1:814067894171:web:c283dc6f3c80bd8f33033e"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export{db,auth}