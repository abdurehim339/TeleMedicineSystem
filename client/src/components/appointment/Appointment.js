import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAppointmentData } from "../../slices/doctor_appointment_slice";
import { Spinner, Table, Badge, Nav } from "react-bootstrap";
import { getAllAppointment } from "../../services/user_service";
import Pagination from "../pagination/Pagination";
import { AllAppointmentRecord } from "../table_record/AllApointmentRecord";
const AppointmentByDoctor = ({ setTotalAppointment }) => {
  const navigate = useNavigate();
  const { appointmentByDoctorId, isLoading, hasError } = useSelector(
    (state) => state.appointment
  );

  console.log(appointmentByDoctorId);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);
  //var incrementer = 1;
  const { user } = useSelector((state) => state.auth);
  var id = user.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppointmentData({ id }));
  }, [dispatch, id]);
  //console.log("doctorid"+id)
  if (appointmentByDoctorId != null) {
    setTotalAppointment(appointmentByDoctorId.length);
    console.log();
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = appointmentByDoctorId.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );
    const nPages = Math.ceil(appointmentByDoctorId.length / recordsPerPage);

    return (
      <>
        <Table striped responsive hover bordered border={1}>
          <thead>
            <tr>
              <th className="p">NO</th>
              <th className="p">First Name</th>
              <th className="p">Last Name</th>
              <th className="p">Emial</th>
              <th className="p">Phone</th>
              <th className="p">status</th>
              <th colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((appointment,index) => (
              <tr>
                <td>{index+1}</td>
                <td>{appointment.AppointmentPatient.userPatient.firstName}</td>
                <td>{appointment.AppointmentPatient.userPatient.lastName}</td>
                <td>{appointment.AppointmentPatient.userPatient.email}</td>
                <td>{appointment.AppointmentPatient.userPatient.phone}</td>
                <td>{appointment.status}</td>
                <Nav variant="pills" className="nav1">
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        navigate("/doctor/appointment/" + appointment.AppointmentPatient.userPatient.id, {
                          state: { appointment },
                          
                        });
                      }}
                    >
                      <Badge bg="primary px-4 py-2">View</Badge>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </>
    );
  }
  if (isLoading) {
    return <Spinner>Waiting...</Spinner>;
  }
  if (!hasError) {
    return <h5 className="text-danger">Error while fetching data</h5>;
  }
};
const AppointmentByPatient = ({ setTotalAppointment }) => {
  const navigate = useNavigate();
  const { AppointmentByPatient, isLoading, hasError } = useSelector(
    (state) => state.appointment
  );

  console.log(AppointmentByPatient);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);
  var incrementer = 1;
  const { user } = useSelector((state) => state.auth);
  var id = user.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppointmentData({ id }));
  }, [dispatch, id]);
  //console.log("doctorid"+id)
  if (AppointmentByPatient != null) {
    setTotalAppointment(AppointmentByPatient.length);
    console.log();
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = AppointmentByPatient.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );
    const nPages = Math.ceil(AppointmentByPatient.length / recordsPerPage);

    return (
      <>
        <Table striped responsive hover bordered border={1}>
          <thead>
            <tr>
              <th className="p">NO</th>
              <th className="p">First Name</th>
              <th className="p">Last Name</th>
              <th className="p">Emial</th>
              <th className="p">Phone</th>
              <th className="p">status</th>
              <th colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((appointment,index) => (
              <tr>
                <td>{index+1}</td>
                <td>{appointment.AppointmentPatient.userPatient.firstName}</td>
                <td>{appointment.AppointmentPatient.userPatient.lastName}</td>
                <td>{appointment.AppointmentPatient.userPatient.email}</td>
                <td>{appointment.AppointmentPatient.userPatient.phone}</td>
                <td>{appointment.status}</td>
                <Nav variant="pills" className="nav1">
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        navigate("/patient/appointment/" + appointment.id, {
                          state: { appointment },
                        });
                      }}
                    >
                      <Badge bg="primary px-4 py-2">View</Badge>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </>
    );
  }
  if (isLoading) {
    return <Spinner>Waiting...</Spinner>;
  }
  if (!hasError) {
    //return <h5 className="text-danger">Error while fetching data</h5>;
  }
};
const AllAppointmentWrapper = ({
  setTotalAppointment,
  setAcceptedAppointment,
  setPendingAppointment,
}) => {
  const [appointmentData, setAllAppointmentData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    getAllAppointment().then((response) => {
      setAllAppointmentData(response);
    });
  }, [dispatch]);
  var acceptedAppointment = 0;
  var pendingAppointment = 0;
  for (var active = 0; active < appointmentData.length; active++) {
    if (appointmentData[active].status === "accepted") {
      acceptedAppointment++;
    }
  }
  for (var pending = 0; pending < appointmentData.length; pending++) {
    if (appointmentData[pending].status === "pending") {
      pendingAppointment++;
    }
  }
  setAcceptedAppointment(acceptedAppointment);
  setPendingAppointment(pendingAppointment);
  setTotalAppointment(appointmentData.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = appointmentData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(appointmentData.length / recordsPerPage);

  return (
    <div className="mx-2">
      <AllAppointmentRecord data={currentRecords} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export { AppointmentByDoctor, AllAppointmentWrapper ,AppointmentByPatient};
