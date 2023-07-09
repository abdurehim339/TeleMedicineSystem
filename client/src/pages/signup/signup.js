import { Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./signup.scss";


import {React,useState,useEffect} from 'react'
import { Formik } from "formik";

import * as Yup from "yup";
import { clearMessage } from "../../slices/message_slice";
import { useDispatch,useSelector} from "react-redux";
//import { useNavigate ,useLocation} from "react-router-dom";
//import { useState } from "react";
//import axios from "axios";
import { register} from "../../slices/auth_slice";
const Signup = () => {
  

  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
 useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    //id:"",
    firstName:"",
    lastName:"",
    email:"",
    password: "",
    phone:"",
    gender:"",
    DOB:"",
    address:"",
    role:"",
    weight:"",
    bloodGroup:"",
    pathname: "",
  };
  const validationSchema = Yup.object().shape({
     //id: Yup.string().required("This field is required!"),
    firstName: Yup.string().required("This field is required!"),
    lastName: Yup.string().required("This field is required!"),
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
    phone: Yup.string().required("This field is required!"),
    gender: Yup.string().required("This field is required!"),
    DOB: Yup.date().required("This field is required!"),
   address: Yup.string().required("This field is required!"),
  //role: Yup.string().required("This field is required!"),
   weight: Yup.number().required("This field is required!"),
   bloodGroup: Yup.string().required("This field is required!"),

    
  });
 
  const handleRegister = (formValue) => {
    const {  //id,
    firstName,
    lastName,
    email,
    password,
    phone,
    gender,
    DOB,
    address,
    role,
    weight,
    bloodGroup, } = formValue;

    setSuccessful(false);

    dispatch(register({ 
      //id,
       firstName,
      lastName,
      email,
      password,
      phone,
      gender,
      DOB,
      address,
      role,
      weight,
      bloodGroup, }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
        setSuccessful(false);
      });
  };
 
  return (
    <>
      <Card className="signup-card mx-auto mt-5 mb-2">
        <Card.Header className="text-center">Signup</Card.Header>
        <Card.Body>
        <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      />
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        
          <Form>
          {!successful && (
            
          <div>
            {/*<Form.Group className="mb-3">
              <Form.Label htmlFor="id">id</Form.Label>
              <Form.Control
                type="text"
                id="id"
                aria-describedby="id"
              />
              <Form.Text id="id" muted>
                Your name must valid name, contain letters and must not contain
                spaces, special characters, or emoji.
              </Form.Text>
            </Form.Group>
          */}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="fname">First Name</Form.Label>
              <Form.Control
                type="text"
                id="fname"
                aria-describedby="firstname"
              />
              <Form.Text id="firstname" muted>
                Your name must valid name, contain letters and must not contain
                spaces, special characters, or emoji.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="lname">Last Name</Form.Label>
              <Form.Control
                type="text"
                id="lname"
                aria-describedby="lastname"
              />
              <Form.Text id="lastname" muted>
                Your name must valid name, contain letters and must not contain
                spaces, special characters, or emoji.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                aria-describedby="emailHelpBlock"
              />
              <Form.Text id="emailHelpBlock" muted>
                Your email must valid email like abebe@gmail.com, contain
                letters and numbers, and must not contain spaces, special
                characters, or emoji.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputPassword5">Password</Form.Label>
              <Form.Control
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </Form.Text>
            </Form.Group>



            <Form.Group className="mb-3">
              <Form.Label htmlFor="phone">Phone</Form.Label>
              <Form.Control
                type="text"
                id="phone"
                aria-describedby="phone"
              />
              <Form.Text id="phone" muted>
                Your phone must valid name, contain letters and must not contain
                spaces, special characters, or emoji.
              </Form.Text>
            </Form.Group>




            <Form.Group className="mb-3">
              <Form.Label htmlFor="gender">Gender</Form.Label>
              <Form.Select>
                <option value="male">Male</option>
                <option value="female">Female</option>
                </Form.Select>
              <Form.Text id="gender" muted>
                Your phone must valid name, contain letters and must not contain
                spaces, special characters, or emoji.
              </Form.Text>
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label htmlFor="DOB">Date</Form.Label>
              <Form.Control
                type="date"
                id="date"
                aria-describedby="date"
              />
              <Form.Text id="date" muted>
                Your phone must valid name, contain letters and must not contain
                spaces, special characters, or emoji.
              </Form.Text>
            </Form.Group>


            

              <Form.Group className="mb-3">
              <Form.Label htmlFor="address">address</Form.Label>
              <Form.Control
                type="text"
                id="address"
                aria-describedby="address"
                />
                <Form.Text id="address" muted>
                  Your address must be valid address, must contain letters and must not contain
                  spaces, special characters, or emoji.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label htmlFor="weight">Weight</Form.Label>
              <Form.Control
                type="number"
                id="weight"
                aria-describedby="weight"
                />
                <Form.Text id="weight" muted>
                  Your phone must valid name, contain letters and must not contain
                  spaces, special characters, or emoji.
                </Form.Text>
              </Form.Group>
  
  
  
              <Form.Group className="mb-3">
                <Form.Label htmlFor="bloodGroup">Bloodtype</Form.Label>
                <Form.Select>
                  <option value="O">O</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  </Form.Select>
                <Form.Text id="weight" muted>
                  Your phone must valid name, contain letters and must not contain
                  spaces, special characters, or emoji.
                </Form.Text>
              </Form.Group>
  
  
  
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <p className="px-4">
                have already an account{" "}
                <Button href="/login" variant="link">
                  Login
                </Button>
              </p>
              <Form.Group className="px-5">
                <Button as="input" type="submit" value="Register" 
                 />
                <Button className="mx-3" as="input" type="reset" value="Reset" />
              </Form.Group>
              </div>
        )}
        {message && (
          <div className="form-group">
            <div
              className={successful ? "alert alert-success" : "alert alert-danger"}
              role="alert"
            >
              {message}
            </div>
          </div>
        )}        
            </Form>
        
            </Formik>

          </Card.Body>
        </Card>
        
      </>
      
    );
  };
  
  

  export default Signup;


