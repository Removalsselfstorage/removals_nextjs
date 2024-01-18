import React from "react";
import Container from "./Container";
import Selector from "./Selector";
import { StorageData } from "@/dummyData/dummyData";

const StorageSize = ({
  setActiveCont,
  activeCont,
  setDuration,
  setQuantity,
  duration,
  quantity,
  handleDurationChange,
  handleDurationChange2,
  submitStatus,
  stage,
  setStage,
  containerSize,
  setContainerSize,
  price2,
  setPrice,
  discount,
setDiscount,
}) => {
  return (
    <div className=''>
      {/* selector */}

      <div className='px-[10px] md:px-[0px]'>
        <Selector
          setActiveCont={setActiveCont}
          activeCont={activeCont}
          setDuration={setDuration}
          setQuantity={setQuantity}
        />
      </div>
      {/* body */}
      <div className='px-[20px]  lg:px-[50px] mb-[50px] py-[30px] bg-white rounded-bl-[20px] rounded-br-[20px] mx-[10px] md:mx-[100px]'>
        {StorageData?.map((sd, index) => {
          return (
            <>
              {activeCont === sd?.active && (
                <Container
                  img={sd?.img}
                  title={sd?.name2}
                  price={sd?.price}
                  rate={sd?.price}
                  duration={duration}
                  quantity={quantity}
                  dimension={sd?.dimension}
                  note={sd?.note}
                  handleDurationChange={handleDurationChange}
                  handleDurationChange2={handleDurationChange2}
                  submitStatus={submitStatus}
                  stage={stage}
                  setStage={setStage}
                  containerSize={containerSize}
                  setContainerSize={setContainerSize}
                  price2={price2}
                  setPrice={setPrice}
                  discount={discount}
                  setDiscount={setDiscount}
                  discountValue={sd?.discount}
                />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default StorageSize;
