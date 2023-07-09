import { Table } from "react-bootstrap";
const AllAppointmentRecord = ({ data }) => {
  var id = 1;
  return (
    <Table cstriped responsive hover id="allAppointment">
      <thead>
        <tr>
          <th rowSpan={2}>NO</th>
          <th colSpan={4}>Doctors</th>
          <th colSpan={4}>Patients</th>
          <th rowSpan={2}>Status</th>
          <th rowSpan={2}>Consultation Date</th>
        </tr>
      </thead>
      <tbody>
        <td></td>
        <td>Name</td>
        <td>Email</td>
        <td>Phone</td>
        <td>Specialization</td>
        <td>Name</td>
        <td>Email</td>
        <td>Phone</td>
        <td>Address</td>
        {data.map((data) => (
          <tr>
            <td>{id++} </td>
            <td>
              {data.AppointmentDoctor.firstName +
                " " +
                data.AppointmentDoctor.lastName}
            </td>
            <td>{data.AppointmentDoctor.email}</td>
            <td>{data.AppointmentDoctor.phone}</td>
        <td>{data.AppointmentDoctor.specialization}</td>
            <td>
              {data.AppointmentPatient.userPatient.firstName +
                " " +
                data.AppointmentPatient.userPatient.lastName}
            </td>
            <td>{data.AppointmentPatient.userPatient.email}</td>
            <td>{data.AppointmentPatient.userPatient.phone}</td>
            <td>{data.AppointmentPatient.userPatient.address}</td>
            <td>{data.status} </td>
            <td>
              {data.consultationDate == null
                ? "not set"
                : data.consultationDate.split("T")[0]}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export { AllAppointmentRecord };
