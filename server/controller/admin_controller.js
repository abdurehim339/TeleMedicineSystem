const db = require("../models");
const bcrypt = require("bcryptjs");
const authToken = require("../middleware/auth");

const createAdmin = async (req, res) => {
  const { id, firstName, lastName, email, password, phone } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  try {
    const createdModel = await db.Admin.create({
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
      phone: phone,
    });
    res
      .status(200)
      .send({ message: "admin table created success", data: createdModel });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email)
    const admin = await db.Admin.findOne({
      where: { email: email },
    }).catch((err)=>{
      console.log(err);
    });
    console.log(admin);
    if (!admin) {
      res.status(404).send("user not found");
    } else {
      const isPasswordCorrect = bcrypt.compareSync(password, admin.password);
      if (!isPasswordCorrect) res.status(403).send("incorrect password");
      else {
        res.status(200).send({
          id: admin.id,
          email: admin.email,
          role: admin.role,
          accessToken: authToken.createToken(admin.id, admin.email),
        });
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctorData = await db.User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "phone",
        "gender",
        "DOB",
        "address",
       // "role",
      ],
      where: { role: "doctor" },
      include: { model: db.Doctor, as: "userDoctor" },
    });
    // console.log(doctorData);
    if (!doctorData) {
      res.status(404).send("doctor not found");
    }
    res.status(200).send(JSON.stringify(doctorData));
  } catch (error) {
    console.log(error);
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
const addDoctor = async (req, res) => {
  // console.log(req.body);
  const {
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
  } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  try {
    const doctorModel = await db.User.create(
      {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        phone: phone,
        gender: gender,
        DOB: DOB,
        address: address,
        role: "doctor",
        userDoctor: {
          id: id,
          imagePath: req.file.path,
          specialization: specialization,
        },
      },
      {
        include: [{ model: db.Doctor, as: "userDoctor" }],
      }
    );
    res.status(200).send({
      message: "Doctor data added Success",
      data: doctorModel,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
const addDisease = async (req, res) => {
  const { id, diseaseName, diseaseCategory, precuation, symptoms } = req.body;
  // console.log(req.body);
  try {
    const diseaseModel = await db.Disease.create({
      id: id,
      diseaseName: diseaseName,
      category: diseaseCategory,
      precuation: precuation,
    });
    const symptomModel = await db.Symptom.bulkCreate(symptoms);
    if (diseaseModel && symptomModel)
      await diseaseModel.addSymptom(symptomModel);
    res.status(200).send({
      message: "disease table created success",
      data: JSON.stringify(diseaseModel),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
const createSchedule = async (req, res) => {
  const { id, workingDays, startTime, endTime, doctorId } = req.body;

  try {
    const scheduleModel = await db.Schedule.create({
      id: id,
      workingDays: workingDays,
      startTime: startTime,
      endTime: endTime,
      doctorId: doctorId,
    });
    res.status(200).send({
      message: "Doctor Schedule created Success",
      data: scheduleModel,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
const updateDoctorData = async (req, res) => {
  const {id,firstName,lastName,email,phone,gender,address} = req.body.data; 
  // console.log(req.body);
  try {
    const updateDoctor = await db.User.update(
      {
        id:id,
        firstName:firstName,
        lastName:lastName,
        email:email,
        phone:phone,
        gender:gender,
        address:address,
      },
      { where: { id: id } }
    );
    console.log(updateDoctor);
    if (!updateDoctor) {
      res.status(404).send("unable to update record");
    } else {
      console.log("update success");
      res.status(200).send("updated success");
    
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
  
}

const updatePatientData = async (req, res) => {
  const {id,firstName,lastName,email,phone,gender,address} = req.body.data; 
  // console.log(req.body);
  try {
    const updatePatient = await db.User.update(
      {
        id:id,
        firstName:firstName,
        lastName:lastName,
        email:email,
        phone:phone,
        gender:gender,
        address:address,
      },
      { where: { id: id } }
    );
    console.log(updatePatient);
    if (!updatePatient) {
      res.status(404).send("unable to update record");
    } else {
      console.log("update success");
      res.status(200).send("updated success");
    
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
  
}


const deletePatientData = async (req, res) => {
  console.log("delete called");
  const id  = req.body.id;
  console.log(req.body);
  try {
    const deleteDoctor = await db.User.destroy(
      { where: { id: id } }
    );
    console.log(deleteDoctor);
    if (!deleteDoctor) {
      res.status(404).send("unable to update record");
    } else {
      console.log("delete data success");
      res.status(200).send("delete data success");
    
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
  
}

const deleteDoctorData = async (req, res) => {
  console.log("delete called");
  const id  = req.body.id;
  console.log(req.body);
  try {
    const deleteDoctor = await db.User.destroy(
      { where: { id: id } }
    );
    console.log(deleteDoctor);
    if (!deleteDoctor) {
      res.status(404).send("unable to update record");
    } else {
      console.log("delete data success");
      res.status(200).send("delete data success");
    
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
  
}
const updatePatientProfile = async (req, res) => {
  const id = req.params.id;
  const firstName=req.body.firstName;
  const lastName=req.body.lastName;
  const email=req.body.email;
  const phone=req.body.phone;
  const gender= req.body.gender;
  const DOB= req.body.DOB;
  const address= req.body.address;
  try {
    const updatePatientProfile = await db.User.update(
      {
        firstName:firstName,
        lastName:lastName,
        email:email,
        phone:phone,
        gender:gender,
        DOB:DOB,
        address:address
        
      },
      { where: { id: id } }
    );
  console.log(id)
    if (! updatePatientProfile) {
      res.status(404).send("unable to update record");
    } else {
      res.status(200).send("updated success");
      console.log(firstName );
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
  
 
};
// Change everyone without a last name to "Doe"
//  Patient.update({ firstName:ame,lastName:gubay }, {
//   where: {
//     { id: 12 }
//   }
// });
const deletePatient = async (req, res) => {
  //const id = req.params.id;
  const id = req.body.id;
  try {
    const deletePatient = await db.Patient.destroy(
      {
         where: { id: id } 
        
      },
      
    );
    console.log(id);
    if (!deletePatient) {
      res.status(404).send("unable to delete record");
    } else {
      res.status(200).send("DELETED SUCCESSFULLY");
      console.log(id);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
module.exports = {
  createAdmin,
  addDoctor,
  addDisease,
  createSchedule,
  login,
  getAllPatient,
  getAllDoctors,
  updatePatientProfile,
  updateDoctorData,
  deleteDoctorData,
  deletePatient,
  updatePatientData,
  deletePatientData
};
