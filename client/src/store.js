import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth_slice";
import doctorReducer from "./slices/doctor_slice";
import patientReducer from "./slices/Patient_slice ";
import { alertSlice } from "./slices/alertSilce";
import { userSlice } from "./slices/userSlice";
import messageReducer from "./slices/message_slice";
import appointmentReducer from "./slices/doctor_appointment_slice";
import prescriptionReducer from "./slices/patient-prescription"
import appointmentReducer1 from "./slices/patient_appointment_slice ";
import AdminReducer from "./slices/admin_slice";
const reducer = {
  auth: authReducer,
  doctor: doctorReducer,
  patient: patientReducer,
  appointment: appointmentReducer,
  //appointment1: appointmentReducer1,
  prescription:prescriptionReducer,
  alerts: alertSlice.reducer,
  user: userSlice.reducer,
  adminStore: AdminReducer,
  message: messageReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});
export default store;
