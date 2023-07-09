const express = require("express");
const router = express.Router();
//const verifyToken=require("../middleware/auth/verifyToken")
const doctorController = require("../controller/doctor_controller");
const prescriptionController = require("../controller/prescription_controller");
router.get("/doctor-by-id",doctorController.getDoctorById);
router.get("/all", doctorController.getAllDoctors);
router.post("/add-prescription", prescriptionController.addPrescription);
router.post("/prescription/all", prescriptionController.getAllPrescription);
router.get("/patient-history/by-id", prescriptionController.getMedicalHistory);
router.post("/create-medical-history", doctorController.createMedicalHistory);

module.exports = router;
 