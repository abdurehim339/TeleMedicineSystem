import axios from "axios";
//const BASE_URL = "http://localhost:4000";
import { BASE_URL } from "./api_endpoint";
//import { Badge, message } from "antd";
//import { Link, useLocation, useNavigate } from "react-router-dom";

// const register = async ( id,
//   firstName, lastName, email, password, phone,gender,DOB,address,weight,bloodGroup,location,clinicName,) => {
//     console.log(email, password);
//   return await axios.post(BASE_URL + "/register", {
    
//     id,
//     firstName,
//     lastName,
//     email,
//     password,
//     phone,
//     gender,
//     DOB,
//     address,
//     weight,
//     bloodGroup ,
//     location,
//     clinicName
//   }).then((response)=>
//   {
//     console.log(response.data);
//     if(response.data)
//     {
//       alert("registerd successfully")
//     }
//     return response.data;
//   }).catch((error)=>{
//     if (error.response) {
//       console.log('Server responded with status code:', error.response.status);
//       console.log('Response data:', error.response.data);
//     } else if (error.request) {
//       console.log('No response received:', error.request);
//     } else {
//       console.log('Error creating request:', error.message);
//     }
//   })
// };

const login = async (email, password, pathname) => {
  //console.log(email, password, pathname);
  return await axios
    .post(BASE_URL + pathname, {
      email,
      password,
    })
    .then((response) => {
      //console.log(response.data.accessToken);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      //console.log(response.data);
      return response.data;
    });
};

const logout = () => {

 
  localStorage.removeItem("user");
  
  //navigate("/login")
};
// const Logout = () => {
//   const navigate=useNavigate();
//   localStorage.clear();
//   message.success("Logout Successfully");
//   navigate("/login");
// };
const authService = {
  //register,
  login,
  logout,
};
export default authService;
