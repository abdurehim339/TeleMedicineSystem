import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Card, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.scss";
import CustomNavbar from "../../components/navbar/navbar";
import CustomFooter from "../../components/footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../slices/auth_slice";
import { clearMessage } from "../../slices/message_slice";
import ForgetPasswordModal from "../../components/modals/ForgetPasswordModal";

const Login = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);
  const handleShowForgetPasswordModal = () => {
    setShowForgetPasswordModal(true);
  };
  const handleCloseForgetPasswordModal = () => {
    setShowForgetPasswordModal(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    email: "",
    password: "",
    pathname: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });
  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    const pathname = location.pathname;
    setLoading(true);
    dispatch(login({ email, password, pathname }))
      .unwrap()
      .then(() => {
        currentUser.role === "admin"
          ? props.navigate("/admin/dashboard")
          : props.navigate("/doctor");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  if (isLoggedIn) {
    //console.log(currentUser.role);
    if (currentUser.role === "admin") return <Navigate to="/admin/dashboard" />;
    
    if (currentUser.role === "doctor") {
      return navigate("/doctor");
    };
    if (currentUser.role === "patient") {
      return navigate("/patient");
    };
    
   
  } 
  return (
    <>
      <CustomNavbar />
      <Card className="login-card">
        <Card.Header className="text-center">Login</Card.Header>
        <Card.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              handleSubmit,
              handleChange,
              resetForm,
              values,
              touched,
              errors,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Label className="mt-3">Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text>
                    {" "}
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-primary"
                    />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="someone@gmail.com"
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

                <Form.Label className="mt-3">Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faLock} className="text-primary" />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="*********"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Group className="my-3 row">
                  <Button
                    onClick={handleShowForgetPasswordModal}
                    className="mx-5"
                    variant="link"
                  >
                    Forget password
                  </Button>
                </Form.Group>
                {/* <p className="px-5"></p> */}
                <Form.Group className="px-2 pb-4">
                  <Button
                    type="submit"
                    className="btn btn-primary btn-login"
                    disabled={loading}
                  >
                    {loading && (
                      <div class="spinner-border text-dark" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
                    Login
                  </Button>
                  <Button
                    className="mx-3"
                    as="input"
                    type="reset"
                    value="Reset"
                    onClick={resetForm}
                  />
                </Form.Group>
              </Form>
            )}
          </Formik>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
      <CustomFooter />
      <ForgetPasswordModal
        show={showForgetPasswordModal}
        handleClose={handleCloseForgetPasswordModal}
      />
    </>
  );
};
export default Login;
