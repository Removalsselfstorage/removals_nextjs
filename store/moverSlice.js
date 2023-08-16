import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // personalDetails
  personalDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    personalBio: "",
    profilePicture: null,
  },
};

export const moverSlice = createSlice({
  name: "mover",
  initialState,
  reducers: {
    updateMoverPersonalDetails: (state, action) => {
      state.personalDetails = action.payload;
    },
  },
});

export const {
  updateMoverPersonalDetails
} = moverSlice.actions;

export const getAllMoverDetails = (state) => state.mover;

export default moverSlice.reducer;
