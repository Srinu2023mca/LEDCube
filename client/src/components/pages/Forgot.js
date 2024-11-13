import React, { useState } from "react";
import swal from 'sweetalert';
import { useForgotMutation } from "../../app/service/usersApiSlice";

import HamsterWheel from "../LoadingHamster";

const Forgot = () => {
  const [email, setEmail] = useState("vemulasrinu104@gmail.com");
  const [error, setError] = useState("");

  const [forgot, { isLoading }] = useForgotMutation()

  if(isLoading){
    return <>
    <HamsterWheel/>
    </>
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgot({ email}).unwrap();
      console.log(response)
      swal("Link sent to your Email is Success!", {
        icon: "success",
      });
    } catch (err) {
      setError("Invalid Email");
    }
  };

  return (
    <div className="login-container ">
      <div className="form-container">
     
      <form onSubmit={handleSubmit} className="form w-100">
      <h2 className="mb-3 text-primary">Forgot Password</h2>
      {error && <p className="error">{error}</p>}
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
           
        <button type="submit" className="btn btn-primary w-50">
        {isLoading ? <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span> :<span>Send</span>}
        </button>
      </form>
      </div>
    </div>
  );
};

export default Forgot;
