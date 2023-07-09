import { useDispatch, useSelector} from "react-redux";
import {React,useEffect,useState} from 'react'
import { Table } from "react-bootstrap";
import { updateDoctorData } from "../slices/doctor_slice";
import { Link ,navigate, useNavigate} from "react-router-dom";
import {
  Toast,
  ToastContainer,
} from "react-bootstrap";
import UpdateDoctorModal from "./modals/updateDoctorModal";
import { deleteDoctorDataAsync, getAllDoctorsAsync } from "../slices/doctor_slice";
import BookingPage from "./modals/createAppointment";
const DoctorList = (values, handleChange, errors) => {
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
  const {allDoctorData} = useSelector((state)=>state.doctor);
  console.log(allDoctorData);
  useEffect(() => {
    dispatch(getAllDoctorsAsync());
  }, [dispatch]);
  const handleDelete=id=>{
    console.log(id);
    dispatch(deleteDoctorDataAsync(id)).unwrap()
    .then((response) => {
      setDeleteDoctorToast("doctor data delete success");
      setShowToast(true);
      console.log(response);
    })
    .catch(() => {});
    dispatch(getAllDoctorsAsync());
      }
      const handleUpdateDoctorData =(data)=>{
        dispatch(
          updateDoctorData({
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
          dispatch(getAllDoctorsAsync());
      }
  const handleShowUpdateDoctorModal = (data)=>{
    setUpdatedDoctorData(data);
    setUpdateDoctorModal(true);
  }
  const handleCloseUpdateDoctorModal = ()=>{
    setUpdateDoctorModal(false);
    dispatch(getAllDoctorsAsync());
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
   {allDoctorData && (
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
        <th>Specialization</th>
        <th>Action</th>
       
      </tr>
    </thead>
    <tbody>
      {allDoctorData.map((doctorData,index) => (
        <tr>
          <td>{index+1} </td>
          <td>{doctorData.firstName} </td>
          <td>{doctorData.lastName} </td>
          <td>{doctorData.email} </td>
          <td>{doctorData.phone} </td>
          <td>{doctorData.address} </td>
      <td>{doctorData.userDoctor.specialization} </td>
            <td>
          <Link  className="btn btn-success mx-2" onClick={()=>handleShowUpdateDoctorModal(doctorData)}>
          Edit
          </Link>
          <Link  onClick={()=>handleDelete(doctorData.id)} className="btn btn-danger">Delete</Link>
          </td> 
        </tr>
      ))}
        </tbody>
        </Table>
        <UpdateDoctorModal show={showUpdatDoctorModal} handleClose={handleCloseUpdateDoctorModal} doctorData={updatedDoctorData} 
        showToast={showUpdateToast}
        handleUpdateDoctorData={handleUpdateDoctorData}
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
export default   DoctorList;