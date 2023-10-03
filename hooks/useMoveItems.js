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
  // LIVING
  increaseQtyInLiving,
  decreaseQtyInLiving,
  addNewItemToLiving,
  // DINING
  increaseQtyInDining,
  decreaseQtyInDining,
  addNewItemToDining,
  // KITCHEN
  increaseQtyInKitchen,
  decreaseQtyInKitchen,
  addNewItemToKitchen,
  // OFFICE
  increaseQtyInOffice,
  decreaseQtyInOffice,
  addNewItemToOffice,
  // BATHROOM
  increaseQtyInBathRoom,
  decreaseQtyInBathRoom,
  addNewItemToBathRoom,
  // GARDEN
  increaseQtyInGarden,
  decreaseQtyInGarden,
  addNewItemToGarden,
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

  // BATHROOM
  const increaseQtyInGardenFxn = (payload) => {
    dispatch(increaseQtyInGarden(payload));
  };
  const decreaseQtyInGardenFxn = (payload) => {
    dispatch(decreaseQtyInGarden(payload));
  };
  const addNewItemToGardenFxn = (payload) => {
    dispatch(addNewItemToGarden(payload));
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
    //LIVING
    increaseQtyInLivingFxn,
    decreaseQtyInLivingFxn,
    addNewItemToLivingFxn,
    //DINING
    increaseQtyInDiningFxn,
    decreaseQtyInDiningFxn,
    addNewItemToDiningFxn,
    //KITCHEN
    increaseQtyInKitchenFxn,
    decreaseQtyInKitchenFxn,
    addNewItemToKitchenFxn,
    //OFFICE
    increaseQtyInOfficeFxn,
    decreaseQtyInOfficeFxn,
    addNewItemToOfficeFxn,
    //BATHROOM
    increaseQtyInBathRoomFxn,
    decreaseQtyInBathRoomFxn,
    addNewItemToBathRoomFxn,
    //GARDEN
    increaseQtyInGardenFxn,
    decreaseQtyInGardenFxn,
    addNewItemToGardenFxn,

    router,
  };
};

export default useMoveItems;
