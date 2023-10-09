import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// import storage from 'reduxjs-toolkit-persist/lib/storage'
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
// import { persistReducer, createMigrate } from 'reduxjs-toolkit-persist'
// import hardSet from 'reduxjs-toolkit-persist/lib/stateReconciler/hardSet'
import storage from "redux-persist/lib/storage";
import localforage from "localforage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import quoteReducer from "./quoteSlice";
import userReducer from "./userSlice";
import moverReducer from "./moverSlice";
import moveItemsReducer from "./moveItemsSlice";
import cartReducer from "./cartSlice";
import packagingReducer from "./packagingSlice";

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

const rootReducer = combineReducers({
  quote: quoteReducer,
  user: userReducer,
  mover: moverReducer,
  moveItems: moveItemsReducer,
  cart: cartReducer,
  packaging: packagingReducer,
});

const persistConfig = {
  key: "root",
  //   version: 1,
  storage: localforage,
  // storage: storageSession,
  stateReconciler: hardSet,
  blacklist: ["moveItems", "packaging"],
  // blacklist: ["mover"],
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

// export const persistor = persistStore(store)
