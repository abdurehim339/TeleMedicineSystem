const db = require("../models");
const express = require("express");
const router = express.Router();

// const createAppointemnt= async (req, res) => {
//   try {
//     req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
//     req.body.time = moment(req.body.time, "HH:mm").toISOString();
//     req.body.status = "pending";
//     const newAppointment = new appointmentModel(req.body);
//     await newAppointment.save();
//     const user = await db.User.findOne({ _id: req.body.doctorInfo.userId });
//     user.notifcation.push({
//       type: "New-appointment-request",
//       message: `A nEw Appointment Request from ${req.body.userInfo.name}`,
//       onCLickPath: "/user/appointments",
//     });
//     await user.save();
//     res.status(200).send({
//       success: true,
//       message: "Appointment Book succesfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error While Booking Appointment",
//     });
//   }
// };


const createAppointemnt = async (req, res) => {
  const { id, title, status,consultationDate, patientId, doctorId } = req.body;
  // console.log(req.body);
  try {
    const appointmentModel = await db.Appointment.create({
      id: id,
      title: title,
      status: status,
      consultationDate: consultationDate,
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

const getAllAppointment = async (req, res) => {
  try {
    const allAppointment = await db.Appointment.findAll({
      include: [
        {
          model: db.Doctor,
          as: "AppointmentDoctor",
          include: [{ model: db.User, as: "doctorUser" }],
        },
        {
          model: db.Patient,
          as: "AppointmentPatient",
          include: { model: db.User, as: "userPatient" },
        },
      ],
    });
    res.status(200).send(allAppointment);
  } catch (error) {
    console.log(error);
    res.status(400).send(JSON.stringify(error));
  }
};
// booking bookingAvailabilityController
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await db.Appointment.find({
      doctorId,
      date,
      time: { 
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};


// const getAllAppointment = async (req, res) => {
//   try {
//     const allAppointment = await db.Appointment.findAll({
//       include: [
//         {
//           model: db.Doctor,
//           as: "appointmentDoctor",
//           include: [{ model: db.User, as: "doctorUser" }],
//         },
//         {
//           model: db.Patient,
//           as: "appointmentPatient",
//           include: [{ model: db.User, as: "userPatient" }],
//         },
//       ],
//     });
//     res.status(200).send(allAppointment);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(JSON.stringify(error));
//   }
// };
const getAppointmentByPatientId = async (req, res) => {
  var id = req.query.id;
  try {
    const patientAppointment = await db.Appointment.findAll({
      where: { patientId: id },
      include: [
        { model: db.Doctor, as: "AppointmentDoctor" },
        { model: db.Patient, as: "AppointmentPatient" },
      ],
    });
    res.status(200).send(patientAppointment);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAppointmentByStatus = async (req, res) => {
  const { id, status } = req.query;

  try {
    const patientAppointment = await db.Appointment.findAll({
      where: { patientId: id, status: status },
      include: [
        {
          model: db.Doctor,
          as: "AppointmentDoctor",
          include: [{ model: db.User, as: "doctorUser" }],
        },
        {
          model: db.Patient,
          as: "AppointmentPatient",
          include: [{ model: db.User, as: "userPatient" }],
        },
      ],
    });
    if (!patientAppointment) {
      res.status(200).send("appointment not found");
    } else {
      res.status(200).send(patientAppointment);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAppointmentByDoctorId = async (req, res) => {
  var id = req.query.id;
  console.log("doctor"+id);
  try {
    const doctorAppointment = await db.Appointment.findAll({
      where: { doctorId: id },
      include: [
        {
          model: db.Patient,
          as: "AppointmentPatient",
          include: [{ model: db.User, as: "userPatient" }],
        },
      ],
    });
     doctorAppointment.map((Appointment) => {
       console.log(Appointment.AppointmentPatient.userPatient.email);
    });
    if (!doctorAppointment) {
      res.status(404).send("appointment not found");
    } else {
      res.status(200).send(doctorAppointment);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const updateAppointment = async (req, res) => {
  const id = req.body.id;
  const title=req.body.title;
  const status=req.body.status;
  const consultationDate=req.body.consultationDate;
  try {
    const updateAppointment = await db.Appointment.update(
      {
        title:title,
        status: status,
        consultationDate: consultationDate,
        
      },
      { where: { id: id } }
    );
    // console.log(updateAppointment);
    if (!updateAppointment) {
      res.status(404).send("unable to update record");
    } else {
      res.status(200).send("updated success");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const deleteAppointment = async (req, res) => {
  //const id = req.params.id;
  const id = req.body.id;
  try {
    const deleteAppointment = await db.Appointment.destroy(
      {
         where: { id: id } 
        
      },
      
    );
    // console.log(updateAppointment);
    if (!deleteAppointment) {
      res.status(404).send("unable to delete record");
    } else {
      res.status(200).send("DELETED SUCCESSFULLY");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};





module.exports = {
  createAppointemnt,
  getAllAppointment,
  getAppointmentByPatientId,
  getAppointmentByDoctorId,
  updateAppointment,
  getAppointmentByStatus,
  deleteAppointment,
  bookingAvailabilityController
};
