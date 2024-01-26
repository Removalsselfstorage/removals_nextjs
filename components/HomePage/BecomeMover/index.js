import Modal from "@/components/Modal/Modal";
import Link from "next/link";
import React, { useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

const BecomeMover = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='mb-[10px] lg:mb-[50px] bg-gray-500/10 pt-[50px]'>
      <div className='md:max-w-7xl mx-auto'>
        {/* row 1 */}
        <div className='flex items-center flex-col space-y-[30px] md:flex-row md:space-y-[0px] md:space-x-[50px] lg:space-x-[80px] mb-[0px]'>
          {/* video */}
          <div className='flex-[0.5] flex px-[20px] md:px-[0px] md:justify-end'>
            <div className='rounded-lg overflow-hidden cursor-pointer relative group'>
              <div className=''>
                <img
                  src='/driver2.png'
                  alt=''
                  className='w-[500px] h-[300px] md:w-fit md:h-[400px] object-contain'
                />
              </div>
            </div>
          </div>
          {/* text */}
          <div className='flex-[1] flex flex-col max-w-[600px] space-y-[30px] px-[30px]'>
            <h2 className='text-[25px] lg:text-[30px] font-bold'>
              Become a Mover
            </h2>
            <p className='text-[16px] lg:text-[17px]'>
              We are always looking to partner with more top-rated, committed
              professionals. If you are looking to grow your business and have a
              passion for customer service, complete our quick and easy
              registration process and become one of our valued partners.
            </p>
            <Link href='/join-us' className=''>
              <button className='btn btn-block md:btn-wide btn-primary flex items-center space-x-[5px]'>
                <span className=''>Join Us Today</span>
                {/* <span className="">
                  <FiEdit className="text-[20px]" />
                </span> */}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {/* <button className="btn" onClick={() => window.my_modal_3.showModal()}>
        open modal
      </button> */}
      {/* <dialog id="my_modal_3" className="modal w-[800px] h-[500px]">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div className="">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/FTwlgqRYlwU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </form>
      </dialog> */}
      {showModal && (
        <Modal showCloseIcon blur closeModal={() => setShowModal(false)}>
          <div className='px-[30px] md:px-[0]'>
            <iframe
              src='https://player.vimeo.com/video/464246309?autoplay=1&loop=1'
              // width="640"
              // height="360"
              frameborder='0'
              allow='autoplay; fullscreen; picture-in-picture'
              // allow="autoplay; fullscreen;"
              allowfullscreen
              className=' w-[400px] h-[300px] md:w-[640px] md:h-[360px] lg:w-[853px] lg:h-[505px]'
            ></iframe>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BecomeMover;
