import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, onAuthStateChanged, updateProfile} from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage, uploadBytes,ref, getDownloadURL } from "firebase/storage";
import { useEffect,useState } from "react";


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
const storage = getStorage(app);
// provider.setCustomParameters({ prompt: 'select_account' });

export default async function signInWithGoogle(){
  const provider = new GoogleAuthProvider();
  const response = await signInWithPopup(auth, provider)
  console.log(response.user)
} ;
export function useAuth(){
  const[currentUser,setCurrentUser] = useState();
  useEffect(()=>{
    const authUser = onAuthStateChanged(auth,user => setCurrentUser(user));
    return authUser
  }, [])
  return currentUser
}
export{db,auth }

export async function upload(file, currentUser){
  const imagesRef = ref(storage, `images/${currentUser.uid}.jpg`);
  uploadBytes(imagesRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    console.log(snapshot)
    console.log(currentUser)
  });
  // console.log(response)
  // const photoURL = await getDownloadURL(imagesRef)
  alert("Uploaded file!")
  // updateProfile(currentUser,{photoURL:photoURL});
}