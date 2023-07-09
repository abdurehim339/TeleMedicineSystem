import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./message_slice";
import {
  getPatientById,
  createAppointment,
  forgetPasswordApi,
  changePasswordApi,
  updatePatient,
  getAllPatient,
  deletePatient,
getAppointmentByPatientId,
getPrescriptionByPatientId

} from "../services/user_service";

export const updatePatientData = createAsyncThunk(
  "patient/update",
  async ({ data }, thunkAPI) => {
    try {
      console.log("from slice doctor update", data);
      const responseData = await updatePatient(data);
      return { updatedData: responseData };
    } catch (error) {
      // console.log(error.response.data);
      const message = error.response.data;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getPatientData = createAsyncThunk(
  "patient/get_patient",
  async ({ id }, thunkAPI) => {
    try {
      console.log(id);
      const patientData = await getPatientById(id);
      console.log(patientData);
      return patientData;

    } catch (error) {
      console.log(error.response.data);
      const message = error.response.data;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const bookAppointment = createAsyncThunk(
  "/patient/book_appointment",
  async (
    {
      id,
      title,
      status,
      consultationDate,
      doctorId,
      patientId
    },
    thunkAPI
  ) => {
    try {
      const data = await createAppointment(
        id,
        title,
        status,
        consultationDate,
        doctorId,
        patientId
      );
      return { appointmentData: data };
    } catch (error) {
      // console.log(error.response.data);
      const message = error.response.data;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);


export const getAllPatientsAsync = createAsyncThunk(
  "doctor/get_all_patient",
 async (thunkAPI)=>{
  try{
    const allPatientData = await getAllPatient();
    console.log('from doctor slice doctor data', allPatientData);
    return allPatientData;
  } catch(error){
    return thunkAPI.rejectWithValue();
  }
 }
)


export const deletePatientDataAsync = createAsyncThunk(
  "doctor/delete",
  async ( id , thunkAPI) => {
    try {
      console.log("deleted data", id);
      const responseData = await deletePatient(id);
      return { deletedData: responseData };
    } catch (error) {
      // console.log(error.response.data);
      const message = error.response.data;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "patient/forget_password",
  async ({ email }, thunkAPI) => {
    try {
      const data = await forgetPasswordApi(email);
      return data;
    } catch (error) {
      // console.log(error.response.data);
      const message = error.response.data;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const changePassword = createAsyncThunk(
  "patient/change_password",
  async ({ oldPassword, newPassword, id }, thunkAPI) => {
    try {
      const data = await changePasswordApi(oldPassword, newPassword, id);
      return data;
    } catch (error) {
      // console.log(error.response.data);
      const message = error.response.data;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
const initialState = {
  isLoading: false,
  patientById: null,
  diseaseData: null,
  hasError: false,
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatientData: (state, action) => {
      // console.log(action.payload);
      return { patientById: action.payload };
    },

  },
  extraReducers: {
    
    
    [getPatientData.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [getPatientData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
    },
    [getPatientData.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },

    [updatePatientData.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updatePatientData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
    },
    [updatePatientData.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
   
   
    [forgetPassword.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [forgetPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
    },
    [forgetPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [changePassword.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
    },
    [changePassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});
const { reducer, actions } = patientSlice;
export const { setPatientData } = actions;
export default reducer;
