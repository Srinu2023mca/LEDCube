// ProtectedRoute.js
import React,{useEffect,useState} from "react";
import { Navigate } from "react-router-dom";
import axios from "../axios";
import HamsterWheel from "../components/LoadingHamster/index";

const ProtectedRoute = ({ children }) => {

  const [loading,setLoading] = useState(true)
  const [user,setUser] = useState(null)

  useEffect(()=>{
    const fetchUserData = async()=>{
    try{
      
        const response =await axios.get('api/auth/getMe');
        const data = await response.data;
        // console.log(response.data)
        if(data?.status==='success'){
          setLoading(false)
          setUser(data.user)
        }
        else{
          setLoading(false)
          console.log("User Not Verified")
        }
      }catch(error){
        console.log("Error",error)
        setUser(null); // Ensure user state is cleared on error
      }finally {
        setLoading(false); // Always update loading state
      }
    }

    fetchUserData()
  },[])


  if(loading){
    return <>
    <HamsterWheel/>
    </>
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
