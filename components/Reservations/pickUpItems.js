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
import { getCurrentDateFormatted, hasQtyGreaterThanOne } from "@/utils/logics";
import { BiHelpCircle, BiSolidBed } from "react-icons/bi";
import { GiForkKnifeSpoon, GiOfficeChair, GiSofa } from "react-icons/gi";
import { LuMicrowave } from "react-icons/lu";
import { TbGardenCart } from "react-icons/tb";

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
    //
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
  const [livingName, setLivingName] = useState("");
  const [livingQty, setLivingQty] = useState(1);
  const [diningName, setDiningName] = useState("");
  const [diningQty, setDiningQty] = useState(1);
  const [kitchenName, setKitchenName] = useState("");
  const [kitchenQty, setKitchenQty] = useState(1);
  const [officeName, setOfficeName] = useState("");
  const [officeQty, setOfficeQty] = useState(1);
  const [bathRoomName, setBathRoomName] = useState("");
  const [bathRoomQty, setBathRoomQty] = useState(1);
  const [gardenName, setGardenName] = useState("");
  const [gardenQty, setGardenQty] = useState(1);

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
          stage: "reservation",
          moveItems: ab?.moveItems,
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

  // console.log({ reserveDetails, moveItems });

  return (
    <div className="">
      <div className="mb-[10px] md:mb-[20px]">
        <div className="text-2xl font-bold mb-[15px] flex flex-col space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[10px]">
          <p className="">What are you moving</p>
          <div
            className="flex items-center space-x-[5px]"
            // className="tooltip cursor-pointer"
            // data-tip="Please always submit after adding items"
          >
            <BiHelpCircle className="font-bold text-[25px] text-secondary" />
            <p className="text-[14px] text-secondary italic">
              Please always submit after you're done adding items
            </p>
          </div>
        </div>
        {/* item display */}
        <div className="text-[14px] font-semibold">
          <div className="mb-[10px]">
            {hasQtyGreaterThanOne(moveItems?.office) && (
              <span className="text-secondary">Office: </span>
            )}
            {moveItems?.office.map((mi, index) => {
              return (
                <span key={index}>
                  {mi.qty > 0 && (
                    <span>
                      {mi.qty} x {mi.name},{" "}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div className="mb-[10px]">
            {hasQtyGreaterThanOne(moveItems?.living) && (
              <span className="text-secondary">Living Room: </span>
            )}
            {moveItems?.living.map((mi, index) => {
              return (
                <span key={index}>
                  {mi.qty > 0 && (
                    <span>
                      {mi.qty} x {mi.name},{" "}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div className="mb-[10px]">
            {hasQtyGreaterThanOne(moveItems?.bedRoom) && (
              <span className="text-secondary">Bed Room: </span>
            )}
            {moveItems?.bedRoom.map((mi, index) => {
              return (
                <span key={index}>
                  {mi.qty > 0 && (
                    <span>
                      {mi.qty} x {mi.name},{" "}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div className="mb-[10px]">
            {hasQtyGreaterThanOne(moveItems?.dining) && (
              <span className="text-secondary">Dining: </span>
            )}
            {moveItems?.dining.map((mi, index) => {
              return (
                <span key={index}>
                  {mi.qty > 0 && (
                    <span>
                      {mi.qty} x {mi.name},{" "}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div className="mb-[10px]">
            {hasQtyGreaterThanOne(moveItems?.kitchen) && (
              <span className="text-secondary">Kitchen: </span>
            )}
            {moveItems?.kitchen.map((mi, index) => {
              return (
                <span key={index}>
                  {mi.qty > 0 && (
                    <span>
                      {mi.qty} x {mi.name},{" "}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div className="mb-[10px]">
            {hasQtyGreaterThanOne(moveItems?.bathRoom) && (
              <span className="text-secondary">Bath Room: </span>
            )}
            {moveItems?.bathRoom.map((mi, index) => {
              return (
                <span key={index}>
                  {mi.qty > 0 && (
                    <span>
                      {mi.qty} x {mi.name},{" "}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div className="mb-[10px]">
            {hasQtyGreaterThanOne(moveItems?.garden) && (
              <span className="text-secondary">Garden: </span>
            )}
            {moveItems?.garden.map((mi, index) => {
              return (
                <span key={index}>
                  {mi.qty > 0 && (
                    <span>
                      {mi.qty} x {mi.name},{" "}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Office */}
      <div className="collapse bg-orange-500/10 collapse-arrow mb-[10px]">
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
            <span className="loading loading-dots loading-md text-white"></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickUpItems;
