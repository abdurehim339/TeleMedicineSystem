import Row from "react-bootstrap/Row";
import CustomeCard from "../card/card";
import { useDispatch,useSelector } from "react-redux";
import {React,useEffect,useState} from 'react'

import "./cardList.scss"; 
//import {Rating }from "../../../components/rating/rating"
import { getAllDoctor } from "../../../services/user_service";


const CardList = () => {
  const dispatch = useDispatch();
  const [allDoctorData,setAllDoctorData] = useState([])
  useEffect(() => {
    getAllDoctor().then(response=>{
      setAllDoctorData(response);
    })
  },[dispatch]);
  
console.log("from patient page doctor data", allDoctorData
)
  
 
return (
    <Row className="my-5 mx-0">
      <CustomeCard args={allDoctorData}></CustomeCard>
    </Row>
  );
};
export default CardList;
