import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { useDispatch} from 'react-redux';
import { setCredentials } from "../../app/features/authSlice";
import { useUpdatePasswordMutation } from "../../app/service/usersApiSlice";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading,setLoading]=useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [update] = useUpdatePasswordMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await update({ currentPassword, newPassword }).unwrap();
      // console.log(response)
      if(response.status ==="success"){
        dispatch(setCredentials(response.data));
      swal("Your Password Updated Successfully!", {
        icon: "success",
      });
      navigate("/");
      }
      
    } catch (err) {
        swal("Warning","Your Enter current password is wrong",{icon:"warning"})
    } finally{
        setLoading(false)
    }
  };


  return (
    <div className="login-container ">
      <div className="form-container">
     
      <form onSubmit={handleSubmit} className="form w-100">
      <h2 className="mb-3 text-primary">Update Password</h2>
      <div className="form-group d-flex flex-column align-items-start justify-content-between w-100">
        <label className="form-label">Current Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="form-control mb-2"
          required
        />
      </div>
      <div className="form-group d-flex flex-column align-items-start justify-content-between  w-100">
        <label className="form-label ">New Password:</label>
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-control mb-2"
          required
        />
      </div>
        
        
        <button type="submit" className="btn btn-primary w-50 mt-2">
        {loading ? <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span> : 'Update'}
        </button>
      </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
