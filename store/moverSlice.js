import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  justRegistered: true,

  personalMoverDetails: {
    uid: "",
    firstName: "",
    lastName: "",
    generatedName: "",
    email: "",
    phone: "",
    address: "",
    personalBio: "",
    profilePictureUrl: "",
    profilePictureName: "",
    registerDate: "",
    lastLogin: "",
    reviewSubmit: false,
    acceptedTerms: false,
    approvalStatus: "UNAPPROVED",
    rating: 0,
    ratingCount: 0,
    currentAcceptedMoves: 0,
    currentPendingMoves: 0,
    completedMoves: 0,
  },

  companyDetails: {
    companyName: "",
    generatedName: "",
    companyNumber: "",
    companyAddress: "",
    companyBio: "",
    companyProfilePixUrl: "",
    companyProfilePixName: "",
    reviewSubmit: false,
  },

  companyDocs: {
    regCertificateUrl: "",
    regCertificateName: "",
    vehInsuranceUrl: "",
    vehInsuranceName: "",
    pubInsuranceUrl: "",
    pubInsuranceName: "",
    tranInsuranceUrl: "",
    tranInsuranceName: "",
    drivingLicenseUrl: "",
    drivingLicenseName: "",
    reviewSubmit: false,
  },

  allMoverData: {
    allPersonalDetails: [],
    allCompanyDetails: [],
    allCompanyPix: [],
    allCompanyDocs: {
      regCertificates: [],
      vehInsurances: [],
      pubInsurances: [],
      tranInsurances: [],
      drivingLicenses: [],
    },
  },
};

export const moverSlice = createSlice({
  name: "mover",
  initialState,
  reducers: {
    updateJustRegistered: (state, action) => {
      state.justRegistered = action.payload;
    },

    resetJustRegistered: (state, action) => {
      state.justRegistered = true;
    },

    updatePersonalMoverDetails: (state, action) => {
      Object.assign(state.personalMoverDetails, action.payload);
    },

    resetPersonalMoverDetails: (state, action) => {
      state.personalMoverDetails = {
        uid: "",
        firstName: "",
        lastName: "",
        generatedName: "",
        email: "",
        phone: "",
        address: "",
        personalBio: "",
        profilePictureUrl: "",
        profilePictureName: "",
        registerDate: "",
        lastLogin: "",
        reviewSubmit: false,
        acceptedTerms: false,
        approvalStatus: "UNAPPROVED",
        rating: 0,
        ratingCount: 0,
      };
    },

    updateCompanyDetails: (state, action) => {
      Object.assign(state.companyDetails, action.payload);
    },

    resetCompanyDetails: (state, action) => {
      state.companyDetails = {
        companyName: "",
        generatedName: "",
        companyNumber: "",
        companyAddress: "",
        companyBio: "",
        companyProfilePixUrl: "",
        companyProfilePixName: "",
        reviewSubmit: false,
      };
    },

    updateCompanyDocs: (state, action) => {
      Object.assign(state.companyDocs, action.payload);
    },

    resetCompanyDocs: (state, action) => {
      state.companyDocs = {
        regCertificateUrl: "",
        regCertificateName: "",
        vehInsuranceUrl: "",
        vehInsuranceName: "",
        pubInsuranceUrl: "",
        pubInsuranceName: "",
        tranInsuranceUrl: "",
        tranInsuranceName: "",
        drivingLicenseUrl: "",
        drivingLicenseName: "",
        reviewSubmit: false,
      };
    },

    updateAllMoverData: (state, action) => {
      Object.assign(state.allMoverData, action.payload);
    },

    resetAllMoverData: (state, action) => {
      state.allMoverData = {
        allPersonalDetails: [],
        allCompanyDetails: [],
        allCompanyPix: [],
        allCompanyDocs: {
          regCertificates: [],
          vehInsurances: [],
          pubInsurances: [],
          tranInsurances: [],
          drivingLicenses: [],
        },
      };
    },
  },
});

export const {
  updateJustRegistered,
  resetJustRegistered,
  updatePersonalMoverDetails,
  resetPersonalMoverDetails,
  updateCompanyDetails,
  resetCompanyDetails,
  updateCompanyDocs,
  resetCompanyDocs,
  updateAllMoverData,
  resetAllMoverData,
} = moverSlice.actions;

export const getAllMoverDetails = (state) => state.mover;

export default moverSlice.reducer;
