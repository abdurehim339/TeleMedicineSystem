import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message_slice";
import authService from "../services/auth_service";
//import { Link, useLocation, useNavigate } from "react-router-dom";
const user = JSON.parse(localStorage.getItem("user"));
//const navigate=useNavigate();
export const register = createAsyncThunk(
 "auth/register",
  async ({ 
    //id,
    firstName,
    lastName, 
    email, 
    password,
    phone,
    gender,
    DOB,
    address,
    //role,
    weight,
     bloodGroup,
  //   location,
  // clinicName
  }, thunkAPI) => {
    try {
      const response = await authService.register(
      firstName, lastName, email, password,phone,gender,DOB,address,weight,bloodGroup);
      thunkAPI.dispatch(setMessage(response.data.message));
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log('Server responded with status code:', error.response.status);
        console.log('Response data:', error.response.data);
      } else if (error.request) {
        console.log('No response received:', error.request);
      } else {
        console.log('Error creating request:', error.message);
      }
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, pathname }, thunkAPI) => {
    try {
      const data = await authService.login(email, password, pathname);
      return { user: data };
    } catch (error) {
      console.log(error.response.data);
      const message = error.response.data;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const logout = createAsyncThunk("auth/logout", () => {

  authService.logout();

  
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn:  false, user:null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    
    [register.fulfilled]:(state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]:(state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]:(state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
   
  }
});
const { reducer } = authSlice;
export default reducer;

 

