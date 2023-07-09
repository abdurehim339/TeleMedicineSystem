const db = require("../models");

const getPatientById = async (req, res) => {
  //const id = req.params.id;
  const id =req.query.id;
  //const id = req.body.id
  //console.log(id);
  try {
    const patientData = await db.User.findOne({
      where: { id: id },
      include: { model: db.Patient, as: "userPatient" },
      //include: { model: db.Clinic, as: "userClinic" }
    });

    //console.log(userPatient.weight);
    console.log("patient", db.Clinic);
    if (!patientData) {
      res.status(404).send("patient not found in this ID");
    } else {
      //console.log(patientData.userPatient.id);
      res.status(200).send(
        JSON.stringify({
          id: patientData.id,
          firstName: patientData.firstName,
          lastName: patientData.lastName,
          email: patientData.email,
          phone: patientData.phone,
          address: patientData.address,
          // weight: patientData.userPatient.weight,
          // bloodGroup: patientData.userPatient.bloodGroup,
        //   location: patientData.userClinic.location,
        //  clinicName: patientData.userClinic.clinicName,
        })
      );
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  try {
    const patient = await db.user.findOne({
      where: { email: email },
    }).catch((err)=>{
      console.log(err);
    });
    // console.log(patient);
    if (!patient) {
      res.status(404).send("user not found");
    } else {
      const isPasswordCorrect = bcrypt.compareSync(password, patient.password);
      if (!isPasswordCorrect) res.status(403).send("incorrect password");
      else {
        res.status(200).send({
          id: patient.id,
          email: patient.email,
          role: patient.role,
          accessToken: authToken.createToken(patient.id, patient.email),
        });
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPatient = async (req, res) => {
  try {
    const patientData = await db.User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "phone",
        "gender",
        "DOB",
        "address",
        "role",
      ],
      where: { role: "patient" },
      include: { model: db.Patient, as: "userPatient" },
    });
    if (!patientData) {
      res.status(404).send("patient not found");
    }
    res.status(200).send(patientData);
  } catch (error) {
    res.status(400).send(error);
  }
};   
const deletepatient = async (req, res) => {
  //const id = req.params.id;
  const id = req.body.id;
  try {
    const deletepatient = await db.User.destroy(
      {
         where: { id: id } 
        
      },
      
    );
    // console.log(updateAppointment);
    if (!deletepatient) {
      res.status(404).send("unable to delete record");
    } else {
      res.status(200).send("DELETED SUCCESSFULLY");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
const createAppointemnt = async (req, res) => {
  const { id, title, description, status, patientId, doctorId } = req.body;
  console.log(req.body);
  try {
    const appointmentModel = await db.Appointment.create({
      id: id,
      title: title,
      description: description,
      status: status,
      doctorId: doctorId,
      patientId: patientId,
    });
    if (appointmentModel) {
      res.status(200).send("appointment added success");
    } else {
      res.status(404).send("faild to create and appointment try again");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
const updatePatientProfile = async (req, res) => {
  const id = req.body.data;
  const firstName=req.body.data;
  const lastName=req.body.data;
  const email=req.body.data;
  const phone=req.body.data;
  const gender= req.body.data;
  const DOB= req.body.data;
  const address= req.body.data;
  try {
    const updatePatientProfile = await db.Appointment.update(
      {
        firstName,
        lastName,
        email,
        phone,
        gender,
        DOB,
        address,

        
      },
      { where: { id: id } }
    );
    // console.log(updateAppointment);
    if (! updatePatientProfile) {
      res.status(404).send("unable to update record");
    } else {
      res.status(200).send("updated success");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};


module.exports = { getAllPatient, getPatientById, login, deletepatient ,createAppointemnt,updatePatientProfile};
