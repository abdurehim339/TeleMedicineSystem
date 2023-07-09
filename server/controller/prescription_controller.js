const { date } = require("joi");
const db = require("../models");

const addPrescription = async (req, res) => {
  const {
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

  } = req.body;
  console.log("doc"+id);
  try {
    const isPrescriptionFound = await db.Prescription.findOne({
      where: {
        patientId: patientId,
        dosage: dosage,
        description: description,
        medicineName: medicineName,
      },
    });
    if (isPrescriptionFound) {
      res.status(409).send("prescription already found");
    } else {
      const prescriptionModel = await db.Prescription.create(
        {
          id: id,
          diseaseName: diseaseName,
          medicineName: medicineName,
          description: description,
          dosage: dosage,
          doctorId: doctorId,
          patientId: patientId,
          prescriptionHistory: {
            id: id,
            compliant: compliant,
            investigationResult: investigationResult,
            treatment: treatment,
            doctorId: doctorId,
            patientId: patientId,
            prescriptionId: id,
          },
        },
        {
          include: [{ model: db.Medical_history, as: "prescriptionHistory" }],
        }
      );
      console.log("hello"+prescriptionModel);

      if (!prescriptionModel) {
        res.status(404).send("Error while creating prescription");
      } else {
        res.status(200).send("prescription data added success");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("bad request error");
  }
};

const getAllPrescription = async (req, res) => {
  try {
    const allPrescription = await db.Prescription.findAll({
      include: [
        { model: db.Doctor, as: "doctorPrescription" },
        { model: db.Patient, as: "patientPrescription" },
      ],
    });
    console.log(allPrescription);
    res.status(200).send({
      message: "all prescription",
      data: allPrescription,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
const getMedicalHistory = async (req, res) => {
  let patientId = req.query.id;
  console.log(patientId);
  try {
    const medicalHistory = await db.User.findOne({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "phone",
        "gender",
        "DOB",
        "address",
      ],
      where: { id: patientId },
      include: [
        {
          model: db.Patient,
          as: "userPatient",
          include: [
            {
              model: db.Prescription,
              as: "patientPrescription",
              include: [
                {
                  model: db.Medical_history,
                  as: "prescriptionHistory",
                  include: [
                    {
                      model: db.Doctor,
                      as: "historyDoctor",
                      include: [
                        {
                          model: db.User,
                          as: "doctorUser",
                          attributes: [
                            "id",
                            "firstName",
                            "lastName",
                            "email",
                            "phone",
                            "gender",
                            "DOB",
                            "address",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
           ],
         },
      ],
    });
    
    if (!medicalHistory) {
      res.status(404).send("data not found");
      console.log("data not found");
    } else {
      //console.log(medicalHistory);
      res.status(200).send(medicalHistory);
    }
  } catch (error) {
    console.log("sadsbf"+error);
    res.status(400).send(error);
  }
};
const getPrescriptionById = async (req, res) => {
  const patientId = req.query;
  try {
    const patientPrescription = await db.Prescription.findOne({
      where: { patientId: patientId },
      order: [["updatedAt", "DESC"]],
      include: [
        //{ model: db.Doctor, as: "doctorMedicalHistory" },
        { model: db.Patient, as: "patientMedicalHistory" },
        //{ model: db.Prescription, as: "PrescriptionHistory" },
      ],
    });
    if (!patientPrescription) res.status(404).send("data not found");

    res.status(200).send({
      message: "patient prescription is here",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
const getPrescriptionByPatientId = async (req, res) => {
  var id = req.params.id;
  console.log("patient "+id);
  try {
    const patientPrescription = await db.Prescription.findAll({
      where: { patientId: id },
      include: [
        {
          model: db.Patient,
          as: "PrescriptionPatient",
          include: [{ model: db.User, as: "userPatient" }],
        },
      ],
    });
     patientPrescription.map((prescription) => {
       console.log(prescription.PrescriptionPatient.userPatient.email);
    });
    if (!patientPrescription) {
      res.status(404).send("prescription not found");
    } else {
      res.status(200).send(patientPrescription);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
module.exports = {
  addPrescription,
  getAllPrescription,
  getMedicalHistory,
  getPrescriptionById,
  getPrescriptionByPatientId
  
};
