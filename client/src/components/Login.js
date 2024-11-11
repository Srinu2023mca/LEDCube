import React, { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const Login = () => {
  const [email, setEmail] = useState("vemulasrinu104@gmail.com");
  const [password, setPassword] = useState("Srinu53@");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post("api/auth/login", { email, password });
      // console.log(response)
      setLoading(false);

      if(response.status===200){
        swal("Your account LogIn Success!", {
          icon: "success",
        });
        navigate("/");

      }else{
        setError(response?.data?.message)
      }
      
    } catch (err) {
      setLoading(true);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
     
      <form onSubmit={handleSubmit} className="form">
      <h2 className="mb-3 text-primary">LOGIN</h2>
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
        
        
        <button type="submit" className="btn btn-primary w-50">
        {loading ? <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span> : 'LogIn'}
        </button>
      </form>
    </div>
  );
};

export default Login;
