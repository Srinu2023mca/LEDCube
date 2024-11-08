import React from "react";
import { NavLink } from "react-router-dom";
import swal from 'sweetalert';
import axios from "../axios";
import { useNavigate } from "react-router-dom";
const Header = () => {

  const navigate =useNavigate()

  const handleLogout=()=>{
    swal({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      buttons: ["Cancel", "Logout"],
      dangerMode: true,
    }).then(async (willLogout) => {
      if (willLogout) {
        try {
          const response = await axios.get(`api/auth/logout`);
          console.log(response);
          swal("Logged out successfully!", {
            icon: "success",
          });
          navigate("/Login")

        } catch (error) {
          console.error('Error:', error);
          swal("Failed to Logout", {
            icon: "error",
          });
        }
      } else {
        swal("You are still logged in!");
      }
    });
    
  }
  return (
    <div className="header  d-flex align-items-center justify-content-between px-3">
      <div className="row  gap-3 p-3 align-items-center">
        <div className="col">
          <NavLink
            to="/"
            className={({ isActive }) => 
              isActive ? "text-decoration-none active-link btn btn-primary" : "text-decoration-none btn border-primary text-primary"
            }
          >
            Songs List
          </NavLink>
        </div>
        <div className="col">
          <NavLink
            to="/addSong"
            className={({ isActive }) => 
              isActive ? "text-decoration-none active-link btn btn-primary" : "text-decoration-none btn border-primary text-primary"
            }
          >
            Add Song
          </NavLink>
        </div>
      </div>
      <button className="btn border border-primary text-primary" onClick={handleLogout}>
        LogOut
      </button>
    </div>
  );
};

export default Header;
