import React, { useEffect, useState } from "react";

import {
  Button,
  Modal,
  Form,
  InputGroup,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { clearMessage } from "../../slices/message_slice";
//import { updatePatientData } from "../../slices/Patient_slice";
//import { getAllPatientsAsync } from "../../slices/patient_slice";
const schema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Too Short")
      .max(100, "Too Long")
      .required("first name required"),
    lastName: Yup.string()
      .min(5, "Too Short")
      .max(100, "Too Long")
      .required("last name required"),
    email: Yup.string().email().required(),
    phone: Yup.string().required(),
    gender: Yup.string().required(),
    address: Yup.string().required()

  });
const UpdatePatientModal = ({ show, handleClose, patientData, showToast,handleUpdatepatientData,setShowToast,toastMessage }) => {
  // console.log(doctorData);

  const { message } = useSelector((state) => state.message);
  const { isLoading, hasError } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleUpdate = (formValue) => {
    console.log("form value",formValue);
    var data = {
        id: patientData.id,
        firstName: formValue.firstName,
        lastName:formValue.lastName,
        email: formValue.email,
        gender: formValue.gender,
        address: formValue.address
    };
    handleUpdatepatientData(data)
  };

  return (
    <Modal show={show} backdrop="static" keyboard={false} onHide={handleClose}>
      <Modal.Header closeButton>
        <ToastContainer position="'middle-end">
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
              {toastMessage}
            </Toast.Body>
          </Toast>
        </ToastContainer>
        <Modal.Title>Update Doctor Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={handleUpdate}
          initialValues={{
            firstName: patientData.firstName,
            lastName:patientData.lastName,
            email: patientData.email,
            gender: patientData.gender,
            phone: patientData.phone,
            address: patientData.address
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            resetForm,
            values,
            touched,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
            <Form.Label>First name</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
                isInvalid={!!errors.firstName}
                required
                autoFocus
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.firstName}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Label className="mt-3">Last name</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
                isInvalid={!!errors.lastName}
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.lastName}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Label className="mt-3">Email</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Label className="mt-3">Gender</Form.Label>
            <InputGroup hasValidation>
              <Form.Select
                id="gender"
                defaultValue={values.gender}
                onChange={handleChange}
              >
                <option>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.gender}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Label className="mt-3">Phone</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="phone"
                name="phone"
                placeholder="+251-xxx-xxx-xxx"
                value={values.phone}
                onChange={handleChange}
                isValid={touched.phone && !errors.phone}
                isInvalid={!!errors.phone}
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.phone}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Label className="mt-3">Address</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                name="address"
                placeholder="e.g:Bahir Dar"
                value={values.address}
                onChange={handleChange}
                isValid={touched.address && !errors.address}
                isInvalid={!!errors.address}
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.address}
              </Form.Control.Feedback>
            </InputGroup>
              <Form.Group className="px-5 mt-4">
                <Button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Spinner>waiting...</Spinner>
                    // <span className="spinner-border spinner-border-lg"></span>
                  )}
                  Update
                </Button>
                <Button
                  className="mx-3"
                  as="input"
                  type="reset"
                  value="Reset"
                  onClick={() => {
                    resetForm();
                    dispatch(clearMessage());
                  }}
                />
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        {hasError && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePatientModal;
