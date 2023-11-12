import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // LocationDetails
  serviceLocation: {
    // moveService: '',
    locationFrom: {
      name: "",
      postCode: "",
      city: "",
      state: "",
      country: "",
      floor: 0,
      liftAvailable: false,
    },
    locationTo: {
      name: "",
      postCode: "",
      city: "",
      state: "",
      country: "",
      floor: 0,
      liftAvailable: false,
    },
  },

  // personalDetails
  personalDetails: {
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    telephone: "",
  },

  // moveDetails
  moveDetails: {
    bookingId: "",
    quoteType: "",
    propertyType: "",
    numberOfMovers: "",
    mileage: "",
    volume: "",
    duration: 3,
    moveDate: "",
    moveDateRaw: "",
    movePackage: "",
    quoteRef: "",
    initialPackagePrice: 0,
  },

  //moversideDetails

  moverSideDetails: {
    image: "",
    name: "",
    loadArea: "",
    rating: 0,
    reviewCount: 0,
    price: 0,
    hiresCount: 0,
    description: "",
    selectedTime: null,
    selectedTime2: null,
    timeValue: null,
  },

  // moverDetails
  moverDetails: {
    moverName: "",
    moverTime: "",
    moverPrice: "",
    // priceSecondDay: "",
    // priceThirdDay: "",
    // priceOtherDays: "",
    // priceSundays: "",
    pickPrice: 0,
    moveDateFormatted: "",
    dateId: 1,
  },

  // paymentDetails
  paymentDetails: {
    comment: "",
    createAccount: true,
    paymentMethod: "",
    paidPart: false,
    paidFull: false,
    completedBook: false,
    paymentType: "",
    paidPrice: null,
  },

  bookStage: "",

  activity: [],

  reserveId: "",

  reserveDetails: {},

  quoteDetails: {},
};

export const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    setReserveDetails: (state, action) => {
      state.reserveDetails = action.payload;
      // Object.assign(state.reserveDetails, action.payload);
    },
    setQuoteDetails: (state, action) => {
      state.quoteDetails = action.payload;
      // Object.assign(state.reserveDetails, action.payload);
    },
    updateMoveItems: (state, action) => {
      Object.assign(state.reserveDetails, action.payload);
    },

    updateReserveDetails: (state, action) => {
      // state.serviceLocation = action.payload;
      Object.assign(state.reserveDetails, action.payload);
    },

    updateQuoteDetails: (state, action) => {
      // state.serviceLocation = action.payload;
      Object.assign(state.quoteDetails, action.payload);
    },

    resetReserveDetails: (state, action) => {
      state.reserveDetails = {};
    },

    resetQuoteDetails: (state, action) => {
      state.quoteDetails = {};
    },

    updateLocationFromDetails: (state, action) => {
      // state.serviceLocation = action.payload;
      Object.assign(state.serviceLocation.locationFrom, action.payload);
    },
    resetLocationFromDetails: (state, action) => {
      state.serviceLocation.locationFrom = {
        name: "",
        postCode: "",
        city: "",
        state: "",
        country: "",
        floor: 0,
        liftAvailable: false,
      };
    },
    updateLocationToDetails: (state, action) => {
      Object.assign(state.serviceLocation.locationTo, action.payload);
    },
    resetLocationToDetails: (state, action) => {
      state.serviceLocation.locationTo = {
        name: "",
        postCode: "",
        city: "",
        state: "",
        country: "",
        floor: 0,
        liftAvailable: false,
      };
    },

    updatePersonalDetails: (state, action) => {
      Object.assign(state.personalDetails, action.payload);
    },
    resetPersonalDetails: (state, action) => {
      state.personalDetails = {
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "",
        telephone: "",
      };
    },

    updateMoveDetails: (state, action) => {
      Object.assign(state.moveDetails, action.payload);
    },
    resetMoveDetails: (state, action) => {
      state.moveDetails = {
        bookingId: "",
        propertyType: "",
        numberOfMovers: "",
        mileage: "",
        volume: "",
        duration: 3,
        moveDate: "",
        moveDateRaw: "",
        movePackage: "",
        quoteRef: "",
        initialPackagePrice: 0,
      };
    },

    updateMoverDetails: (state, action) => {
      Object.assign(state.moverDetails, action.payload);
    },
    resetMoverDetails: (state, action) => {
      state.moverDetails = {
        moverName: "",
        moverTime: "",
        moverPrice: "",
        priceSecondDay: "",
        priceThirdDay: "",
        priceOtherDays: "",
        priceSundays: "",
        pickPrice: 0,
        moveDateFormatted: "",
        dateId: 1,
      };
    },

    updatePaymentDetails: (state, action) => {
      Object.assign(state.paymentDetails, action.payload);
    },
    resetPaymentDetails: (state, action) => {
      state.paymentDetails = {
        comment: "",
        createAccount: true,
        paymentMethod: "",
        paidPart: false,
        paidFull: false,
        completedBook: false,
        paidPrice: null,
      };
    },

    updatePickPrice: (state, action) => {
      state.moverDetails.pickPrice = action.payload;
    },

    updateMoverSideDetails: (state, action) => {
      Object.assign(state.moverSideDetails, action.payload);
    },

    resetMoverSideDetails: (state, action) => {
      state.paymentDetails = {
        image: "",
        name: "",
        loadArea: "",
        rating: 0,
        reviewCount: 0,
        price: 0,
        hiresCount: 0,
        description: "",
        selectedTime: null,
        selectedTime2: null,
        timeValue: null,
      };
    },

    updateBookStage: (state, action) => {
      state.bookStage = action.payload;
    },
    updateActivity: (state, action) => {
      state.activity = action.payload;
    },
    updateReserveId: (state, action) => {
      state.reserveId = action.payload;
    },
    resetBookStage: (state, action) => {
      state.bookStage = "";
    },
    resetActivity: (state, action) => {
      state.activity = "";
    },
  },
});

export const {
  updateLocationFromDetails,
  resetLocationFromDetails,

  updateLocationToDetails,
  resetLocationToDetails,

  updatePersonalDetails,
  resetPersonalDetails,

  updateMoveDetails,
  resetMoveDetails,

  updateMoverDetails,
  resetMoverDetails,

  updatePaymentDetails,
  resetPaymentDetails,

  updatePickPrice,

  updateMoverSideDetails,
  resetMoverSideDetails,

  setReserveDetails,
  updateReserveDetails,
  resetReserveDetails,

  setQuoteDetails,
  updateQuoteDetails,
  resetQuoteDetails,

  updateBookStage,
  resetBookStage,

  updateActivity,
  resetActivity,

  updateReserveId,
} = quoteSlice.actions;

export const getAllDetails = (state) => state.quote;

// export const LocationDetails = (state) => state.quote.serviceLocation;

// export const getLatestQuote = (state) =>
//   state.quote.quoteDetails[state.quote.quoteDetails.length - 1];

export default quoteSlice.reducer;
