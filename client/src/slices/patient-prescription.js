import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./message_slice";
import {
    getPrescriptionByPatientId,
   
    getAllPrescription,
  } from "../services/user_service";
  export const getPrescriptionData = createAsyncThunk(
    "/prescription/by-patientId",
    async ({ id }, thunkAPI) => {
      try {
        console.log(id);
        const prescriptionData = await getPrescriptionByPatientId(id);
  
        thunkAPI.dispatch(setPrescriptionData(prescriptionData));
      } catch (error) {
        // console.log(error.response.data);
        const message = error.response.data;
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
      }
    }
  );
  export const getAllPrescriptionData = createAsyncThunk(
    "prescription/get-all",
    async ({ id }, thunkAPI) => {
      try {
        const allPrescriptionData = await getAllPrescription();
  
        thunkAPI.dispatch(setAllPrescriptionData(allPrescriptionData));
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
    prescriptionByPatientId: null,
    allPrescriptionData: null,
    hasError: false,
  };
  
  const prescriptionSlice = createSlice({
    name: "prescription",
    initialState,
    reducers: {
      setPrescriptionData: (state, action) => {
        // console.log(action.payload);
        return { prescriptionByPatientId: action.payload };
      },
      setAllPrescriptionData: (state, action) => {
        return { allPrescriptionData: action.payload };
      },
    },
    extraReducers: {
        [getPrescriptionData.pending]: (state, action) => {
          state.isLoading = true;
          state.hasError = false;
        },
        [getPrescriptionData.fulfilled]: (state, action) => {
          state.isLoading = false;
          state.hasError = false;
        },
        [getPrescriptionData.rejected]: (state, action) => {
          state.isLoading = false;
          state.hasError = true;
        },
        
      },
    });
    
    const { reducer, actions } = prescriptionSlice;
    export const { setPrescriptionData, setAllPrescriptionData } = actions;
    export default reducer