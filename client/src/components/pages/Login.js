import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { useLoginMutation } from "../../app/service/usersApiSlice";
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from "../../app/features/authSlice";
import { useGetUserMutation } from "../../app/service/usersApiSlice";
import HamsterWheel
 from "../LoadingHamster";

const Login = () => {
  const [email, setEmail] = useState("vemulasrinu104@gmail.com");
  const [password, setPassword] = useState("Srinu53@");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  // console.log(isAuthenticated)

  const [login, { isLoading }] = useLoginMutation()
  const [getUser] = useGetUserMutation()

  useEffect(()=>{
    const fetchUserData = async()=>{
    try{
      
        const response =await getUser().unwrap();
        // console.log(response)
        if(response?.status==='success'){
          navigate('/')
        }
        else{
          console.log("User Not Verified")
        }
      }catch(error){
        console.log("Error",error)
      }
    }

    fetchUserData()
  },[navigate])

  if(isLoading){
    return <>
    <HamsterWheel/>
    </>
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }).unwrap();
      // console.log(response)
      dispatch(setCredentials(response.user));
      swal("Your account LogIn Success!", {
        icon: "success",
      });
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container ">
      <div className="form-container">
     
      <form onSubmit={handleSubmit} className="form w-100">
      <h2 className="mb-3 text-primary">LOGIN</h2>
      {error && <p className="error text-danger">{error}</p>}
      <div className="form-group d-flex align-items-center justify-content-between w-100">
        <label className="form-label w-25">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
        />
      </div>
      <div className="form-group d-flex align-items-center justify-content-between  w-100">
        <label className="form-label w-25">Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-2"
        />
      </div>
        
        
        <button type="submit" className="btn btn-primary px-5">
        {isLoading ? <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span> : 'LogIn'}
        </button>
      </form>
      <Link to={"/forgot"} className="text-decoration-none  w-100 mb-3 text-end pe-3">Forgot Password</Link>
      </div>
    </div>
  );
};

export default Login;
