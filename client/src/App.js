import { React, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/login/login";
//import Register from "./pages/signup/signup";

import Register from "./pages/signup/register";
import NoMatch from "./pages/no-match/no-match";
import AdminPage from "./pages/admin_page/admin_page";
import MeetingPage from "./components/video-meeting/meeting-page/meeting-page";

import * as process from "process";
import Home from "./pages/home";
// import Layout from "./components/layout/layout";
import "./App.scss";

import AddDoctorForm from "./pages/add_doctor/AddDoctor";
import DoctorPage from "./pages/doctor_page/DoctorPage";
import PatientPage from "./pages/patient_page/PatientPage" ;
import { AdminPrivateRoutes, DoctorPrivateRoutes,PatientPrivateRoutes } from "./utils/PrivateRoutes";
import DoctorProfile from "./pages/doctor_page/DoctorProfile";
import PatientProfile from "./pages/patient_page/PatientProfile";
import PredictDisease from "./pages/predict_disease/PredictDisease";
import AppointmentDetail from "./pages/doctor_page/AppointmentDetail";
import AddPrescriptionFrom from "./pages/doctor_page/AddPrescriptionForm";
import AppointmentModal from "./components/modals/createAppointment";
import Meeting from "./components/video-meeting/meeting-page/meeting-page";
import DoctorList from "./components/DoctorList"
import PatientList from "./components/PeatientList";
import Edituser from "./components/edit/EditUser";
import PrescriptionList from "./components/Prescription";

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const userInfo = {
    isLoggedIn: isLoggedIn,
  };
  useEffect(() => {
    window.process = {
      ...process,
    };
  }, []);
  return (
    <>
      {/* <Layout> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<AdminPrivateRoutes userInfo={userInfo} />}>
          <Route path="/admin/dashboard" element={<AdminPage />} />
          <Route path="/admin/doctor" element={<AddDoctorForm />} />
          <Route path="/admin/allDoctors" element={<DoctorList />} />
          <Route path="/admin/allPatient" element={<PatientList />} />
          <Route path="/admin/allPrescription" element={<PrescriptionList />} />
          <Route path="/admin/delete/patient/:id" element={<DoctorList/>} />
          <Route path="/admin/editUser/:id" element={<Edituser/>} />
          

        </Route>
        <Route element={<DoctorPrivateRoutes userInfo={userInfo} />}>
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/doctor/profile/:id" element={<DoctorProfile />} />
           <Route
            path="/doctor/appointment/:userId"
            element={<AppointmentDetail />}
          />
          <Route
            path="/doctor/prescription/:patientId"
            element={<AddPrescriptionFrom/>}
          />
          
          <Route path="/doctor/create-meeting" element={<Meeting />} />
          <Route path="/admin/allDoctors" element={<DoctorList />} />
        </Route>
        <Route element={<PatientPrivateRoutes userInfo={userInfo} />}>
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/patient/profile/:id" element={<PatientProfile />} />
        <Route path="/patient/book_appointment" element={<AppointmentModal/>} />
        <Route path="/patient/join-meeting" element={<Meeting />} />
        <Route path="/patient/allDoctor" element={<DoctorList />} />
        <Route path="/patient/prescription" element={<PrescriptionList />} />
        <Route path="/Patient/editprofile" element={<Edituser/>} />)

  </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/meeting" element={<MeetingPage />} />
       

        
        
        <Route path="*" element={<NoMatch />} />
      </Routes>
      {/* </Layout> */}
    </>
  );
};

export default App;
