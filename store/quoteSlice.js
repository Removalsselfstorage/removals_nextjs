import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAMover: false,
  // LocationDetails
  serviceLocation: {
    moveService: 'Home removals',
    locationFrom: {
      name: 'Lagos',
      postCode: '1001',
      city: 'Lagos island',
      state: 'Lagos',
      country: 'Nigeria',
      floor: 1,
      liftAvailable: false,
    },
    locationTo: {
      name: 'Abuja',
      postCode: '1003',
      city: 'Gusse',
      state: 'Abuja',
      country: 'Nigeria',
      floor: 3,
      liftAvailable: true,
    },
  },

  // personalDetails
  personalDetails: {
    firstName: 'Ifeanyi',
    lastName: 'Umeh',
    Email: 'ifeanyi@gmail.com',
    countryCode: '+234',
    telephone: '08167467084',
  },

  // moveDetails
  moveDetails: {
    propertyType: 'Studio flat',
    numberOfMovers: 2,
    mileage: '151-200',
    volume: '300',
    duration: '3 hours',
    moveDate: '21-07-2023',
    movePackage: 'Gold',
  },

  // moverDetails
  moverDetails: {
    moverName: 'Plaza Removals',
    moveTime: '12pm - 3pm',
  },
  // paymentDetails
  paymentDetails: {
    comment: '',
    createAccount: true,
    paymentMethod: 'Credit card',
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
