import React from "react";
import {
  updateJustRegistered,
  resetJustRegistered,
  updatePersonalMoverDetails,
  resetPersonalMoverDetails,
  updateCompanyDetails,
  resetCompanyDetails,
  updateCompanyDocs,
  resetCompanyDocs,
  updateAllMoverData,
  resetAllMoverData,
  getAllMoverDetails,
} from "@/store/moverSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const useMover = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    justRegistered,
    personalMoverDetails,
    companyDetails,
    companyDocs,
    allMoverData,
  } = useSelector(getAllMoverDetails);

  const updateJustR = (payload) => {
    dispatch(updateJustRegistered(payload));
  };
  const resetJustR = () => {
    dispatch(resetJustRegistered());
  };
  const updatePersonalMover = (payload) => {
    dispatch(updatePersonalMoverDetails(payload));
  };
  const resetPersonalMover = () => {
    dispatch(resetPersonalMoverDetails());
  };
  const updateCompanyDe = (payload) => {
    dispatch(updateCompanyDetails(payload));
  };
  const resetCompanyDe = () => {
    dispatch(resetCompanyDetails());
  };
  const updateCompanyDo = (payload) => {
    dispatch(updateCompanyDocs(payload));
  };
  const resetCompanyDo = () => {
    dispatch(resetCompanyDocs());
  };
  const updateAllMoverD = (payload) => {
    dispatch(updateAllMoverData(payload));
  };
  const resetAllMoverD = () => {
    dispatch(resetAllMoverData());
  };

  return {
    justRegistered,
    personalMoverDetails,
    companyDetails,
    companyDocs,
    allMoverData,
    updateJustR,
    resetJustR,
    updatePersonalMover,
    resetPersonalMover,
    updateCompanyDe,
    resetCompanyDe,
    updateCompanyDo,
    resetCompanyDo,
    updateAllMoverD,
    resetAllMoverD,
  };
};

export default useMover;
