import { useDispatch, useSelector } from "react-redux";
import {React,useEffect,useState} from 'react'
import { Table } from "react-bootstrap";
import {  getPrescriptionByPatientId } from "../services/user_service";
import { Link } from "react-router-dom";

const PriscriptionList = () => {
  //var id =1;
const dispatch=useDispatch()
  const [prescriptionData, setAllPrescriptionData] = useState([]);
  useEffect(() => {
    getPrescriptionByPatientId().then((response) => {
      try{
        setAllPrescriptionData(response)
      //setUser((user) => Object.assign({}, user, { name: "Mark" }));
    }
    catch (err) {
      console.log(err);
    }
    });
  }, [dispatch]);
//   const handeleDelete=(id)=>{
// console.log(id)
//   }
  
  return(
    <div>
<><Table cstriped responsive hover bordered border={1}>

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
  {prescriptionData.map((prescriptionData,index) => (
    <tr>
    <td>{index+1} </td>
    <td>{prescriptionData.diseaseName} </td>
    <td>{prescriptionData.medicineName} </td>
    <td>{prescriptionData.description} </td>
    <td>{prescriptionData.dosage} </td>
      
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
export default   PriscriptionList;