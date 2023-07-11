import React, { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const SideModal = ({ children, closeModal, showCloseIcon, blur }) => {
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowClose(true);
    }, 3000);
    // setTimeout(() => {
    //   setShowClose(true);
    // }, 3000);
  }, [showClose]);

  return (
    <div
      //   onClick={closeModal}
      className={`bg-black/40 ${
        blur ? 'backdrop-blur-[3px]' : 'backdrop-blur-[10px]'
      }  fixed left-0 top-0 w-full h-full flex items-center justify-center z-[9000]`}
    >
      <div onClick={(evt) => evt.stopPropagation()} className="relative">
        {children}
        {showCloseIcon && (
          <div
            onClick={closeModal}
            className={`${
              showClose ? 'flex' : 'hidden'
            } cursor-pointer rounded-full h-[50px] w-[50px] md:h-[40px] md:w-[40px] hover:scale-[1.2] duration-200  items-center justify-center p-[5px] absolute top-[-20px] right-[45%] group md:top-[-30px] md:right-[0px] bg-secondary`}
          >
            <AiOutlineClose className="text-white text-[20px]  font-bold" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideModal;
