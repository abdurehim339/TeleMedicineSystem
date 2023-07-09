import { useState } from "react"
import React from 'react'
import axios from "axios"
import { navigate ,useNavigate} from "react-router-dom"
    const HandleDelete=async(id)=>{
        console.log(id)
        const Navigate=useNavigate 
        const [message,setMessage]=useState("")
        const res= await axios.get(`http://localhost:4000/admin/delete/patient/${id}`,{
          method:"DELETE",
          headers:{'content-type':'application/json'}
        }
      
        );
        let resjson=await res.json();
        if(res.status===200)
      {
        setMessage(resjson.success)
        setTimeout(()=>{Navigate('/doctorData')},[1000])
      }
        else{
          setMessage("plese check data")
        }
       
          } 

export default HandleDelete