import { useDispatch, useSelector} from "react-redux";
import {React,useEffect,useState} from 'react'
import { Table } from "react-bootstrap";
import { updateDoctorData } from "../slices/doctor_slice";
//import { getAllPrescriptionData } from "../slices/patient-prescription";
import { Link ,navigate, useNavigate} from "react-router-dom";
import {
  Toast,
  ToastContainer,
} from "react-bootstrap";
import UpdateDoctorModal from "./modals/updateDoctorModal";
import { deleteDoctorDataAsync, getAllDoctorsAsync } from "../slices/doctor_slice";
import { getAllPrescriptionData } from "../slices/patient-prescription";
import BookingPage from "./modals/createAppointment";
const PrescriptionList = (values, handleChange, errors) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showUpdatDoctorModal, setUpdateDoctorModal] = useState(false);
  const [updatedDoctorData,setUpdatedDoctorData] = useState({});
  const [deleteDoctorToastMessage, setDeleteDoctorToast] =
  useState("...");
  const [updateDoctorToastMessage, setUpdateDoctorToast] =
  useState("...");
const [showToast, setShowToast] = useState(false);
const [showUpdateToast, setShowUpdateToast] = useState(false);
  var id =1;
const dispatch=useDispatch()
  const {allPrescriptionData} = useSelector((state)=>state.prescription);
  console.log(allPrescriptionData);
  useEffect(() => {
    dispatch(getAllPrescriptionData());
  }, [dispatch]);
  // const handleDelete=id=>{
  //   console.log(id);
  //   dispatch(deleteDoctorDataAsync(id)).unwrap()
  //   .then((response) => {
  //     setDeleteDoctorToast("doctor data delete success");
  //     setShowToast(true);
  //     console.log(response);
  //   })
  //   .catch(() => {});
  //   dispatch(getAllDoctorsAsync());
  //     }
  //     const handleUpdateDoctorData =(data)=>{
  //       dispatch(
  //         updateDoctorData({
  //           data,
  //         })
  //       )
  //         .unwrap()
  //         .then((response) => {
  //           setUpdateDoctorToast("doctor data updated success");
  //           setShowUpdateToast(true);
  //           console.log(response);
  //         })
  //         .catch(() => {});
  //         dispatch(getAllDoctorsAsync());
  //     }
  // const handleShowUpdateDoctorModal = (data)=>{
  //   setUpdatedDoctorData(data);
  //   setUpdateDoctorModal(true);
  // }
  // const handleCloseUpdateDoctorModal = ()=>{
  //   setUpdateDoctorModal(false);
  //   dispatch(getAllDoctorsAsync());
  // }

  // const [showBookingPage, setshowBookingPage] = useState(false);
  // const handlesetshowBookingPage = () => {
  //   setshowBookingPage(true);
  // };
  // const handleCloseBookingPage = () => {
  //   setshowBookingPage(false);
  // };

  return(
    <div>
   {allPrescriptionData && (
    <div>
    <ToastContainer position="middle-end">
    <Toast
      bg="success"
      onClose={() => setShowToast(false)}
      show={showToast}
      delay={5000}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">Message</strong>
        <small>NOW</small>
      </Toast.Header>
      <Toast.Body className="text-white">
        {deleteDoctorToastMessage}
      </Toast.Body>
    </Toast>
  </ToastContainer>
    <Table cstriped responsive hover bordered border={1}>
    <thead>
      <tr>
        <th>NO</th>
        <th>Disease name</th>
        <th>Medicine name</th>
        <th>Description</th>
        <th>Dosage</th>
      </tr>
    </thead>
    <tbody>
      {allPrescriptionData.map((prescriptionData,index) => (
        <tr>
          <td>{index+1} </td>
          <td>{prescriptionData.diseaseName} </td>
          <td>{prescriptionData.medicineName} </td>
          <td>{prescriptionData.description} </td>
          <td>{prescriptionData.dosage} </td>
            
        </tr>
      ))}
        </tbody>
        </Table>
    </div>
   )}
    </div>

)}
export default PrescriptionList;