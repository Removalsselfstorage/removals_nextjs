import React from "react";
// import { getAllMoveItems, updateQtyInBedroom } from "@/store/quoteSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMoveItems,
  resetMoveItems,

  // BEDROOM
  updateQtyInBedroom,
  increaseQtyInBedroom,
  decreaseQtyInBedroom,
  addNewItemToBedroom,
  updateDateInBedroom,

  // LIVING
  increaseQtyInLiving,
  decreaseQtyInLiving,
  addNewItemToLiving,
  updateDateInLiving,

  // DINING
  increaseQtyInDining,
  decreaseQtyInDining,
  addNewItemToDining,
  updateDateInDining,

  // KITCHEN
  increaseQtyInKitchen,
  decreaseQtyInKitchen,
  addNewItemToKitchen,
  updateDateInKitchen,

  // OFFICE
  increaseQtyInOffice,
  decreaseQtyInOffice,
  addNewItemToOffice,
  updateDateInOffice,

  // BATHROOM
  increaseQtyInBathRoom,
  decreaseQtyInBathRoom,
  addNewItemToBathRoom,
  updateDateInBathroom,

  // GARDEN
  increaseQtyInGarden,
  decreaseQtyInGarden,
  addNewItemToGarden,
  updateDateInGarden,
} from "@/store/moveItemsSlice";

const useMoveItems = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const ab = useSelector(getAllMoveItems);
  // const { moveItems } = useSelector(getAllMoveItems);

  const resetMoveItemsFxn = (payload) => {
    dispatch(resetMoveItems(payload));
  };

  // BEDROOM
  const updateQtyInBedroomFxn = (payload) => {
    dispatch(updateQtyInBedroom(payload));
  };
  const increaseQtyInBedroomFxn = (payload) => {
    dispatch(increaseQtyInBedroom(payload));
  };
  const decreaseQtyInBedroomFxn = (payload) => {
    dispatch(decreaseQtyInBedroom(payload));
  };
  const addNewItemToBedroomFxn = (payload) => {
    dispatch(addNewItemToBedroom(payload));
  };
  const updateDateInBedroomFxn = (payload) => {
    dispatch(updateDateInBedroom(payload));
  };

  // LIVING
  const increaseQtyInLivingFxn = (payload) => {
    dispatch(increaseQtyInLiving(payload));
  };
  const decreaseQtyInLivingFxn = (payload) => {
    dispatch(decreaseQtyInLiving(payload));
  };
  const addNewItemToLivingFxn = (payload) => {
    dispatch(addNewItemToLiving(payload));
  };
  const updateDateInLivingFxn = (payload) => {
    dispatch(updateDateInLiving(payload));
  };

  // DINING
  const increaseQtyInDiningFxn = (payload) => {
    dispatch(increaseQtyInDining(payload));
  };
  const decreaseQtyInDiningFxn = (payload) => {
    dispatch(decreaseQtyInDining(payload));
  };
  const addNewItemToDiningFxn = (payload) => {
    dispatch(addNewItemToDining(payload));
  };
  const updateDateInDiningFxn = (payload) => {
    dispatch(updateDateInDining(payload));
  };

  // KITCHEN
  const increaseQtyInKitchenFxn = (payload) => {
    dispatch(increaseQtyInKitchen(payload));
  };
  const decreaseQtyInKitchenFxn = (payload) => {
    dispatch(decreaseQtyInKitchen(payload));
  };
  const addNewItemToKitchenFxn = (payload) => {
    dispatch(addNewItemToKitchen(payload));
  };
  const updateDateInKitchenFxn = (payload) => {
    dispatch(updateDateInKitchen(payload));
  };

  // OFFICE
  const increaseQtyInOfficeFxn = (payload) => {
    dispatch(increaseQtyInOffice(payload));
  };
  const decreaseQtyInOfficeFxn = (payload) => {
    dispatch(decreaseQtyInOffice(payload));
  };
  const addNewItemToOfficeFxn = (payload) => {
    dispatch(addNewItemToOffice(payload));
  };
  const updateDateInOfficeFxn = (payload) => {
    dispatch(updateDateInOffice(payload));
  };

  // BATHROOM
  const increaseQtyInBathRoomFxn = (payload) => {
    dispatch(increaseQtyInBathRoom(payload));
  };
  const decreaseQtyInBathRoomFxn = (payload) => {
    dispatch(decreaseQtyInBathRoom(payload));
  };
  const addNewItemToBathRoomFxn = (payload) => {
    dispatch(addNewItemToBathRoom(payload));
  };
  const updateDateInBathroomFxn = (payload) => {
    dispatch(updateDateInBathroom(payload));
  };

  // GARDEN
  const increaseQtyInGardenFxn = (payload) => {
    dispatch(increaseQtyInGarden(payload));
  };
  const decreaseQtyInGardenFxn = (payload) => {
    dispatch(decreaseQtyInGarden(payload));
  };
  const addNewItemToGardenFxn = (payload) => {
    dispatch(addNewItemToGarden(payload));
  };
  const updateDateInGardenFxn = (payload) => {
    dispatch(updateDateInGarden(payload));
  };

  // console.log({ ab });

  return {
    moveItems: ab?.moveItems,

    resetMoveItemsFxn,

    // BEDROOM
    updateQtyInBedroomFxn,
    increaseQtyInBedroomFxn,
    decreaseQtyInBedroomFxn,
    addNewItemToBedroomFxn,
    updateDateInBedroomFxn,
    //LIVING
    increaseQtyInLivingFxn,
    decreaseQtyInLivingFxn,
    addNewItemToLivingFxn,
    updateDateInLivingFxn,
    //DINING
    increaseQtyInDiningFxn,
    decreaseQtyInDiningFxn,
    addNewItemToDiningFxn,
    updateDateInDiningFxn,
    //KITCHEN
    increaseQtyInKitchenFxn,
    decreaseQtyInKitchenFxn,
    addNewItemToKitchenFxn,
    updateDateInKitchenFxn,
    //OFFICE
    increaseQtyInOfficeFxn,
    decreaseQtyInOfficeFxn,
    addNewItemToOfficeFxn,
    updateDateInOfficeFxn,
    //BATHROOM
    increaseQtyInBathRoomFxn,
    decreaseQtyInBathRoomFxn,
    addNewItemToBathRoomFxn,
    updateDateInBathroomFxn,
    //GARDEN
    increaseQtyInGardenFxn,
    decreaseQtyInGardenFxn,
    addNewItemToGardenFxn,
    updateDateInGardenFxn,

    router,
  };
};

export default useMoveItems;
