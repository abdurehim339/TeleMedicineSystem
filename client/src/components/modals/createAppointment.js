import React, {useState, useEffect} from "react"
import {
  Button,
  Modal,
  Form,
  InputGroup,
  Toast,
  Spinner,
  ToastContainer,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { clearMessage } from "../../slices/message_slice";
import { bookAppointment } from "../../slices/Patient_slice ";
import shortid from "shortid";
import { getAllDoctor } from '../../services/user_service';
import Select from "react-select";
import CustomSelect from "./customSelect";


const schema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Too Short")
    .max(20, "Too Long")
    .required("name required"),
  status: Yup.string(),
  consultationDate: Yup.date().min(new Date(), "Date cannot be in the past"),
  // .typeError("That doesn't look like a phone number")
  // .positive("A phone number can't start with a minus")
  // .integer("A phone number can't include a decimal point")
  // .min(8)
  // .required('A phone number is required'),
  doctorId: Yup.string(),
  patientId: Yup.string()

});




const BookingPage = ({ show, handleClose, docData }) => {
  const { message } = useSelector((state) => state.message);
  const [ addDoctorToastMessage, setAddDoctorToast] = useState("...");
  const [showDoctorToast, setShowDoctorToast] = useState(false);
  const { isLoading } = useSelector((state) => state.doctor);
  const { hasError } = useSelector((state) => state.doctor);
  const {user:currentUser} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  

    // const AllDoctor = (values, handleChange, errors) => {

    //   const [doctorData, setAllDoctorData] = useState([]);
    //   useEffect(() => {
    //     getAllDoctor().then((response) => {
    //       try{
    //       setAllDoctorData(response)
          
    //     }
    //     catch (err) {
    //       console.log(err);
    //     }
    //     });
    //   }, [dispatch]);

           
    // }


  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const handleAddAppointment = (formValue) => {
    // setSpinner(true);
    const id = shortid.generate();
    const status = 'pending';
    const patientId = currentUser.id;

    const {
      title,
      consultationDate,
      doctorId
    } = formValue;
    dispatch(
      bookAppointment({
        id,
        title,
        status,
        consultationDate,
        doctorId,
      patientId
      })
    )
      .unwrap()
      .then((response) => {
        setAddDoctorToast("Appointment booked successfully");
        setShowDoctorToast(true);
         handleClose();
        // console.log("from add doctor modal" + response);
      })
      .catch(() => {});
  };

  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <ToastContainer position="top-end">
            <Toast
              bg="success"
              onClose={() => setShowDoctorToast(false)}
              show={showDoctorToast}
              delay={5000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Message</strong>
                <small>NOW</small>
              </Toast.Header>
              <Toast.Body className="text-white">
                {addDoctorToastMessage}
              </Toast.Body>
            </Toast>
          </ToastContainer>
          <Modal.Title>book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleAddAppointment}
            initialValues={{
              title:"",
            //  status:"",
          consultationDate:"",
      doctorId:"",
      patientId:""
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              resetForm,
              values,
              isValid,
              touched,
              setFieldValue,
              errors,
            }) => (
              <Form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className="text-primary"
              >
                <Form.Label>Title</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    isValid={touched.title && !errors.title}
                    isInvalid={!!errors.title}
                    required
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.title}
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Label className="mt-3">consultationDate</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="date"
                    name="consultationDate"
                    value={values.consultationDate}
                    onChange={handleChange}
                    isValid={touched.consultationDate && !errors.consultationDate}
                    isInvalid={!!errors.consultationDate}
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.consultationDate}
                  </Form.Control.Feedback>
                </InputGroup>

                <Form.Label className="mt-3">DoctorId</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="string"
                    name="doctorId"
                    value={values.doctorId}
                    onChange={handleChange}
                    isValid={touched.doctorId && !errors.doctorId}
                    isInvalid={!!errors.doctorId}
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.doctorId}
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
                      // <span className="spinner-border spinner-border-sm"></span>
                    )}
                    Submit
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
    </>
  );
};

export default BookingPage;
