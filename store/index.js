import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import cartReducer from "./userSlice";
import quoteReducer from "./quoteSlice";
import userReducer from "./userSlice";

////////////
// const createNoopStorage = () => {
//   return {
//     getItem(_key) {
//       return Promise.resolve(null);
//     },
//     setItem(_key, value) {
//       return Promise.resolve(value);
//     },
//     removeItem(_key) {
//       return Promise.resolve();
//     },
//   };
// };
// const storage =
//   typeof window !== 'undefined'
//     ? createWebStorage('local')
//     : createNoopStorage();

/////////////////////

const rootReducer = combineReducers({ quote: quoteReducer, user: userReducer });

const persistConfig = {
  key: "root",
  //   version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

export default store;
