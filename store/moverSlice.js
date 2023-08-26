import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  justRegistered: true,

  personalDetails: {
    uid: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    personalBio: "",
    profilePicture: {
      raw: "",
      url: "",
      name: "",
    },
    registerDate: "",
    lastLogin: "",
    reviewSubmit: false,
    acceptedTerms: false,
    // isAdmin: false,
  },

  companyDetails: {
    companyName: "",
    generatedName: "",
    companyNumber: "",
    companyAddress: "",
    companyBio: "",
    companyProfilePix: {
      raw: "",
      url: "",
      name: "",
    },
    reviewSubmit: false
  },
  companyDocs: {
    regCertificate: {
      raw: "",
      url: "",
      name: "",
    },
    vehInsurance: {
      raw: "",
      url: "",
      name: "",
    },
    pubInsurance: {
      raw: "",
      url: "",
      name: "",
    },
    tranInsurance: {
      raw: "",
      url: "",
      name: "",
    },
    drivingLicense: {
      raw: "",
      url: "",
      name: "",
    },
    reviewSubmit: false
  },
};

export const moverSlice = createSlice({
  name: "mover",
  initialState,
  reducers: {
    updateJustRegistered: (state, action) => {
      state.justRegistered = action.payload;
    },
    updatePersonalDetails: (state, action) => {
      state.personalDetails = action.payload;
    },
    updateCompanyDetails: (state, action) => {
      state.companyDetails = action.payload;
    },
    updateCompanyDocs: (state, action) => {
      state.companyDocs = action.payload;
    },
  },
});

export const {
  updateJustRegistered,
  updatePersonalDetails,
  updateCompanyDetails,
  updateCompanyDocs,
} = moverSlice.actions;

export const getAllMoverDetails = (state) => state.mover;

export default moverSlice.reducer;
