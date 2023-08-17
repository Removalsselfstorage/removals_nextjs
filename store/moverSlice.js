import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  justRegistered: false,
  personalDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phone: null,
    address: "",
    personalBio: "",
    profilePictureRaw: null,
    profilePicture: null,
    companyName: "",
    companyNumber: "",
    companyAddress: "",
    regCertificate: null,
    vehInsurance: null,
    pubInsurance: null,
    tranInsurance: null,
    drivingLicense: null,
  },
};

export const moverSlice = createSlice({
  name: "mover",
  initialState,
  reducers: {
    updateMoverPersonalDetails: (state, action) => {
      state.personalDetails = action.payload;
    },
    updateJustRegistered: (state, action) => {
      state.justRegistered = action.payload;
    },
  },
});

export const { updateMoverPersonalDetails, updateJustRegistered } =
  moverSlice.actions;

export const getAllMoverDetails = (state) => state.mover;

export default moverSlice.reducer;
