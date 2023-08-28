import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  justRegistered: true,

  personalDetails: {
    uid: "",
    firstName: "",
    lastName: "",
    generatedName: "",
    email: "",
    phone: "",
    address: "",
    personalBio: "",
    // profilePictureRaw: "",
    profilePictureUrl: "",
    profilePictureName: "",
    registerDate: "",
    lastLogin: "",
    reviewSubmit: false,
    acceptedTerms: false,
    approvalStatus: "UNAPPROVED",
    rating: 0,
    ratingCount: 0,
    // isAdmin: false,
  },

  companyDetails: {
    companyName: "",
    generatedName: "",
    companyNumber: "",
    companyAddress: "",
    companyBio: "",
    // companyProfilePixRaw: "",
    companyProfilePixUrl: "",
    companyProfilePixName: "",
    reviewSubmit: false,
  },
  companyDocs: {
    // regCertificateRaw: "",
    regCertificateUrl: "",
    regCertificateName: "",
    // vehInsuranceRaw: "",
    vehInsuranceUrl: "",
    vehInsuranceName: "",
    // pubInsuranceRaw: "",
    pubInsuranceUrl: "",
    pubInsuranceName: "",
    // tranInsuranceRaw: "",
    tranInsuranceUrl: "",
    tranInsuranceName: "",
    // drivingLicenseRaw: "",
    drivingLicenseUrl: "",
    drivingLicenseName: "",
    reviewSubmit: false,
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
