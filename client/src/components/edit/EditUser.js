import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../services/api_endpoint";

function Edituser()
{
    const {id}= useParams();
    const navigate= useNavigate();
    const [editUser, setEditUser]= useState({firstName:'',lastName:'', email:'',phone:'',gender:'',DOB:"",address:''});
    const [message, setMessage]= useState('');
console.log(id);
        useEffect(()=>{
        const getUser= async()=>{
            const reqData= await axios.get(BASE_URL+`/admin/patient/editprofile/:id`);
            const resData= await reqData.json();
            console.log(resData);
            setEditUser(resData);
            console.log("resdata"+resData)
        }
        getUser();
    },[id]);
    console.log("resdata"+editUser)
    const handleInput= (e)=>{
        setEditUser({...editUser, [e.target.name]:e.target.value});
    }
    const handleUpdate= async(e)=>{
        e.preventDefault();
        const editInputvalue= {firstName:editUser.firstName, lastName:editUser.lastName,email:editUser.email, phone:editUser.phone, gender:editUser.gender,DOB:editUser.DOB,address:editUser.address,  };
        console.log(editInputvalue);  
        let res=   await axios.get("dmin/patient/editprofile/"+id,{
            method:"PUT",
            headers:{'content-type':'application/json'},
            body: JSON.stringify(editInputvalue)
        }).catch((Error)=>{console.log("hello"+Error)});  

        

        let resjson = await res.Json();
        if(res.status===200)
        {
            setMessage(resjson.success);
          setTimeout(() => {
            navigate('/userdata'); 
          }, 2000);        

        } else {
            setMessage("Some error Occured");
        }

    }
    
    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <h5 className="mt-2">Edit User { id }</h5>
              <p className="text-success"> { message} </p>
                    <form onSubmit={ handleUpdate}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                   <label className="form-lable">firstName</label>
                                   <input type="text" name="firstName" className="form-control" value={ editUser.firstName} onChange={ handleInput } />
                                </div>
                            </div>
                            <div className="col-md-6">
                            <div className="mb-3">
                               <label className="form-lable">lastName</label>
                               <input type="text" name="lastName" className="form-control" value={ editUser.lastName} onChange={ handleInput } />
                            </div>
                        </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                   <label className="form-lable">Email</label>
                                   <input type="text" name="email" className="form-control" value={ editUser.email} onChange={ handleInput }/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                   <label className="form-lable">Phone No</label>
                                   <input type="text" name="phone" className="form-control" value={ editUser.phone} onChange={ handleInput }/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                   <label className="form-lable">gender</label>
                                  <select name="gender" className="form-control" value={ editUser.gender} onChange={ handleInput }>
                                    <option value="">--Please Select--</option>
                                    <option value="1">male</option>
                                    <option value="0">female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                   <label className="form-lable">DOB</label>
                                   <input type="date" name="DOB" className="form-control" value={ editUser.DOB} onChange={ handleInput }/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                   <label className="form-lable">Address</label>
                                   <input type="text" name="address" className="form-control" value={ editUser.address} onChange={ handleInput }/>
                                </div>
                            </div>
                            
                           { /* <div className="col-md-6">
                                 <div className="mb-3">
                                    <label className="form-lable">Status</label>
                                   <select name="status" className="form-control" value={ editUser.status} onChange={ handleInput }>
                                    <option value="">--Please Select--</option>
                                     <option value="1">Active</option>
                                     <option value="0">Inactive</option>
                                    </select>
                                 </div>
     </div>*/}
                            

                            <div className="col-md-12">
                                <div className="mb-3">
                                   <label className="form-lable"></label>
                                  <button name="submit" className="btn btn-success btn-lg">Update</button>
                                   </div>
                            </div>
                        </div>
                    </form>

                    </div>
                </div>
            </div>
            
        </React.Fragment>
    );
}

export default Edituser;