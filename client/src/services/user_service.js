import axios from "axios";
import user from "./auth_header";
import { BASE_URL } from "./api_endpoint";
const accessToken = user.accessToken;
// const doctorId = user.id;
// const getAllDoctors = async() => {
//   return await axios.get(BASE_URL + "/doctor/all")
//   .then((response) => {
//     console.log(response.data);
//     return response.data
//   });
// };
const addDoctor = async (
  id,
  firstName,
  lastName,
  email,
  password,
  phone,
  gender,
  DOB,
  address,
  specialization,
  file
) => {
  const data = new FormData();
  data.append("id", id);
  data.append("firstName", firstName);
  data.append("lastName", lastName);
  data.append("email", email);
  data.append("password", password);
  data.append("phone", phone); 
  data.append("gender", gender);
  data.append("DOB", DOB);
  data.append("address", address);
  data.append("specialization", specialization);
  data.append("file", file);
  // console.log(file);

  // console.log(accessToken);
  return await axios
    .post(BASE_URL + "/admin/add-doctor", data, {
      headers: {
        "x-access-token": accessToken,
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
};
const getDoctorById = async (id) => {
  return await axios
    .get(BASE_URL + "/doctor/doctor-by-id", {
      params: { id: id },
    })
    .then((response) => {
      return response.data;
    });
};
const updateDoctor = async (data) => {
  // console.log(accessToken);
  console.log("from axios" + data);
  return await axios
    .put(
      BASE_URL + "/admin/doctor/update",
      { data }
    )
    .then((response) => {
      return response.data;
    });
};


const updatePatient = async (data) => {
  // console.log(accessToken);
  console.log("from axios" + data);
  return await axios
    .put(
      BASE_URL + "/admin/patient/update",
      { data }
    )
    .then((response) => {
      return response.data;
    });
};


const deleteDoctor = async (id) => {
  // console.log(accessToken);
  console.log("from axios" + id);
  return await axios
    .delete(
      BASE_URL + "/admin/doctor/delete",
      {data:{id:id}}
    )
    .then((response) => {
      return response.data;
    });
};


const deletePatient = async (id) => {
  // console.log(accessToken);
  console.log("from axios" + id);
  return await axios
    .delete(
      BASE_URL + "/admin/doctor/delete",
      {data:{id:id}}
    )
    .then((response) => {
      return response.data;
    });
};

const getAppointmentByDoctorId = async (id) => {
  // console.log("from axios" + id);
  return await axios
    .get(BASE_URL + "/appointment/by-doctorId", {
      params: { id: id },
    })
    .then((response) => {
      // console.log(response.data);
      const data = response.data;
      return data;
    });
};

const getAppointmentByPatientId = async (id) => {
  // console.log("from axios" + id);
  return await axios
    .get(BASE_URL + "/appointment/by-patientId", {
      params: { id: id },
    })
    .then((response) => {
      // console.log(response.data);
      const data = response.data;
      return data;
    });
};
const getPrescriptionByPatientId = async (id) => {
  // console.log("from axios" + id);
  console.log(id);
  return await axios
    .get(BASE_URL + "/patient/prescription/by-patientId", {
      params: { id: id },
    })
    .then((response) => {
      // console.log(response.data);
      const data = response.data;
      return data;
    });
};

const getAllAppointment = async () => {
  return await axios.get(BASE_URL + "/appointment/all").then((response) => {
    // console.log(response.data);
    return response.data;
  });
};
const getAllDoctor = async () => {
  return await axios
    .get(BASE_URL + "/doctor/all")
    .then((response) => {
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
      response.data.map((data) => console.log("from axios" + data.imagePath));
      return response.data;
    });
};
const getAllPrescription = async () => {
  return await axios
    .get(BASE_URL + "/admin/prescription/all", {
      //params: { role: "doctor" },
    })
    .then((response) => {
       //response.data.map((data) => console.log("from axios" + data.imgurl));

      return response.data;
    })
};
const getAllPatient = async () => {
  console.log(BASE_URL + "/patient/all");
  return await axios.get(BASE_URL + "/patient/all", 
    { params: { role: "patient" } 
  })
  .then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const getPatientById = async (id) => {
  console.log(id);
  //console.log(BASE_URL + "/patient/by-id");
  return await axios
    .get(BASE_URL + "/patient/by-id", {
      params: { id: id },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log('Server responded with status code:', error.response.status);
        console.log('Response data:', error.response.data);
      } else if (error.request) {
        console.log('No response received:', error.request);
      } else {
        console.log('Error creating request:', error.message);
      }
  
    });
    
};
const addPrescription = async (
  id,
  diseaseName,
  medicineName,
  description,
  dosage,
  compliant,
  investigationResult,
  treatment,
  doctorId,
  patientId
) => {
  return await axios
    .post(
      BASE_URL + "/doctor/add-prescription",
      {
        id,
        diseaseName,
        medicineName,
        description,
        dosage,
        compliant,
        investigationResult,
        treatment,
        doctorId,
        patientId,
      },
      {
        headers: {
          "x-access-token": accessToken,
          "content-type": "application/json",
        },
      }
    )
    .then((response) => {
      const data = response.data;
      return data;
    });
};

const getPatientMedicalHistory = async (id) => {
  console.log(id);
  return await axios
    .get(BASE_URL + "/doctor/patient-history/by-id", {
      params: { id: id },
    })
    .then((response) => {
      return response.data;
      console.log(response.data);
    })
    .catch((error) => {
      return error;
    });
};

const addDisease = async (
  id,
  diseaseName,
  diseaseCategory,
  precuation,
  symptoms
) => {
  // console.log("from axios", symptoms);
  return await axios
    .post(
      BASE_URL + "/admin/add-disease",
      { id, diseaseName, diseaseCategory, precuation, symptoms },
      {
        headers: {
          "x-access-token": accessToken,
          "content-type": "application/json",
        },
      }
    )
    .then((response) => {
      const data = response.data;
      return data;
    });
};
const predictDisease = async (symptoms) => {
  return await axios
    .get(BASE_URL + "/predict-disease", {
      params: { symptoms: symptoms },
    })
    .then((response) => {
      const data = response.data;
      // console.log(data);
      return data;
    });
};

const updateAppointment = async (data) => {
  // console.log(accessToken);
  console.log("from axios" + data);
  return await axios
    .put(
      BASE_URL + "/appointment/update",
      { data },
      {
        headers: {
          "x-access-token": accessToken,
          "content-type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};

const createAppointment = async (id, title, status, consultationDate,  doctorId, patientId) => {
  return await axios.post(BASE_URL + "/appointment/add", {
    id,
      title,
      status,
      consultationDate,
      doctorId,
      patientId,
    
  }).then((response)=>
  {
    console.log(response.data);
    if(response.data)
    {
      alert("registerd successfully")
    }
    return response.data;
  }).catch((error)=>{
    if (error.response) {
      console.log('Server responded with status code:', error.response.status);
      console.log('Response data:', error.response.data);
    } else if (error.request) {
      console.log('No response received:', error.request);
    } else {
      console.log('Error creating request:', error.message);
    }
  })
};

const forgetPasswordApi = async (email) => {
  return await axios
    .post(
      BASE_URL + "/forget-password",
      {
        email,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then((response) => {
      return response;
    });
};
const changePasswordApi = async (oldPassword, newPassword, id) => {
  return await axios
    .post(
      BASE_URL + "/change-password",
      {
        oldPassword,
        newPassword,
        id,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then((response) => {
      return response;
    });
};
export {
  createAppointment,
  addDoctor,
  getDoctorById,
  addPrescription,
  getPatientMedicalHistory,
  addDisease,
  getAppointmentByDoctorId,
  updateAppointment,
  updateDoctor,
  updatePatient,
  deleteDoctor,
  deletePatient,
  getAllAppointment,
  getAllDoctor,
  getAllPatient,
  getPatientById,
  predictDisease,
  forgetPasswordApi,
  changePasswordApi,
  getAppointmentByPatientId,
  getPrescriptionByPatientId,
  getAllPrescription
};
