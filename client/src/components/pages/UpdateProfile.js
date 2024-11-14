import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from "../../app/features/authSlice";
import { useUpdateProfileMutation } from "../../app/service/usersApiSlice";

const UpdateProfile = () => {
  const [name,setName] = useState("")
  const [email, setEmail] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.userInfo);
//   console.log(user)

useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProfile({ name, email }).unwrap();
      console.log(response)
      if(response.status==="success"){
        dispatch(setCredentials(response.user));
      swal("Profile updated successfully!", {
        icon: "success",
      });
      }
      
    //   navigate("/");
    } catch (err) {
      swal("warning","Profile not Updated",{icon:"warning"})
    }
  };

  return (
    <div className="login-container ">
      <div className="form-container">
     
      <form onSubmit={handleSubmit} className="form w-100">
      <h2 className="mb-3 text-primary">Profile</h2>
      
      <div className="form-group d-flex align-items-center justify-content-between  w-100">
        <label className="form-label w-25">Name:</label>
        <input
          type="text"
          placeholder="Enter Profile name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
        />
      </div>

      <div className="form-group d-flex align-items-center justify-content-between w-100">
        <label className="form-label w-25">Email:</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
        />
      </div>
      
        
        
        <button type="submit" className="btn btn-primary w-50">
        {isLoading ? <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span> : 'Update'}
        </button>
      </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
