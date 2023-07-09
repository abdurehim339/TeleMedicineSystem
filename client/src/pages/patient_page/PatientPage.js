import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { PatientCardImage } from "./PatientProfile";
import BookingPage from "../../components/modals/createAppointment";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
//import { Rating} from "../../components/rating/rating"
import { AppointmentByPatient } from "../../components/appointment/Appointment";
import  AddScheduleModal  from "../../components/modals/AddScheduleModal";
//import { MeetingPage } from "../../components/video-meeting/meeting-page/meeting-page";
import { getPatientById } from "../../services/user_service";
//import {  getAllDoctors} from "../../services/user_service"
import DoctorList from "../../components/DoctorList"
//import cardList from "../../components/card_list/cardList"
import CardList from "./card_list/cardList";
import { getDoctorById } from "../../services/user_service";

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
  //faDisease,
  faKey,
  faUser,
  faSignOut,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";

import "./PatientPage.scss";
import EventBus from "../../common/event_bus";
import { logout } from "../../slices/auth_slice";
import { Navigate } from "react-router-dom";
import ChangePasswordModal from "../../components/modals/ChangePasswordModal";
import { AllDoctorPaginationWrapper } from "../../components/pagination/AllDoctorPaginationWrapper";
import axios from "axios";

//import { array } from "yup";

//import Edituser from "../../components/edit/EditUser";
//import Rating from "../../components/rating/rating";
const  BASE_URL=""
export const PatientPage = (doctorData) => {
//   const getAllDcotor = async () => {
//      return await axios
//       .get(BASE_URL + "/doctor/all", {
//         params: { role: "doctor" },
//       })
//       .then((response) => {
//          response.data.map((data) => console.log("from axios" + data));
  
//         return response.data.imgurl;
//       });
 // };
  
  console.log("hello"+doctorData)
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [patientData, setPatientData] = useState(null);
  const [totalAppointment, setTotalAppointment] = useState(0);
  const [loading, setloading] = useState(true);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const handleShowChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };
  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };
  const [showBookingPage, setshowBookingPage] = useState(false);
  const handlesetshowBookingPage = () => {
    setshowBookingPage(true);
  };
  const handleCloseBookingPage = () => {
    setshowBookingPage(false);
  };
  
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const handleShowAddScheduleModal= () => {
    setShowAddScheduleModal(true);
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
    const id = user.id;
    console.log("patientid"+id);
    
    getPatientById(id).then((response) => {
      console.log(response);
      if (mounted) {
        setloading(false);
        setPatientData(response);
      }
    });
    

    return function cleanup() {
      mounted = false;
    };
  }, [user.id]);
  console.log(patientData);

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
            className="mb- doctor-nav"
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
                  onClick={ handlesetshowBookingPage }
                  className="h5 py-4 text-light"
                >
                  <i className="fa-1x mx-2 text-white">
                    <FontAwesomeIcon icon={faUser} />
                  </i>
                 book-Appointment
                </Nav.Link>


                <Nav.Link
                onClick={() => {
                  const patientById = patientData; 
                  navigate("/patient/join-meeting");
                }}
                className="h5 py-4 text-light"
              >
                <i className="fa-1x mx-2 text-white">
                  <FontAwesomeIcon icon={faUser} />
                </i>
                Join Meeting
              </Nav.Link>
                    {/*<Link to="/patient/join-meeting">join Meeting</Link>*/}
                <Nav.Link
                  onClick={() => {
                    const patientById = patientData; 
                    navigate("/patient/profile/" + patientById.id, {
                      state: { patientById },
                    });
                    {console.log(patientById.id);}
                  }}
                  className="h5 py-4 text-light"
                >
                  <i className="fa-1x mx-2 text-white">
                    <FontAwesomeIcon icon={faUser} />
                  </i>
                  Profile
                </Nav.Link>
                  
      {/*<Link to="/patient/allDoctor">view allDoctors</Link>
                <Link to="/patient/prescription">view Prescription</Link>*/}
      {/*/ <Link to="/patient/editprofile">editprofile</Link>/*/}
                {/*<Nav.Link
                  href="/login"
                  className="h5 mx-1 mt-5"
                  onClick={logOut}
                >
                  <i className="fa-1x mx-2 text-white">
                    <FontAwesomeIcon icon={faSignOut} /> Logout
                  </i>
              </Nav.Link>*/}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Navbar>

          <Row className="mx-2 bg-light text-dark">
            <Col lg={3} md={3} sm={12}>
              <PatientCardImage patientById={patientData} />
            </Col>
            <Col sm={12} lg={9} md={9}>
              <div className="d-flex justify-content-between">
                {/*<h4>
                  Appointments <Badge bg="primary">{totalAppointment}</Badge>
            </h4>*/}
             
                {/*<Form className="d-flex"> 
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="my-2"
                    aria-label="Search"
                  />
                  <Button variant="success" className="mx-2 my-2">
                    Search
                  </Button>
            </Form>*/}
              </div>
            </Col>
          </Row>
          
        </>
      )}
      
     
      <BookingPage
        show={showBookingPage}
        handleClose={handleCloseBookingPage}
              />
      <ChangePasswordModal
        show={showChangePasswordModal}
        handleClose={handleCloseChangePasswordModal}
      />
      < AppointmentByPatient setTotalAppointment={setTotalAppointment}/>
      
    
      
      
      <CardList />
     
    </>
  );
  
}; 

export default PatientPage;
