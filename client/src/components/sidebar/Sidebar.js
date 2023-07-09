import React from "react";
import { HashLink } from "react-router-hash-link";
//import { Badge, message } from "antd";
import "./Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";
import {
  faBars,
  faHome,
  faUserDoctor,
  faUser,
  faDatabase,
  faSignOut,
  faMessage,
  faDisease,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import EventBus from "../../common/event_bus";
import { logout } from "../../slices/auth_slice";


const Sidebar = ({
  sidebarOpen,
  closeSidebar,
  handleShowDoctorModal,
  handleShowDiseaseModal,
  handleShowScheduleModal,
}) => {
 
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });
    return () => {
      EventBus.remove("logout");
    };
  });
  //const navigate=useNavigate();
  // const handleLogout = () => {
  //   //const navigate=useNavigate();
  //   localStorage.clear();
  //   message.success("Logout Successfully");
  //   navigate("/login");
  // };
  
  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-logo">
          <span className="h4 text-green">
           tele<span className="h4 text-yellow">medicine</span>
            <span className="h4 text-red">system</span>
          </span>
        </div>

        <i id="sidebarIcon">
          <FontAwesomeIcon icon={faBars} onClick={() => closeSidebar()} />
        </i>
      </div>
      <h6 className="mb-2 text-white">Amazing technology. Graceful care</h6>
      <div className="sidebar-menu">
        <div className="sidebar-link active-menu-link">
          <i>
            <FontAwesomeIcon icon={faHome} />
          </i>
          <NavLink to="# text-white">Dashboard</NavLink>
        </div>
        <h2 className="text-white h1">Contents</h2>
        <div className="sidebar-link">
          <Nav.Link className="anchor m-0 p-0" onClick={handleShowDoctorModal}>
            <i className="fa-1x">
              <FontAwesomeIcon icon={faUserDoctor} />
            </i>
            Add Doctor
          </Nav.Link>
        </div>
        
        <div className="sidebar-link">
          <i>
            <FontAwesomeIcon icon={faUserDoctor} />
          </i>
          <HashLink
            smooth
            to={window.location.pathname + "#allDoctor"}
            className="text-light"
          >
            Doctors
          </HashLink>
        </div>
        <div className="sidebar-link">
          <i>
            <FontAwesomeIcon icon={faUser} />
          </i>
          <HashLink
            smooth
            to={window.location.pathname + "#allPatient"}
            className="text-light"
          >
            Patients
          </HashLink>
        </div>
        <div className="sidebar-link">
          <i>
            <FontAwesomeIcon icon={faDatabase} />
          </i>
          <HashLink
            smooth
            to={window.location.pathname + "#allAppointment"}
            className="text-light"
          >
            Appointments
          </HashLink>
        </div>
        
        <div className="sidebar-link">
          <i>
            <FontAwesomeIcon icon={faUserDoctor} />
          </i>
          <HashLink
            smooth
            to={window.location.pathname + "#top"}
            className="text-light"
          >
            Top
          </HashLink>
        </div>
        <div className="sidebar-logout" >
          <i className="text-white">
            <FontAwesomeIcon icon={faSignOut} />
          </i>
          <NavLink
            className="anchor text-white"
            to="/admin/login"
            onClick={logOut}
          >
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
