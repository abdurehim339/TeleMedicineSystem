const express = require("express");
const router = express.Router();
const patientController = require("../controller/patient_controller");
const doctorController = require("../controller/doctor_controller");
const medicalHistoryController = require("../controller/medicalHistory_controller");
const prescriptionController=require("../controller/prescription_controller")
const appointmentController=require("../controller/appointment_controller")
router.get("/by-id", patientController.getPatientById);
router.get("/all", patientController.getAllPatient);
router.put("/editprofile/:id", patientController.updatePatientProfile);
//router.get("/login",patientController.login)
router.get("/delete",patientController.deletepatient)
router.get("./medical_history",medicalHistoryController.getMedicalHistoryByPatientId)
router.get('/allDoctor',doctorController.getAllDoctors)
router.get('/allDoctor',doctorController.getDoctorById)
router.get('./download_prescription',prescriptionController.getPrescriptionById)
router.get('/prescription/by-patientId',prescriptionController.getPrescriptionByPatientId)
//router.get('/prescription/by-patientId',prescriptionController.getAllPrescription)
router.get('./all',patientController.getAllPatient)
router.post('./book_appointment',appointmentController.createAppointemnt)
router.post('./booking-availbility',appointmentController.bookingAvailabilityController)
//router.post("./")

module.exports = router;
