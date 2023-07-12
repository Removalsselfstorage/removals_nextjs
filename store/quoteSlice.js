import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quoteDetails: [
    {
      moveService: 'Home removals',
      location1: 'Lagos',
      location2: 'Abuja',
    },
  ],
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    addToQuote: (state, action) => {
      state.quoteDetails.push(action.payload);
    },
    updateQuote: (state, action) => {
      state.quoteDetails = action.payload;
    },
    emptyQuote: (state) => {
      state.quoteDetails = [];
    },
  },
});

export const { addToQuote, updateQuote, emptyQuote } = quoteSlice.actions;

export const getAllQuotes = (state) => state.quote.quoteDetails;

export const getLatestQuote = (state) =>
  state.quote.quoteDetails[state.quote.quoteDetails.length - 1];

export default quoteSlice.reducer;
