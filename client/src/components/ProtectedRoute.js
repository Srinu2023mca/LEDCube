// ProtectedRoute.js
import React,{useState,useEffect} from "react";
import { Navigate} from "react-router-dom";
import HamsterWheel from "../components/LoadingHamster/index";
import { useGetUserMutation } from "../app/service/usersApiSlice";

import { useSelector,useDispatch } from 'react-redux'
import { setCredentials } from '../app/features/authSlice';

const ProtectedRoute = ({ children }) => {
  const [loading,setLoading] = useState(true)

  const dispatch =useDispatch()

  const { isAuthenticated } =  useSelector((state) => state.auth)
  
  const [getUser] = useGetUserMutation()

  // console.log(isAuthenticated , loading);

  useEffect(()=>{
    
    const fetchUserData = async()=>{
      // setLoading(true)

      if(!isAuthenticated){
    try{
      
        const response =await getUser().unwrap();
        // console.log(response)
        if(response?.status==='success'){
          dispatch(setCredentials(response.user))
        }
        
        else{
          console.log("User Not Verified")
        }
        
      }catch(error){
        console.log("Error",error)
      }
    }
    setLoading(false)
  }

    fetchUserData()
  },[isAuthenticated,dispatch,getUser])

  if(loading){
    return <>
    <HamsterWheel/>
    </>
  }

  

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
