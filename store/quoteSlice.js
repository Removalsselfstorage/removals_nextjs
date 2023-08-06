import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAMover: false,
  // LocationDetails
  serviceLocation: {
    // moveService: '',
    locationFrom: {
      name: '',
      postCode: '',
      city: '',
      state: '',
      country: '',
      floor: 0,
      liftAvailable: false,
    },
    locationTo: {
      name: '',
      postCode: '',
      city: '',
      state: '',
      country: '',
      floor: 0,
      liftAvailable: false,
    },
  },

  // personalDetails
  personalDetails: {
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    telephone: '',
  },

  // moveDetails
  moveDetails: {
    propertyType: '',
    numberOfMovers: '',
    mileage: '',
    volume: '',
    duration: 3,
    moveDate: '',
    moveDateRaw: '',
    movePackage: '',
    quoteRef: '',
    initialPackagePrice: 0,
    
  },

  // moverDetails
  moverDetails: {
    moverName: '',
    moverTime: '',
    moverPrice: '',
    priceSecondDay: '',
    priceThirdDay: '',
    priceOtherDays: '',
    priceSundays: '',
    pickPrice: 0,
    moveDateFormatted: '',
    dateId: 1
  },

  // paymentDetails
  paymentDetails: {
    comment: '',
    createAccount: true,
    paymentMethod: '',
    paidPart: false,
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
    updatePickPrice: (state, action) => {
      state.moverDetails.pickPrice = action.payload;
    }
  },
});

export const {
  updateLocationDetails,
  updatePersonalDetails,
  updateMoveDetails,
  updateMoverDetails,
  updatePaymentDetails,
  updatePickPrice,
} = quoteSlice.actions;

export const getAllDetails = (state) => state.quote;

// export const LocationDetails = (state) => state.quote.serviceLocation;

// export const getLatestQuote = (state) =>
//   state.quote.quoteDetails[state.quote.quoteDetails.length - 1];

export default quoteSlice.reducer;
