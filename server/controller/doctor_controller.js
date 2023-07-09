const db = require("../models");

const getDoctorById = async (req, res) => {
  const id = req.query.id;
  console.log(id);

  try {
    const doctorData = await db.User.findOne({
      where: { id: id },
      include: { model: db.Doctor, as: "userDoctor" },
    });
    // console.log("doctor", doctorData);
    if (!doctorData) {
      res.status(404).send("doctor not found in this ID");
    } else {
      res.status(200).send(
        JSON.stringify({
          id: doctorData.id,
          firstName: doctorData.firstName,
          lastName: doctorData.lastName,
          email: doctorData.email,
          phone: doctorData.phone,
          address: doctorData.address,
          role: doctorData.role,
          specialization: doctorData.userDoctor.specialization,
          imageURL: doctorData.userDoctor.imagePath,
        })
      );
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
const getMedicalHistoryByPatientId = async (req, res) => {
  const patientId = req.query;
  try {
    const patientMedicalHistory = await db.MedicalHistory.findOne({
      where: { patientId: patientId },
      order: [["updatedAt", "DESC"]],
      include: [
        { model: db.Doctor, as: "doctorMedicalHistory" },
        { model: db.Patient, as: "patientMedicalHistory" },
        { model: db.Prescription, as: "PrescriptionHistory" },
      ],
    });
    if (!patientMedicalHistory) res.status(404).send("data not found");

    res.status(200).send({
      message: "patient Medical History",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
const createMedicalHistory = async (req, res) => {
  const {
    id,
    compliant,
    investigationResult,
    treatment,
    doctorId,
    patientId,
    prescriptionId,
  } = req.body;

console.log(id);

  try {
    const medicalHistoryModel = await db.Medical_history.create({
      id: id,
      compliant: compliant,
      investigationResult: investigationResult,
      treatment: treatment,
      doctorId: doctorId,
      patientId: patientId,
      prescriptionId: prescriptionId,
    });
    res.status(200).send({
      message: "medical history data added success",
      data: medicalHistoryModel,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
const updatePatientProfile = async (req, res) => {
  const id = req.params.data;
  const firstName=req.body.data;
  const lastName=req.body.data;
  const email=req.body.data;
  const phone=req.body.data;
  const gender= req.body.data;
  const DOB= req.body.data;
  const address= req.body.data;
  try {
    const updatePatientProfile = await db.Patient.update(
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



module.exports = {
  getDoctorById,
  getAllDoctors,
  getMedicalHistoryByPatientId,
  createMedicalHistory,
  updatePatientProfile
};
