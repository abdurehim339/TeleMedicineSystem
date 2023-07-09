// import React, { useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClipboard } from "@fortawesome/free-solid-svg-icons";
// import { BASE_URL } from "../../../services/api_endpoint";

// import shortid from "shortid";
// // import short id


// const ChannelForm = (props) => {
//   const { setInCall, setChannelName, setToken, setUid } = props;

//   const [channel, setChannel] = useState("");
//   const { user: currentUser } = useSelector((state) => state.auth);
//   const role = currentUser.role;
//   // create onHandleJoin function
//   // this function will be called when the user clicks on the join button
//   // this function will set the inCall state to true
//   const generatedChannel = shortid.generate();
//   console.log(generatedChannel);
//   const onChange = (e) => {
//      if(role==="doctor"){
//      setChannel(generatedChannel)
//       setChannelName(generatedChannel)
//      }
//     else{
//       console.log(e.target.value);
//       setChannelName(e.target.value);
//       setChannel(e.target.value);
//     }
//   };
// console.log(channel);
//   const onHandleJoin = async (e) => {
//     setChannel(generatedChannel);
//     setChannelName(generatedChannel);
//     e.preventDefault();

//     const response = await axios.post(BASE_URL + "/rtc-token", {
//       channelName: channel,
//       //isPublisher: role==="doctor"?true:false,
//       isPublisher: true,
//     });
//     console.log(response.data.token);     
//     setToken(response.data.token);
//     setUid(response.data.uid);
//     setInCall(true);
//     //console.log(generatedChannel)
//     //console.log(channel);
//     //console.log(role)
//   };
//   console.log(channel);
//   return (
//     <form className="join">
      
//       <input type="text" placeholder="Enter Channel Name" onChange={onChange}
//        readOnly = {role === "doctor"?true:false}
//       defaultValue={role==="doctor"?generatedChannel:""}
//        />
//        {role==="doctor" && <FontAwesomeIcon icon={faClipboard} className="text-primary" onClick={async()=>
//        await navigator.clipboard.writeText(generatedChannel)
//        }/>}
//       <button onClick={onHandleJoin}>Join</button>
//     </form>
//   );
// };
//export default ChannelForm;


import { BASE_URL } from "../../../services/api_endpoint";
import React, { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import Navbar from "../../navbar/navbar" ;


const ChannelForm = (props) => {
  const { setInCall, setChannelName, setToken, setUid } = props;

  const [channel, setChannel] = useState("");

  // create onHandleJoin function
  // this function will be called when the user clicks on the join button
  // this function will set the inCall state to true
  // this function uses axios to make a post request to the server
  const onChange = (e) => {
    setChannelName(e.target.value);
    setChannel(e.target.value);
  };

  const onHandleJoin = async (e) => {
    e.preventDefault();
    const response = await axios.post(BASE_URL+"/rtc-token", {
      channelName: channel,
      isPublisher: true,
    });
    console.log(response.data.token);
    setChannelName(channel);
    setToken(response.data.token);
    setUid(response.data.uid);
    setInCall(true);
  };

  return (
    // <form className="join">
    //   <p style={{ color: "red" }}>Please add a proper channel name</p>
    //   <input type="text" placeholder="Enter Channel Name" onChange={onChange} />
    //   <button onClick={onHandleJoin}>Join</button>
    // </form>
    
    <MDBContainer className="my-5">
    
          <MDBCard>
            <MDBRow className='g-0'>
    
              <MDBCol md='6'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
              </MDBCol>
    
              <MDBCol md='6'>
                <MDBCardBody className='d-flex flex-column'>

    <div className='d-flex flex-row mt-2'>
                
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Please add a proper channel name</h5>

                
                <form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <MDBInput wrapperClass='mb-4' label='Enter Channel Name' id='formControlLg' type='text' onChange={onChange} size="lg"/>
            </Form.Group>
            <MDBBtn onClick={onHandleJoin} className="mb-4 px-5" color='dark' size='lg'>Join</MDBBtn>
            </form>
                </MDBCardBody>
              </MDBCol>
    
            </MDBRow>
          </MDBCard>
    
        </MDBContainer>


  );
};
export default ChannelForm;
