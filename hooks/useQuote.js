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
  updateActivity,
  resetActivity,
  updateReserveId,
  setReserveDetails,
  updateReserveDetails,
  resetReserveDetails,
  setQuoteDetails,
  updateQuoteDetails,
  resetQuoteDetails,
  getAllDetails,
} from "@/store/quoteSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const useQuote = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const ab = useSelector(getAllDetails);
  // const {
  //   serviceLocation,
  //   personalDetails,
  //   moveDetails,
  //   moverSideDetails,
  //   moverDetails,
  //   paymentDetails,
  //   bookStage,
  //   reserveId,
  //   reserveDetails,
  // } = useSelector(getAllDetails);

  const setReserveDetailsFxn = (payload) => {
    dispatch(setReserveDetails(payload));
  };
  const updateReserveDetailsFxn = (payload) => {
    dispatch(updateReserveDetails(payload));
  };
  const resetReserveDetailsFxn = () => {
    dispatch(resetReserveDetails());
  };

  const setQuoteDetailsFxn = (payload) => {
    dispatch(setQuoteDetails(payload));
  };
  const updateQuoteDetailsFxn = (payload) => {
    dispatch(updateQuoteDetails(payload));
  };
  const resetQuoteDetailsFxn = () => {
    dispatch(resetQuoteDetails());
  };
  const updateReserveIdFxn = (payload) => {
    dispatch(updateReserveId(payload));
  };
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
  const updateActivityFxn = (payload) => {
    dispatch(updateActivity(payload));
  };
  const resetBookS = () => {
    dispatch(resetBookStage());
  };
  const resetActivityFxn = () => {
    dispatch(resetActivity());
  };

  // console.log({ab})

  return {
    reserveDetails: ab?.reserveDetails,
    quoteDetails: ab?.quoteDetails,
    reserveId: ab?.reserveId,
    serviceLocation: ab?.serviceLocation,
    personalDetails: ab?.personalDetails,
    moveDetails: ab?.moveDetails,
    moverSideDetails: ab?.moverSideDetails,
    moverDetails: ab?.moverDetails,
    paymentDetails: ab?.paymentDetails,
    bookStage: ab?.bookStage,
    //
    setReserveDetailsFxn,
    updateReserveDetailsFxn,
    resetReserveDetailsFxn,
    //
    setQuoteDetailsFxn,
    updateQuoteDetailsFxn,
    resetQuoteDetailsFxn,
    //

    updateReserveIdFxn,
    //
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
    updateActivityFxn,
    resetActivityFxn,
    router,
  };
};

export default useQuote;
