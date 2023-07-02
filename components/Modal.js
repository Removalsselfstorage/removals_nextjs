import React from 'react';

const Modal = ({ children, closeModal, showCloseIcon }) => {
    return (
        <div
            onClick={closeModal}
            className="bg-black/40 backdrop-blur-[3px] fixed left-0 top-0 w-full h-full flex items-center justify-center z-[9000]"
        >
            <div onClick={(evt) => evt.stopPropagation()}>{children}</div>

            {showCloseIcon && (
                <span className="material-icons text-white text-3xl absolute right-9 top-6 cursor-pointer font-bold bg-opacity-100">
                    close
                </span>
            )}
        </div>
    );
};

export default Modal;
