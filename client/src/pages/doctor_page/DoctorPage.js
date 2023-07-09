import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { DoctorCardImage } from "./DoctorProfile";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import AddPrescriptionModal from "../../components/modals/AddPrescriptionModal"
import { AppointmentByDoctor } from "../../components/appointment/Appointment";
import { getDoctorById } from "../../services/user_service";
//import AppointmentDetail from "./AppointmentDetail"
import {
  Offcanvas,
  Button,
  Navbar,
  Form,
  Table,
  Row,
  Badge,
  Col,
  Nav,
} from "react-bootstrap";
import {
  faBars,
  faHome,
  faDisease,
  faKey,
  faUser,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import "./DoctorPage.scss";
import EventBus from "../../common/event_bus";
import { logout } from "../../slices/auth_slice";
import { Navigate } from "react-router-dom";
import ChangePasswordModal from "../../components/modals/ChangePasswordModal";
const DoctorPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [doctorData, setDoctorData] = useState(null);
  const [totalAppointment, setTotalAppointment] = useState(0);
  const [loading, setloading] = useState(true);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const handleShowChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };
  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };
  const handleshowPrescriptionModal = () => {
    setShowPrescriptionModal(true);
  };
  const handleClosePrescriptionModal = () => {
    setShowPrescriptionModal(false);
  };
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

  useEffect(() => {
    let mounted = true;
    getDoctorById(user.id).then((response) => {
      if (mounted) {
        setloading(false);
        setDoctorData(response);
        //console.log(response);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, [user.id]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (!isLoggedIn) return <Navigate to="/" />;
  return (
    <>
      {" "}
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <Navbar
            style={{ backgroundColor: "#275091" }}
            className=""
          >
            <i className="fa-2x text-white mx-5">
              <FontAwesomeIcon icon={faBars} onClick={handleShow} />
            </i>
            <Navbar.Brand href="/">
              <h1 className="h1 text-green ">
                tele<span className="h2 text-yellow">medicine</span>
              <span className="h3 text-red">system</span>
                <NavLink className="anchor" to="/" onClick={logOut}>
                  <OverlayTrigger
                    delay={{ hide: 100, show: 0 }}
                    overlay={(props) => <Tooltip {...props}>Logout</Tooltip>}
                    placement="bottom"
                  >
                    <i>
                      <FontAwesomeIcon
                        icon={faSignOut}
                        style={{
                          color: "#fff",
                          position: "absolute",
                          right: "60",
                          top: "20",
                        }}
                      />
                    </i>
                  </OverlayTrigger>
                </NavLink>
              </h1>
            </Navbar.Brand>
            <Navbar.Offcanvas
              placement="start"
              show={show}
              onHide={handleClose}
              scroll
            >
              <Offcanvas.Header
                closeButton
                style={{ backgroundColor: "#275091" }}
              >
                <Offcanvas.Title className="text-light">Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <hr
                className="m-0 p-0"
                style={{ backgroundColor: "#275091" }}
              ></hr>
              <Offcanvas.Body
                className="py-4"
                style={{ backgroundColor: "#275091" }}
              >
                {/*<Nav.Link href="/" className="h5 py-2 text-light">
                  <i className="fa-1x mx-2 text-white">
                    <FontAwesomeIcon icon={faHome} />
                  </i>
                  Home
                      </Nav.Link>*/}
                <Nav.Link
                  onClick={handleShowChangePasswordModal}
                  className="h5 py-4 text-light"
                >
                  <i className="fa-1x mx-2 text-white">
                    <FontAwesomeIcon icon={faKey} />
                  </i>
                  Change Password
                </Nav.Link>
                <Nav.Link
                  onClick={handleshowPrescriptionModal}
                  className="h5 py-4 text-light"
                >
                <i className="fa-1x mx-2 text-white">
                <FontAwesomeIcon icon={faUser} />
              </i>
                  add-prescription
                </Nav.Link>

                <Nav.Link
                onClick={()=>{
                  navigate("/doctor/create-meeting")
                }}
                className="h5 py-4 text-light"
              >
              <i className="fa-1x mx-2 text-white">
              <FontAwesomeIcon icon={faUser} />
            </i>
                Create Meeting
              </Nav.Link>
                
                {/*<Nav.Link href="/" className="h5 py-2 text-light">
                <Link to="/doctor/create-meeting">Create Meeting</Link>
              </Nav.Link>*/}
              {/*/   <Nav.Link
              //   onClick={navigate ("/doctor/create-meeting")}
              //    className="h5 py-4 text-light"
              //  >
              //    <i className="fa-1x mx-2 text-white">
              //      <FontAwesomeIcon icon={faKey} />
              //    </i>
              //    Create Meeting
                      //  </Nav.Link>*/}
                <Nav.Link
                  onClick={() => {
                    const doctorById = doctorData;
                    navigate("/doctor/profile/" + doctorById.id, {
                      state: { doctorById },
                    });
                  }}
                  className="h5 py-4 text-light"
                >
                  <i className="fa-1x mx-2 text-white">
                    <FontAwesomeIcon icon={faUser} />
                  </i>
                  Profile
                </Nav.Link>
                {/*<Nav.Link
                  href="/login"
                  className="h5 mx-1 mt-5"
                  onClick={logOut}
                >
                  <i className="fa-1x mx-2 text-white">
                    <FontAwesomeIcon icon={faSignOut} /> Logout
                </i>
                </Nav.Link>
                */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Navbar>

          <Row className="mx-2 bg-light text-dark">
            <Col lg={3} md={3} sm={12}>
              <DoctorCardImage doctorById={doctorData} />
            </Col>
            <Col sm={12} lg={9} md={9}>
              <div className="d-flex justify-content-between">
                <h4>
                  Appointments <Badge bg="primary">{totalAppointment}</Badge>
                </h4>
                
                
              </div>
              <AppointmentByDoctor setTotalAppointment={setTotalAppointment} />
            </Col>
          </Row>
         
          
        </>
      )}
      <ChangePasswordModal
        show={showChangePasswordModal}
        handleClose={handleCloseChangePasswordModal}
      />
      <AddPrescriptionModal
        show={showPrescriptionModal}
        handleClose={handleClosePrescriptionModal }
      />
      

    </>
  );
};

export default DoctorPage;
