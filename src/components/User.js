import { auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import SomeContext from "../Context.js";
import { async } from "@firebase/util";
import { nanoid } from "nanoid";

export const useAuth=()=>{
    const[error,setError]=useState(null);
    const {isLoading,auth} = useContext(SomeContext)
    const [cancelled,setCancelled] = useState(false);
  

    function checkIfCancelled(){
        if (cancelled){
            return;
        }
    }
    const newUser = async(data)=>{
        checkIfCancelled();
        isLoading(true);
        setError(null);
        try{
            const {user}= await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
                
                
            )
            await updateProfile(user,{
                displayName:data.displayName
            });
            isLoading(false);
            return user;
        }catch(error){
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;
            if (error.message.includes('password')){
                systemErrorMessage = 'Password must contain at least 6 characters'
            }else if(error.message.includes('email-already')){
                systemErrorMessage = 'Email already used'
            } else{
                systemErrorMessage= 'Something went wrong, try again'
            } isLoading(false)
        setError(systemErrorMessage)          }
        }
        const login=async(data)=>{
            checkIfCancelled();
            isLoading(true);
            setError(false)
            try {
                await signInWithEmailAndPassword(auth,data.email,data.password);
                isLoading(false);
    
            } catch (error) {
                let systemErrorMessage;
                if(error.message.includes('user-not-found')){
                    systemErrorMessage = 'User does not exist'
                }else if(error.message.includes('wrong-password')){
                    systemErrorMessage = 'The password you typed is incorrect'
                } else{
                    systemErrorMessage= 'Something went wrong, try again' 
                }
                setError(systemErrorMessage);
                isLoading(false)
            }
        }
        useEffect(()=>{
            return ()=>setCancelled(true);
        },[]);

        const storage = getStorage();
        const upload = async (file,user,isLoading)=>{
            const fileRef = ref(storage, user.uid)
            isLoading(true);
            const snapshot = await uploadBytes(fileRef);
            const photoURL = await getDownloadURL(fileRef);
            updateProfile(user,{
                photoURL:photoURL,
            });
            isLoading(false);
        alert("Uploaded photo!")     
       }
       return {
        error,
        upload,
        // user
       }
    }
