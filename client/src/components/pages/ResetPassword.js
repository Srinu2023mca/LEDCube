import React, { useState } from "react";
import swal from 'sweetalert';
import { useResetMutation} from "../../app/service/usersApiSlice";
import { useParams,useNavigate } from "react-router-dom";
import HamsterWheel from "../LoadingHamster";

const ResetPassword = () => {
    const [password, setPassword] = useState("Srinu53@");
    const [conformPassword, setConformPassword] = useState("Srinu53@");
  const [error, setError] = useState("");

  const [Reset, { isLoading }] = useResetMutation()
  const {token} =useParams();
//   console.log(token)
const navigate =useNavigate();

  if(isLoading){
    return <>
    <HamsterWheel/>
    </>
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if(password!==conformPassword){
            setError("Password and Conform password are not same")
        }
      const response = await Reset({password,token}).unwrap();
      console.log(response)
      swal("Password reset is Success!", {
        icon: "success",
      });
      navigate("/login")

    } catch (err) {
      setError("Invalid Data");
    }
  };

  return (
    <div className="login-container ">
      <div className="form-container">
     
      <form onSubmit={handleSubmit} className="form w-100">
      <h2 className="mb-3 text-primary">Reset Password</h2>
      {error && <p className="error text-danger">{error}</p>}
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
      <div className="form-group d-flex align-items-center justify-content-between  w-100">
        <label className="form-label w-25">Confirm Password:</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={conformPassword}
          onChange={(e) => setConformPassword(e.target.value)}
          className="form-control mb-2"
        />
      </div>
           
        <button type="submit" className="btn btn-primary w-50">
        {isLoading ? <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span> :<span>Send</span>}
        </button>
      </form>
      </div>
    </div>
  );
};

export default ResetPassword;
