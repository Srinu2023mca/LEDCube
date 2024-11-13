import React from "react";
import { Link, NavLink } from "react-router-dom";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../app/service/usersApiSlice";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../app/features/authSlice";
const Header = () => {

  const [logOut] =useLogoutUserMutation();

  const navigate =useNavigate();
  const dispatch = useDispatch();

  const user =useSelector((state)=>state?.auth?.userInfo)
  // console.log(user)

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
           await logOut().unwrap();
          swal("Logged out successfully!", {
            icon: "success",
          });
          dispatch(logout());
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
      <nav className="navbar navbar-expand-lg w-50">
      <div className=" container-fluid"> 
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse dropdown-overlay w-100" id="navbarNav">
          <ul className="navbar-nav row w-75 mt-3 gap-2">
            <li className="nav-item  col"  >
            <NavLink
            to="/"
            className={({ isActive }) => 
              isActive ? "text-decoration-none active-link btn btn-primary w-75" : "text-decoration-none btn border-primary text-primary w-75"
            }
          >
            Songs List
          </NavLink>
            </li>
            <li className="nav-item col">
            <NavLink
            to="/addSong"
            className={({ isActive }) => 
              isActive ? "text-decoration-none active-link btn btn-primary w-75" : "text-decoration-none btn border-primary text-primary w-75"
            }
          >
            Add Song
          </NavLink>
            </li>
            <li className="nav-item col">
            <NavLink
            to="/cubes"
            className={({ isActive }) => 
              isActive ? "text-decoration-none active-link btn btn-primary w-75" : "text-decoration-none btn border-primary text-primary w-75"
            }
          >
            Cubes
          </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="dropdown-main">
      
      <button
        className="btn border border-primary"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="me-2"><i className="bi bi-person-circle"></i></span><span> {user?.name || "User name"}</span>
       
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li className="px-3">
        {user?.email || "User Email"}
        </li>
        <li>
          <Link to={"/updateEmail"} className="dropdown-item" >
            Profile Update
          </Link>
        </li>
        <li>
          <Link to={"/resetPassword"} className="dropdown-item" >
            Reset Password
          </Link>
        </li>
        <li>
        <div className="ms-3 btn btn-info w-50 text-white" onClick={handleLogout}>
        LogOut
      </div>
        </li>
      </ul>
    </div>
      
      
    </div>
  );
};

export default Header;
