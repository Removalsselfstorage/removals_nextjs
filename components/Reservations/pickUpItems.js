import React, { useState } from "react";
import NumberInput from "@/components/Reservations/numberInput";
import { FaHouseLaptop, FaKitchenSet } from "react-icons/fa6";
import { FaBath, FaBed } from "react-icons/fa";
import useMoveItems from "@/hooks/useMoveItems";
import NumberInput2 from "./numberInput2";
import NumberInput3 from "./numberInput3";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import useQuote from "@/hooks/useQuote";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import {
  getCurrentDateFormatted,
  hasQtyGreaterThanOne,
  sortItems,
  checkZeroQty,
} from "@/utils/logics";
import { BiHelpCircle, BiSolidBed } from "react-icons/bi";
import { GiForkKnifeSpoon, GiOfficeChair, GiSofa } from "react-icons/gi";
import { LuMicrowave } from "react-icons/lu";
import { TbGardenCart } from "react-icons/tb";
import ItemDisplay from "@/components/Reservations/ItemDisplay";

const PickUpItems = () => {
  const { reserveDetails, resetBookS, router, reserveId, updateReserveIdFxn } =
    useQuote();

  const ab = useMoveItems();

  const {
    moveItems,

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
  } = useMoveItems();

  const livingRoomInitial = {
    lr1: 0,
    lr2: 0,
    lr3: 0,
    lr4: 0,
    lr5: 0,
    lr6: 0,
    lr7: 0,
    lr8: 0,
    lr9: 0,
    lr10: 0,
    others: "",
  };

  const diningRoomInitial = {
    dr1: 0,
    dr2: 0,
    dr3: 0,
    dr4: 0,
    dr5: 0,
    dr6: 0,
    dr7: 0,
    dr8: 0,
    dr9: 0,
    dr10: 0,
    others: "",
  };

  const bedRoomInitial = {
    br1: 0,
    br2: 0,
    br3: 0,
    br4: 0,
    br5: 0,
    br6: 0,
    br7: 0,
    br8: 0,
    br9: 0,
    br10: 0,
    others: "",
  };

  const kitchenInitial = {
    k1: 0,
    k2: 0,
    k3: 0,
    k4: 0,
    k5: 0,
    k6: 0,
    k7: 0,
    k8: 0,
    k9: 0,
    k10: 0,
    others: "",
  };

  // bedRoom
  const [bedRoomName, setBedRoomName] = useState("");
  const [bedRoomQty, setBedRoomQty] = useState(1);
  const [bedRoomDate, setBedRoomDate] = useState("");
  const [livingName, setLivingName] = useState("");
  const [livingQty, setLivingQty] = useState(1);
  const [livingDate, setLivingDate] = useState("");
  const [diningName, setDiningName] = useState("");
  const [diningQty, setDiningQty] = useState(1);
  const [diningDate, setDiningDate] = useState("");
  const [kitchenName, setKitchenName] = useState("");
  const [kitchenQty, setKitchenQty] = useState(1);
  const [kitchenDate, setKitchenDate] = useState("");
  const [officeName, setOfficeName] = useState("");
  const [officeQty, setOfficeQty] = useState(1);
  const [officeDate, setOfficeDate] = useState("");
  const [bathRoomName, setBathRoomName] = useState("");
  const [bathRoomQty, setBathRoomQty] = useState(1);
  const [bathRoomDate, setBathRoomDate] = useState("");
  const [gardenName, setGardenName] = useState("");
  const [gardenQty, setGardenQty] = useState(1);
  const [gardenDate, setGardenDate] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const bookingId = reserveDetails?.bookingId;

  // const bookingRef2 = doc(db, "bookingData", bookingId);

  const submitList = async () => {
    setSubmitLoading(true);
    try {
      await setDoc(
        doc(db, "bookingData", bookingId),

        {
          date: getCurrentDateFormatted(),
          stage: "Updated items to move",
          activity: [
            ...reserveDetails?.activity,
            {
              name: `Updated items to move`,
              date: getCurrentDateFormatted(),
            },
          ],
          moveItems: ab?.moveItems,
          moveItemsArray:
            reserveDetails?.moveItemsArray?.length > 0
              ? [
                  ...reserveDetails?.moveItemsArray,
                  { moveItems: ab?.moveItems, date: getCurrentDateFormatted() },
                ]
              : [{ moveItems: ab?.moveItems, date: getCurrentDateFormatted() }],
        },
        { merge: true }
      );

      setSubmitLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 2000);

      // return true;
      console.log("move items update was successful @ reservation");
    } catch (error) {
      console.log(error);
      // return false;
      console.log("move items update was unsuccessful @ reservation");
      setSubmitLoading(false);
    }
  };

  const checkZeroQty = (array) => {
    let check = 0;
    array.forEach((ar) => {
      if (ar.qty > 0) {
        check += 1;
      }
    });
    return check;
  };

  // console.log({ moveItems, co: checkZeroQty(moveItems?.office) });
  console.log({ reserveDetails });

  return (
    <div className="">
      <div className="mb-[10px] md:mb-[20px]">
        <div className="text-2xl font-bold mb-[10px] flex flex-col space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[10px]">
          <p className="">What are you moving</p>
          <div
            className="flex items-center space-x-[5px]"
            // className="tooltip cursor-pointer"
            // data-tip="Please always submit after adding items"
          >
            <BiHelpCircle className="font-bold text-[25px] text-secondary" />
            <p className="text-[14px] text-secondary font-semibold">
              Please always submit after you're done adding items
            </p>
          </div>
        </div>
        {/* item display */}
        <div className="text-[14px]  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[10px]">
          {checkZeroQty(moveItems?.office) > 0 && (
            <div className="mb-[0px]">
              {hasQtyGreaterThanOne(moveItems?.office) && (
                <span className="text-secondary font-bold text-[18px]">
                  Office:{" "}
                </span>
              )}
              <ItemDisplay
                sortedItems={[...sortItems(moveItems?.office)] || []}
              />
            </div>
          )}
          {checkZeroQty(moveItems?.living) > 0 && (
            <div className="mb-[0px]">
              {hasQtyGreaterThanOne(moveItems?.living) && (
                <span className="text-secondary font-bold text-[18px]">
                  Living Room:{" "}
                </span>
              )}
              <ItemDisplay
                sortedItems={[...sortItems(moveItems?.living)] || []}
              />
            </div>
          )}
          {checkZeroQty(moveItems?.bedRoom) > 0 && (
            <div className="mb-[0px]">
              {hasQtyGreaterThanOne(moveItems?.bedRoom) && (
                <span className="text-secondary font-bold text-[18px]">
                  Bed Room:{" "}
                </span>
              )}
              <ItemDisplay
                sortedItems={[...sortItems(moveItems?.bedRoom)] || []}
              />
            </div>
          )}
          {checkZeroQty(moveItems?.dining) > 0 && (
            <div className="mb-[10px]">
              {hasQtyGreaterThanOne(moveItems?.dining) && (
                <span className="text-secondary font-bold text-[18px]">
                  Dining:{" "}
                </span>
              )}
              <ItemDisplay
                sortedItems={[...sortItems(moveItems?.dining)] || []}
              />
            </div>
          )}
          {checkZeroQty(moveItems?.kitchen) > 0 && (
            <div className="mb-[0px]">
              {hasQtyGreaterThanOne(moveItems?.kitchen) && (
                <span className="text-secondary font-bold text-[18px]">
                  Kitchen:{" "}
                </span>
              )}
              <ItemDisplay
                sortedItems={[...sortItems(moveItems?.kitchen)] || []}
              />
            </div>
          )}
          {checkZeroQty(moveItems?.bathRoom) > 0 && (
            <div className="mb-[10px]">
              {hasQtyGreaterThanOne(moveItems?.bathRoom) && (
                <span className="text-secondary font-bold text-[18px]">
                  Bath Room:{" "}
                </span>
              )}
              <ItemDisplay
                sortedItems={[...sortItems(moveItems?.bathRoom)] || []}
              />
            </div>
          )}
          {checkZeroQty(moveItems?.garden) > 0 && (
            <div className="mb-[0px]">
              {hasQtyGreaterThanOne(moveItems?.garden) && (
                <span className="text-secondary font-bold text-[18px]">
                  Garden:{" "}
                </span>
              )}
              <ItemDisplay
                sortedItems={[...sortItems(moveItems?.garden)] || []}
              />
            </div>
          )}
        </div>
      </div>

      {/* Office */}
      <div className="collapse  bg-orange-500/10 collapse-arrow mb-[10px]">
        <input type="checkbox" />
        <div className="collapse-title font-semibold text-secondary flex items-center space-x-[10px] mb-[0px]">
          <p className="text-[18px] font-bold  ">Office</p>
          <GiOfficeChair className="font-bold text-[25px]" />
        </div>
        <div className="collapse-content">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[10px]">
            {moveItems?.office.map((bd, index) => {
              return (
                <div key={index} className="form-control w-full">
                  <NumberInput2
                    title={bd?.name}
                    count={bd?.qty}
                    minusCount={decreaseQtyInOfficeFxn}
                    addCount={increaseQtyInOfficeFxn}
                  />
                </div>
              );
            })}
            <div className="flex items-center space-x-[20px]">
              <NumberInput3
                count={officeQty}
                addCount={() => {
                  setOfficeQty((prev) => prev + 1);
                }}
                minusCount={() => {
                  setOfficeQty((prev) => prev - 1);
                }}
                setText={setOfficeName}
                text={officeName}
              />
              <div
                //   onClick={() => setFloorCount((prev) => prev + 1)}
                onClick={() => {
                  addNewItemToOfficeFxn({
                    name: officeName,
                    qty: officeQty,
                    date: getCurrentDateFormatted(),
                  });
                  setOfficeQty(1);
                  setOfficeName("");
                }}
                className="flex justify-center items-center  bg-gray-400 cursor-pointer hover:bg-gray-500 w-[30px] p-[5px] h-[30px] rounded-[5px]"
              >
                <AiFillEdit className="text-white font-bold text-[14px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Living */}
      <div className="collapse bg-orange-500/10 collapse-arrow mb-[10px]">
        <input type="checkbox" />
        <div className="collapse-title font-semibold text-secondary flex items-center space-x-[10px] mb-[0px]">
          <p className="text-[18px] font-bold  ">Living Room</p>
          <GiSofa className="font-bold text-[25px]" />
        </div>
        <div className="collapse-content">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[10px]">
            {moveItems?.living.map((bd, index) => {
              return (
                <div key={index} className="form-control w-full">
                  <NumberInput2
                    title={bd?.name}
                    count={bd?.qty}
                    minusCount={decreaseQtyInLivingFxn}
                    addCount={increaseQtyInLivingFxn}
                  />
                </div>
              );
            })}
            <div className="flex items-center space-x-[20px]">
              <NumberInput3
                count={livingQty}
                addCount={() => {
                  setLivingQty((prev) => prev + 1);
                }}
                minusCount={() => {
                  setLivingQty((prev) => prev - 1);
                }}
                setText={setLivingName}
                text={livingName}
              />
              <div
                //   onClick={() => setFloorCount((prev) => prev + 1)}
                onClick={() => {
                  addNewItemToLivingFxn({
                    name: livingName,
                    qty: livingQty,
                    date: getCurrentDateFormatted(),
                  });
                  setLivingQty(1);
                  setLivingName("");
                }}
                className="flex justify-center items-center  bg-gray-400 cursor-pointer hover:bg-gray-500 w-[30px] p-[5px] h-[30px] rounded-[5px]"
              >
                <AiFillEdit className="text-white font-bold text-[14px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bed Room */}
      <div className="collapse bg-orange-500/10 collapse-arrow mb-[10px]">
        <input type="checkbox" />
        <div className="collapse-title font-semibold text-secondary flex items-center space-x-[10px] mb-[0px]">
          <p className="text-[18px] font-bold  ">Bed Room</p>
          <BiSolidBed className="font-bold text-[25px]" />
        </div>
        <div className="collapse-content">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[10px]">
            {moveItems?.bedRoom.map((bd, index) => {
              return (
                <div key={index} className="form-control w-full">
                  <NumberInput2
                    title={bd?.name}
                    count={bd?.qty}
                    minusCount={decreaseQtyInBedroomFxn}
                    addCount={increaseQtyInBedroomFxn}
                  />
                </div>
              );
            })}
            <div className="flex items-center space-x-[20px]">
              <NumberInput3
                count={bedRoomQty}
                addCount={() => {
                  setBedRoomQty((prev) => prev + 1);
                }}
                minusCount={() => {
                  setBedRoomQty((prev) => prev - 1);
                }}
                setText={setBedRoomName}
                text={bedRoomName}
              />
              <div
                //   onClick={() => setFloorCount((prev) => prev + 1)}
                onClick={() => {
                  addNewItemToBedroomFxn({
                    name: bedRoomName,
                    qty: bedRoomQty,
                    date: getCurrentDateFormatted(),
                  });
                  setBedRoomQty(1);
                  setBedRoomName("");
                }}
                className="flex justify-center items-center  bg-gray-400 cursor-pointer hover:bg-gray-500 w-[30px] p-[5px] h-[30px] rounded-[5px]"
              >
                <AiFillEdit className="text-white font-bold text-[14px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dining */}
      <div className="collapse bg-orange-500/10 collapse-arrow mb-[10px]">
        <input type="checkbox" />
        <div className="collapse-title font-semibold text-secondary flex items-center space-x-[10px] mb-[0px]">
          <p className="text-[18px] font-bold  ">Dining</p>
          <GiForkKnifeSpoon className="font-bold text-[25px]" />
        </div>
        <div className="collapse-content">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[10px]">
            {moveItems?.dining.map((bd, index) => {
              return (
                <div key={index} className="form-control w-full">
                  <NumberInput2
                    title={bd?.name}
                    count={bd?.qty}
                    minusCount={decreaseQtyInDiningFxn}
                    addCount={increaseQtyInDiningFxn}
                  />
                </div>
              );
            })}
            <div className="flex items-center space-x-[20px]">
              <NumberInput3
                count={diningQty}
                addCount={() => {
                  setDiningQty((prev) => prev + 1);
                }}
                minusCount={() => {
                  setDiningQty((prev) => prev - 1);
                }}
                setText={setDiningName}
                text={diningName}
              />
              <div
                //   onClick={() => setFloorCount((prev) => prev + 1)}
                onClick={() => {
                  addNewItemToDiningFxn({
                    name: diningName,
                    qty: diningQty,
                    date: getCurrentDateFormatted(),
                  });
                  setDiningQty(1);
                  setDiningName("");
                }}
                className="flex justify-center items-center  bg-gray-400 cursor-pointer hover:bg-gray-500 w-[30px] p-[5px] h-[30px] rounded-[5px]"
              >
                <AiFillEdit className="text-white font-bold text-[14px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kitchen */}
      <div className="collapse bg-orange-500/10 collapse-arrow mb-[10px]">
        <input type="checkbox" />
        <div className="collapse-title font-semibold text-secondary flex items-center space-x-[10px] mb-[0px]">
          <p className="text-[18px] font-bold  ">Kitchen</p>
          <LuMicrowave className="font-bold text-[25px]" />
        </div>
        <div className="collapse-content">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[10px]">
            {moveItems?.kitchen.map((bd, index) => {
              return (
                <div key={index} className="form-control w-full">
                  <NumberInput2
                    title={bd?.name}
                    count={bd?.qty}
                    minusCount={decreaseQtyInKitchenFxn}
                    addCount={increaseQtyInKitchenFxn}
                  />
                </div>
              );
            })}
            <div className="flex items-center space-x-[20px]">
              <NumberInput3
                count={kitchenQty}
                addCount={() => {
                  setKitchenQty((prev) => prev + 1);
                }}
                minusCount={() => {
                  setKitchenQty((prev) => prev - 1);
                }}
                setText={setKitchenName}
                text={kitchenName}
              />
              <div
                //   onClick={() => setFloorCount((prev) => prev + 1)}
                onClick={() => {
                  addNewItemToKitchenFxn({
                    name: kitchenName,
                    qty: kitchenQty,
                    date: getCurrentDateFormatted(),
                  });
                  setKitchenQty(1);
                  setKitchenName("");
                }}
                className="flex justify-center items-center  bg-gray-400 cursor-pointer hover:bg-gray-500 w-[30px] p-[5px] h-[30px] rounded-[5px]"
              >
                <AiFillEdit className="text-white font-bold text-[14px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bathroom */}
      <div className="collapse bg-orange-500/10 collapse-arrow mb-[10px]">
        <input type="checkbox" />
        <div className="collapse-title font-semibold text-secondary flex items-center space-x-[10px] mb-[0px]">
          <p className="text-[18px] font-bold  ">Bathroom</p>
          <FaBath className="font-bold text-[25px]" />
        </div>
        <div className="collapse-content">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[10px]">
            {moveItems?.bathRoom.map((bd, index) => {
              return (
                <div key={index} className="form-control w-full">
                  <NumberInput2
                    title={bd?.name}
                    count={bd?.qty}
                    minusCount={decreaseQtyInBathRoomFxn}
                    addCount={increaseQtyInBathRoomFxn}
                  />
                </div>
              );
            })}
            <div className="flex items-center space-x-[20px]">
              <NumberInput3
                count={bathRoomQty}
                addCount={() => {
                  setBathRoomQty((prev) => prev + 1);
                }}
                minusCount={() => {
                  setBathRoomQty((prev) => prev - 1);
                }}
                setText={setBathRoomName}
                text={bathRoomName}
              />
              <div
                //   onClick={() => setFloorCount((prev) => prev + 1)}
                onClick={() => {
                  addNewItemToBathRoomFxn({
                    name: bathRoomName,
                    qty: bathRoomQty,
                    date: getCurrentDateFormatted(),
                  });
                  setBathRoomQty(1);
                  setBathRoomName("");
                }}
                className="flex justify-center items-center  bg-gray-400 cursor-pointer hover:bg-gray-500 w-[30px] p-[5px] h-[30px] rounded-[5px]"
              >
                <AiFillEdit className="text-white font-bold text-[14px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Garden */}
      <div className="collapse bg-orange-500/10 collapse-arrow mb-[20px]">
        <input type="checkbox" />
        <div className="collapse-title font-semibold text-secondary flex items-center space-x-[10px] mb-[0px]">
          <p className="text-[18px] font-bold  ">Garden</p>
          <TbGardenCart className="font-bold text-[25px]" />
        </div>
        <div className="collapse-content">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[10px]">
            {moveItems?.garden.map((bd, index) => {
              return (
                <div key={index} className="form-control w-full">
                  <NumberInput2
                    title={bd?.name}
                    count={bd?.qty}
                    minusCount={decreaseQtyInGardenFxn}
                    addCount={increaseQtyInGardenFxn}
                  />
                </div>
              );
            })}
            <div className="flex items-center space-x-[20px]">
              <NumberInput3
                count={gardenQty}
                addCount={() => {
                  setGardenQty((prev) => prev + 1);
                }}
                minusCount={() => {
                  setGardenQty((prev) => prev - 1);
                }}
                setText={setGardenName}
                text={gardenName}
              />
              <div
                //   onClick={() => setFloorCount((prev) => prev + 1)}
                onClick={() => {
                  addNewItemToGardenFxn({
                    name: gardenName,
                    qty: gardenQty,
                    date: getCurrentDateFormatted(),
                  });
                  setGardenQty(1);
                  setGardenName("");
                }}
                className="flex justify-center items-center  bg-gray-400 cursor-pointer hover:bg-gray-500 w-[30px] p-[5px] h-[30px] rounded-[5px]"
              >
                <AiFillEdit className="text-white font-bold text-[14px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* submit */}
      <div className="w-full">
        <div
          onClick={submitList}
          className={`${
            submitted
              ? "btn  btn-wide btn-primary"
              : "btn  btn-wide btn-secondary"
          }`}
          disabled={submitLoading}
        >
          {!submitLoading && (
            <span className="">{`${
              submitted ? "Items Updated" : "Submit Items"
            }`}</span>
          )}
          {submitLoading && (
            <span className="loading loading-spinner loading-md text-white"></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickUpItems;
