import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
//import { BASE_URL } from "../../services/api_endpoint";
import { Navbar } from "react-bootstrap";
const PatientProfile = () => {
  const { state } = useLocation();
  const { patientById } = state;
  const { doctorById } = state;
  console.log("patient data"+patientById);
  const navigate = useNavigate();

  return (
    
    <>

      <Navbar
        style={{ backgroundColor: "#275091" }}
        className="mb-3 patient-nav"
        onClick={() => {
          navigate(-1);
        }}
      >
        <i className="fa-2x text-white mx-5">
          {/* <FontAwesomeIcon icon={faBars} onClick={handleShow} /> */}
        </i>
        <Navbar.Brand>
      
          <h1 className="h1 text-light ">{ patientById.firstName}</h1>
        </Navbar.Brand>
      </Navbar>
      <div
        className="card mx-5"
        style={{ width: "80%", height: "200%", borderRadius: "30px" }}
      >
        <div className="row no-gutters">
          <div className="col-md-4">
          
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                { patientById.firstName + " " + patientById.lastName}
              </h5>
              <p className="card-text">{"Address: " + patientById.address}</p>
             
              <p className="card-text">{"Email:" + patientById.email}</p>
              <p className="card-text">{"Phone: " + patientById.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const PatientCardImage = ({ patientById }) => {
 console.log(patientById);
  const navigate = useNavigate();
  return (
    <>
      <Card className="bg-light shadow patient-card">
        <Card.Body className="rounded">
          <Card.Title>
            {patientById.firstName + " " + patientById.lastName}
          </Card.Title>
          <Card.Text>Email:{patientById.email}</Card.Text>
          <Card.Text>Phone:{patientById.phone}</Card.Text>
          <Card.Text>Address:{patientById.address}</Card.Text>
          <Button
            variant="primary mx-5 patient-view-btn"
            // href={"/patient/profile/" + PatientById.id}
            onClick={() => {
              //{console.log(PatientById)}
              navigate("/patient/profile/" + patientById.id, {
                state: { patientById },
              });
            }}
          >
            View Detail
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
// else if (PatientById === null && isLoading && !hasError) {
//   return <Spinner>Waiting</Spinner>;
// } else if (patientById === null && !isLoading && hasError) {
//   return <h5 className="text-danger">Error while fetching data</h5>;
// }
// };

export default PatientProfile;
