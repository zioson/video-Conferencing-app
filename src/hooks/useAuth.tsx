import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../utils/FirebaseConfig';
import { setUser } from '../app/slices/AuthSlices';

const useAuth = () => {
const navigate = useNavigate();
const dispatch=useDispatch();
useEffect(() => {
  
     const unsubscribe=onAuthStateChanged(firebaseAuth,(curretUser)=>{
        console.log(curretUser)
        if(!curretUser) navigate("/login")
        else{
            dispatch(
                setUser(
                    {
                        uid:curretUser.uid,
                        email:curretUser.email,
                        name:curretUser.displayName,
                    }
                )
            )
        }
     })
     return ()=>{
        unsubscribe();
     }
  
}, [dispatch,navigate])

}

export default useAuth