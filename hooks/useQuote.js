import React from "react";
import {
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
  updateBookStage,
  resetBookStage,
  getAllDetails,
} from "@/store/quoteSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const useQuote = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    serviceLocation,
    personalDetails,
    moveDetails,
    moverSideDetails,
    moverDetails,
    paymentDetails,
    bookStage,
  } = useSelector(getAllDetails);

  const updateLocationFrom = (payload) => {
    dispatch(updateLocationFromDetails(payload));
  };
  const resetLocationFrom = () => {
    dispatch(resetLocationFromDetails());
  };
  const updateLocationTo = (payload) => {
    dispatch(updateLocationToDetails(payload));
  };
  const resetLocationTo = () => {
    dispatch(resetLocationToDetails());
  };
  const updatePersonal = (payload) => {
    dispatch(updatePersonalDetails(payload));
  };
  const resetPersonal = () => {
    dispatch(resetPersonalDetails());
  };
  const updateMove = (payload) => {
    dispatch(updateMoveDetails(payload));
  };
  const resetMove = () => {
    dispatch(resetMoveDetails());
  };
  const updateMover = (payload) => {
    dispatch(updateMoverDetails(payload));
  };
  const resetMover = () => {
    dispatch(resetMoverDetails());
  };
  const updatePayment = (payload) => {
    dispatch(updatePaymentDetails(payload));
  };
  const resetPayment = () => {
    dispatch(resetPaymentDetails());
  };
  const updatePickP = (payload) => {
    dispatch(updatePickPrice(payload));
  };
  const updateMoverSide = (payload) => {
    dispatch(updateMoverSideDetails(payload));
  };
  const resetMoverSide = () => {
    dispatch(resetMoverSideDetails());
  };
  const updateBookS = (payload) => {
    dispatch(updateBookStage(payload));
  };
  const resetBookS = () => {
    dispatch(resetBookStage());
  };

  return {
    serviceLocation,
    personalDetails,
    moveDetails,
    moverSideDetails,
    moverDetails,
    paymentDetails,
    bookStage,
    updateLocationFrom,
    resetLocationFrom,
    updateLocationTo,
    resetLocationTo,
    updatePersonal,
    resetPersonal,
    updateMove,
    resetMove,
    updateMover,
    resetMover,
    updatePayment,
    resetPayment,
    updatePickP,
    updateMoverSide,
    resetMoverSide,
    updateBookS,
    resetBookS,
    router,
  };
};

export default useQuote;
