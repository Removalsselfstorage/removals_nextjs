import React, { useState } from "react";
import NumberInput from "@/components/Reservations/numberInput";
import { FaHouseLaptop } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";

const PickUpItems = () => {
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

  const [livingRoom, setLivingRoom] = useState(livingRoomInitial);
  const [diningRoom, setDiningRoom] = useState(diningRoomInitial);
  const [bedRoom, setBedRoom] = useState(bedRoomInitial);
  const [kitchen, setKitchen] = useState(kitchenInitial);

  return (
    <div className="">
      <div className="mb-[10px] md:mb-[20px]">
        <p className="text-2xl font-bold mb-[10px]">Select Items to move:</p>
        <p className="text-[14px]">
          {livingRoom?.lr1 > 0 && <span>{livingRoom?.lr1} x Sofa/Couch,</span>}{" "}
          {livingRoom?.lr2 > 0 && <span>{livingRoom?.lr2} x Television,</span>}{" "}
          {livingRoom?.lr3 > 0 && <span>{livingRoom?.lr3} x Bookshelves,</span>}{" "}
          {livingRoom?.lr4 > 0 && <span>{livingRoom?.lr4} x Chair,</span>}{" "}
          {livingRoom?.lr5 > 0 && <span>{livingRoom?.lr5} x Table,</span>}{" "}
          {livingRoom?.lr6 > 0 && <span>{livingRoom?.lr6} x Desk,</span>}{" "}
          {bedRoom?.br1 > 0 && <span>{bedRoom?.br1} x Bed,</span>}{" "}
          {bedRoom?.br2 > 0 && <span>{bedRoom?.br2} x Nightstand,</span>}{" "}
          {bedRoom?.br3 > 0 && <span>{bedRoom?.br3} x Dresser,</span>}{" "}
          {bedRoom?.br4 > 0 && <span>{bedRoom?.br4} x Wardrobe,</span>}{" "}
          {bedRoom?.br5 > 0 && <span>{bedRoom?.br5} x Mirror,</span>}{" "}
          {bedRoom?.br6 > 0 && <span>{bedRoom?.br6} x Mattress,</span>}
        </p>
      </div>

      {/* living Room */}
      <div className="collapse bg-orange-500/10 collapse-arrow mb-[20px]">
        <input type="checkbox" />
        <div className="collapse-title font-semibold text-secondary flex items-center space-x-[10px] mb-[0px]">
          <p className="text-[18px] font-bold  ">Living Room</p>
          <FaHouseLaptop className="font-bold text-[25px]" />
        </div>
        <div className="collapse-content">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[10px]">
            {/* lr1 */}
            <div className="form-control w-full">
              <NumberInput
                title="Sofa/Couch"
                count={livingRoom?.lr1}
                minusCount={() => {
                  setLivingRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    lr1: prevLivingRoom.lr1 - 1,
                  }));
                }}
                addCount={() => {
                  setLivingRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    lr1: prevLivingRoom.lr1 + 1,
                  }));
                }}
              />
            </div>
            {/* lr2 */}
            <div className="form-control w-full ">
              <NumberInput
                title="Television"
                count={livingRoom?.lr2}
                minusCount={() => {
                  setLivingRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    lr2: prevLivingRoom.lr2 - 1,
                  }));
                }}
                addCount={() => {
                  setLivingRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    lr2: prevLivingRoom.lr2 + 1,
                  }));
                }}
              />
            </div>
            {/* lr3 */}
            <div className="form-control w-full ">
              <NumberInput
                title="Bookshelves"
                count={livingRoom?.lr3}
                minusCount={() => {
                  setLivingRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    lr3: prevLivingRoom.lr3 - 1,
                  }));
                }}
                addCount={() => {
                  setLivingRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    lr3: prevLivingRoom.lr3 + 1,
                  }));
                }}
              />
            </div>
            {/* lr4 */}
            <div className="form-control w-full ">
              <NumberInput
                title="Chair"
                count={livingRoom?.lr4}
                minusCount={() => {
                  setLivingRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    lr4: prevLivingRoom.lr4 - 1,
                  }));
                }}
                addCount={() => {
                  setLivingRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    lr4: prevLivingRoom.lr4 + 1,
                  }));
                }}
              />
            </div>
            {/* lr5 */}
            <div className="form-control w-full ">
              <NumberInput
                title="Table"
                count={livingRoom?.lr5}
                minusCount={() => {
                  setLivingRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    lr5: prevLivingRoom.lr5 - 1,
                  }));
                }}
                addCount={() => {
                  setLivingRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    lr5: prevLivingRoom.lr5 + 1,
                  }));
                }}
              />
            </div>
            {/* lr6 */}
            <div className="form-control w-full ">
              <NumberInput
                title="Desk"
                count={livingRoom?.lr6}
                minusCount={() => {
                  setLivingRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    lr6: prevLivingRoom.lr6 - 1,
                  }));
                }}
                addCount={() => {
                  setLivingRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    lr6: prevLivingRoom.lr6 + 1,
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bed Room */}
      <div className="collapse bg-orange-500/10 collapse-arrow mb-[20px]">
        <input type="checkbox" />
        <div className="collapse-title font-semibold text-secondary flex items-center space-x-[10px] mb-[0px]">
          <p className="text-[18px] font-bold  ">Bed Room</p>
          <FaBed className="font-bold text-[25px]" />
        </div>
        <div className="collapse-content">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[10px]">
            {/* br1 */}
            <div className="form-control w-full">
              <NumberInput
                title="Bed"
                count={bedRoom?.br1}
                minusCount={() => {
                  setBedRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    br1: prevLivingRoom.br1 - 1,
                  }));
                }}
                addCount={() => {
                  setBedRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    br1: prevLivingRoom.br1 + 1,
                  }));
                }}
              />
            </div>
            {/* br2 */}
            <div className="form-control w-full ">
              <NumberInput
                title="Nightstand"
                count={bedRoom?.br2}
                minusCount={() => {
                  setBedRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    br2: prevLivingRoom.br2 - 1,
                  }));
                }}
                addCount={() => {
                  setBedRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    br2: prevLivingRoom.br2 + 1,
                  }));
                }}
              />
            </div>
            {/* br3 */}
            <div className="form-control w-full ">
              <NumberInput
                title="Dresser"
                count={bedRoom?.br3}
                minusCount={() => {
                  setBedRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    br3: prevLivingRoom.br3 - 1,
                  }));
                }}
                addCount={() => {
                  setBedRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    br3: prevLivingRoom.br3 + 1,
                  }));
                }}
              />
            </div>
            {/* br4 */}
            <div className="form-control w-full ">
              <NumberInput
                title="Wardrobe"
                count={bedRoom?.br4}
                minusCount={() => {
                  setBedRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    br4: prevLivingRoom.br4 - 1,
                  }));
                }}
                addCount={() => {
                  setBedRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    br4: prevLivingRoom.br4 + 1,
                  }));
                }}
              />
            </div>
            {/* br5 */}
            <div className="form-control w-full ">
              <NumberInput
                title="Mirror"
                count={bedRoom?.br5}
                minusCount={() => {
                  setBedRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    br5: prevLivingRoom.br5 - 1,
                  }));
                }}
                addCount={() => {
                  setBedRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    br5: prevLivingRoom.br5 + 1,
                  }));
                }}
              />
            </div>
            {/* br6 */}
            <div className="form-control w-full ">
              <NumberInput
                title="Mattress"
                count={bedRoom?.br6}
                minusCount={() => {
                  setBedRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    br6: prevLivingRoom.br6 - 1,
                  }));
                }}
                addCount={() => {
                  setBedRoom((prevLivingRoom) => ({
                    ...prevLivingRoom,
                    br6: prevLivingRoom.br6 + 1,
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickUpItems;
