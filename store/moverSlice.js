import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  justRegistered: false,
  firebaseMoverDetails: {},
  firebaseMoverDoc: {},
  firebaseCompanyPix: {},
  firebaseRegCertificate: {},
  firebaseVehInsurance: {},
  firebasePubInsurance: {},
  firebaseTranInsurance: {},
  firebaseDrivingLicense: {},
  personalDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phone: null,
    address: "",
    personalBio: "",
    companyBio: "",
    companyProfilePix: {
      name: "",
      raw: null,
      url: null,
    },
    profilePicture: {
      name: "",
      raw: null,
      url: null,
    },
    companyName: "",
    companyNumber: "",
    companyAddress: "",
    regCertificate: {
      name: "",
      raw: null,
      url: null,
    },
    vehInsurance: {
      name: "",
      raw: null,
      url: null,
    },
    pubInsurance: {
      name: "",
      raw: null,
      url: null,
    },
    tranInsurance: {
      name: "",
      raw: null,
      url: null,
    },
    drivingLicense: {
      name: "",
      raw: null,
      url: null,
    },
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
    updateFirebaseMoverDetails: (state, action) => {
      state.firebaseMoverDetails = action.payload;
    },
    updateFirebaseMoverDoc: (state, action) => {
      state.firebaseMoverDoc = action.payload;
    },
    updateFirebaseCompanyPix: (state, action) => {
      state.firebaseCompanyPix = action.payload;
    },
    updateFirebaseRegCertificate: (state, action) => {
      state.firebaseRegCertificate = action.payload;
    },
    updateFirebaseVehInsurance: (state, action) => {
      state.firebaseVehInsurance = action.payload;
    },
    updateFirebasePubInsurance: (state, action) => {
      state.firebasePubInsurance = action.payload;
    },
    updateFirebaseTranInsurance: (state, action) => {
      state.firebaseTranInsurance = action.payload;
    },
    updateFirebaseDrivingLicense: (state, action) => {
      state.firebaseDrivingLicense = action.payload;
    },
  },
});

export const {
  updateMoverPersonalDetails,
  updateJustRegistered,
  updateFirebaseMoverDetails,
  updateFirebaseMoverDoc,
  updateFirebaseCompanyPix,
  updateFirebaseRegCertificate,
  updateFirebaseVehInsurance,
  updateFirebasePubInsurance,
  updateFirebaseTranInsurance,
  updateFirebaseDrivingLicense,
} = moverSlice.actions;

export const getAllMoverDetails = (state) => state.mover;

export default moverSlice.reducer;
