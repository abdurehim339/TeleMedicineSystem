import { useDispatch, useSelector } from "react-redux";
import {React,useEffect,useState} from 'react'
import { Table } from "react-bootstrap";
import {  getAllPatient} from "../services/user_service";
import { Link } from "react-router-dom";

const PatientList = () => {
  //var id =1;
const dispatch=useDispatch()
  const [patientData, setAllPatientData] = useState([]);
  useEffect(() => {
    getAllPatient().then((response) => {
      try{
      setAllPatientData(response)
      //setUser((user) => Object.assign({}, user, { name: "Mark" }));
    }
    catch (err) {
      console.log(err);
    }
    });
  }, [dispatch]);
  const handeleDelete=(id)=>{
console.log(id)
  }
  
  return(
    <div>
   


<><Table cstriped responsive hover bordered border={1}>

<thead>
  <tr>
    <th>NO</th>
    <th>id</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Address</th>
   
  </tr>
</thead>
<tbody>
  {patientData.map((patientData,index) => (
    <tr>
      <td>{index+1} </td>
      <td>{patientData.id}</td>
      <td>{patientData.firstName} </td>
      <td>{patientData.lastName} </td>
      <td>{patientData.email} </td>
      <td>{patientData.phone} </td>
      <td>{patientData.address} </td>
      
      <td>{/*
      <Link to={"/admin/editUser/"+patientData.id} className="btn btn-success mx-2">Edit</Link>
      <Link to="/deleteUser" className="btn btn-danger" onClick={()=>{handeleDelete(patientData.id)}}>Delete</Link>
  */}
      </td>
     
    </tr>
  ))}
</tbody>
</Table></>

 
    </div>
  )
}
export default   PatientList;