import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAMover: false,
  // LocationDetails
  serviceLocation: {
    moveService: 'Select',
    locationFrom: {
      name: 'Search location...',
      postCode: '',
      city: '',
      state: '',
      country: '',
      floor: 1,
      liftAvailable: false,
    },
    locationTo: {
      name: 'Search location...',
      postCode: '',
      city: '',
      state: '',
      country: '',
      floor: 1,
      liftAvailable: false,
    },
  },

  // personalDetails
  personalDetails: {
    firstName: '',
    lastName: '',
    Email: '',
    countryCode: '',
    telephone: '',
  },

  // moveDetails
  moveDetails: {
    propertyType: '',
    numberOfMovers: 1,
    mileage: '',
    volume: '',
    duration: '',
    moveDate: '',
    movePackage: '',
  },

  // moverDetails
  moverDetails: {
    moverName: '',
    moveTime: '',
  },
  // paymentDetails
  paymentDetails: {
    comment: '',
    createAccount: true,
    paymentMethod: '',
    paidPart: true,
    paidFull: false,
  },
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    updateLocationDetails: (state, action) => {
      state.serviceLocation = action.payload;
    },
    updatePersonalDetails: (state, action) => {
      state.personalDetails = action.payload;
    },
    updateMoveDetails: (state, action) => {
      state.moveDetails = action.payload;
    },
    updateMoverDetails: (state, action) => {
      state.moverDetails = action.payload;
    },
    updatePaymentDetails: (state, action) => {
      state.paymentDetails = action.payload;
    },
  },
});

export const {
  updateLocationDetails,
  updatePersonalDetails,
  updateMoveDetails,
  updateMoverDetails,
  updatePaymentDetails,
} = quoteSlice.actions;

export const getAllDetails = (state) => state.quote;

// export const LocationDetails = (state) => state.quote.serviceLocation;

// export const getLatestQuote = (state) =>
//   state.quote.quoteDetails[state.quote.quoteDetails.length - 1];

export default quoteSlice.reducer;
