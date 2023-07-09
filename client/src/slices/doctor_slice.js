import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./message_slice";
import {
  addDoctor,
  getDoctorById,
  addPrescription,
  getAllDoctor,
  addDisease,
  updateDoctor,
  predictDisease,
  forgetPasswordApi,
  changePasswordApi,
  deleteDoctor,
} from "../services/user_service";

export const addDoctorData = createAsyncThunk(
  "doctor/add_doctor",
  async (
    {
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
      file,
    },
    thunkAPI
  ) => {
    try {
      const data = await addDoctor(
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
      );
      return { doctorData: data };
    } catch (error) {
      // console.log(error.response.data);
      const message = error.response.data;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const addPrescriptionData = createAsyncThunk(
  "doctor/add_prescription",
  async (
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
    thunkAPI
  ) => {
    try {
      const data = await addPrescription(
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
      );
      return { prescriptionData: data };
    } catch (error) {
      // console.log(error.response.data);
      const message = error.response.data;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const addDiseaseData = createAsyncThunk(
  "admin/add_disease",
  async (
    { id, diseaseName, diseaseCategory, precuation, symptoms },
    thunkAPI
  ) => {
    try {
      const data = await addDisease(
        id,
        diseaseName,
        diseaseCategory,
        precuation,
        symptoms
      );
      return { diseaseData: data };
    } catch (error) {
      // console.log(error.response.data);
      const message = error.response.data;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const getDoctorData = createAsyncThunk(
  "doctor/get_doctor",
  async ({ id }, thunkAPI) => {
    try {
      const doctorData = await getDoctorById(id);
      return doctorData;
    } catch (error) {
      // console.log(error.response.data);
      const message = error.response.data;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const getAllDoctorsAsync = createAsyncThunk(
  "doctor/get_all_doctor",
 async (thunkAPI)=>{
  try{
    const allDoctorData = await getAllDoctor();
    console.log('from doctor slice doctor data', allDoctorData);
    return allDoctorData;
  } catch(error){
    return thunkAPI.rejectWithValue();
  }
 }
)
export const updateDoctorData = createAsyncThunk(
  "doctor/update",
  async ({ data }, thunkAPI) => {
    try {
      console.log("from slice doctor update", data);
      const responseData = await updateDoctor(data);
      return { updatedData: responseData };
    } catch (error) {
      // console.log(error.response.data);
      const message = error.response.data;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const deleteDoctorDataAsync = createAsyncThunk(
  "doctor/delete",
  async ( id , thunkAPI) => {
    try {
      console.log("deleted data", id);
      const responseData = await deleteDoctor(id);
      return { deletedData: responseData };
    } catch (error) {
      // console.log(error.response.data);
      const message = error.response.data;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const getPridictedDisease = createAsyncThunk(
  "doctor/get_predicted_disease",
  async ({ symptomValue }, thunkAPI) => {
    try {
      // console.log("from redux thunk", symptomValue);
      const responseData = await predictDisease(symptomValue);
      // console.log(responseData);
      return responseData;
    } catch (error) {
      // console.log(error.response.data);
      const message = error.response.data;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const forgetPassword = createAsyncThunk(
  "doctor/forget_password",
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
  "doctor/change_password",
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
  status:"idle",
  doctorById: null,
  allDoctorData:[],
  diseaseData: null,
  hasError: false,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorData: (state, action) => {
      // console.log(action.payload);
      return { doctorById: action.payload };
    },
    setAllDoctorData:{reducer (state, action) {
      state.allDoctorData = action.payload
    }},
  },
  extraReducers(builder) {
    builder.addCase(getAllDoctorsAsync.pending,state=>{
      state.status = "idle";
    })
    .addCase(getAllDoctorsAsync.fulfilled,(state,action)=>{
      state.status = "succeeded";
      state.allDoctorData = action.payload;
    })
    .addCase(getAllDoctorsAsync.rejected,state=>{
      state.status = "failed";
    })
    .addCase(deleteDoctorDataAsync.pending,state=>{
      state.status = "idle";
    })
    .addCase(deleteDoctorDataAsync.fulfilled,(state,action)=>{
      state.status = "succeeded";
    })
    .addCase(deleteDoctorDataAsync.rejected,state=>{
      state.status = "failed";
    })
    .addCase(addDoctorData.pending, state => {
      state.isLoading = true;
      state.hasError = false;
    })
    .addCase(addDoctorData.fulfilled,(state, action) => {
      state.isLoading = false;
      state.hasError = false;
    })
    .addCase(addDoctorData.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    })
    .addCase(addDiseaseData.pending,state => {
      state.isLoading = true;
      state.hasError = false;
    }).addCase(addDiseaseData.fulfilled,state => {
      state.isLoading = false;
      state.hasError = false;
    }).addCase(addDiseaseData.rejected,state=> {
      state.isLoading = false;
      state.hasError = true;
    }).addCase(getDoctorData.pending,state => {
      state.isLoading = true;
      state.hasError = false;
    }).addCase(getDoctorData.fulfilled,state => {
      state.isLoading = false;
      state.hasError = false;
    }).addCase(getDoctorData.rejected,state => {
      state.isLoading = false;
      state.hasError = true;
    }).addCase(updateDoctorData.pending,state => {
      state.isLoading = true;
      state.hasError = false;
    }).addCase(updateDoctorData.fulfilled,state => {
      state.isLoading = false;
      state.hasError = false;
})
    builder.addCase(updateDoctorData.rejected,state=> {
      state.isLoading = false;
      state.hasError = true;
    }).addCase(addPrescriptionData.pending,state => {
      state.isLoading = true;
      state.hasError = false;
    }).addCase(addPrescriptionData.fulfilled,state => {
      state.isLoading = false;
      state.hasError = false;
    }).addCase(addPrescriptionData.rejected,state => {
      state.isLoading = false;
      state.hasError = true;
    }).addCase(forgetPassword.pending,state => {
      state.isLoading = true;
      state.hasError = false;
    }).addCase(forgetPassword.fulfilled,state => {
      state.isLoading = false;
      state.hasError = false;
    }).addCase(forgetPassword.rejected,state => {
      state.isLoading = false;
      state.hasError = true;
    }).addCase(changePassword.pending,state => {
      state.isLoading = true;
      state.hasError = false;
    }).addCase(changePassword.fulfilled,state => {
      state.isLoading = false;
      state.hasError = false;
    }).addCase(changePassword.rejected,state => {
      state.isLoading = false;
      state.hasError = true;
    })
  },
});
const { reducer, actions } = doctorSlice;
export const { setDoctorData,setAllDoctorData } = actions;
export default reducer;
