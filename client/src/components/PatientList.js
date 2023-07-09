import { useDispatch, useSelector} from "react-redux";
import {React,useEffect,useState} from 'react'
import { Table } from "react-bootstrap";
//import { updateDoctorData } from "../slices/doctor_slice";
import { updatePatientData } from "../slices/Patient_slice ";
import { Link ,navigate, useNavigate} from "react-router-dom";
import {
  Toast,
  ToastContainer,
} from "react-bootstrap";
//import UpdateDoctorModal from "./modals/updateDoctorModal";
import UpdatePatientModal from "./modals/updatePatientModal";
//import { deleteDoctorDataAsync, getAllDoctorsAsync } from "../slices/doctor_slice";
import { deletePatientDataAsync, getAllPatientsAsync } from "../slices/Patient_slice ";
import BookingPage from "./modals/createAppointment";
const PatientList = (values, handleChange, errors) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showUpdatPatientModal, setUpdatePatientModal] = useState(false);
  const [updatedPatientData,setUpdatedPatientData] = useState({});
  const [deleteDoctorToastMessage, setDeleteDoctorToast] =
  useState("...");
  const [updateDoctorToastMessage, setUpdateDoctorToast] =
  useState("...");
const [showToast, setShowToast] = useState(false);
const [showUpdateToast, setShowUpdateToast] = useState(false);
  var id =1;
const dispatch=useDispatch()
  const {allPatientData} = useSelector((state)=>state.patient);
  console.log(allPatientData);
  useEffect(() => {
    dispatch(getAllPatientsAsync());
  }, [dispatch]);
  const handleDelete=id=>{
    console.log(id);
    dispatch(deletePatientDataAsync(id)).unwrap()
    .then((response) => {
      setDeleteDoctorToast("doctor data delete success");
      setShowToast(true);
      console.log(response);
    })
    .catch(() => {});
    dispatch(getAllPatientsAsync());
      }
      const handleUpdatePatientData =(data)=>{
        dispatch(
          updatePatientData({
            data,
          })
        )
          .unwrap()
          .then((response) => {
            setUpdateDoctorToast("doctor data updated success");
            setShowUpdateToast(true);
            console.log(response);
          })
          .catch(() => {});
          dispatch(getAllPatientsAsync());
      }
  const handleShowUpdatePatientModal = (data)=>{
    setUpdatedPatientData(data);
    setUpdatePatientModal(true);
  }
  const handleCloseUpdatePatientModal = ()=>{
    setUpdatePatientModal(false);
    dispatch(getAllPatientsAsync());
  }

  const [showBookingPage, setshowBookingPage] = useState(false);
  const handlesetshowBookingPage = () => {
    setshowBookingPage(true);
  };
  const handleCloseBookingPage = () => {
    setshowBookingPage(false);
  };

  return(
    <div>
   {allPatientData && (
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
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Action</th>
       
      </tr>
    </thead>
    <tbody>
      {allPatientData.map((patientData,index) => (
        console.log("from patientList" + patientData.firstName),
        <tr>
          <td>{index+1} </td>
          <td>{patientData.firstName} </td>
          <td>{patientData.lastName} </td>
          <td>{patientData.email} </td>
          <td>{patientData.phone} </td>
          <td>{patientData.address} </td>
            <td>
          <Link  className="btn btn-success mx-2" onClick={()=>handleShowUpdatePatientModal(patientData)}>
          Edit
          </Link>
          <Link  onClick={()=>handleDelete(patientData.id)} className="btn btn-danger">Delete</Link>
          </td> 
        </tr>
      ))}
        </tbody>
        </Table>
        <UpdatePatientModal show={showUpdatPatientModal} handleClose={handleCloseUpdatePatientModal} doctorData={updatedPatientData} 
        showToast={showUpdateToast}
        handleUpdateDoctorData={handleUpdatePatientData}
        setShowToast={setShowUpdateToast}
        toastMessage={updateDoctorToastMessage}
        />
    </div>
   )}

   <BookingPage
   show={showBookingPage}
   handleClose={handleCloseBookingPage}
         />

    </div>

)}
export default PatientList;