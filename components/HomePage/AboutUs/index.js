import Modal from '@/components/Modal';
import React, { useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';

const AboutUs = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mb-[50px] bg-primary/10 py-[50px]">
      <div className="md:max-w-7xl mx-auto">
        {/* row 1 */}
        <div className="flex items-center flex-col space-y-[30px] md:flex-row md:space-y-[0px] mb-[0px]">
          {/* video */}
          <div className="flex-[0.5] flex px-[20px] md:px-[0px] justify-center">
            <div className="rounded-lg overflow-hidden cursor-pointer relative group">
              {/* play button */}
              <div
                onClick={() => {
                  setShowModal(true);
                }}
                className="bg-black/60 hover:bg-black/90 w-[70px] h-[70px] absolute left-[43%] top-[40%] flex justify-center items-center rounded-full hover:scale-[1.2] duration-200"
              >
                <BsFillPlayFill
                  size={50}
                  color="white"
                  className="text-white"
                />
              </div>
              <div className="">
                <div className="hero-overlay"></div>
                <img
                  src="/hero_bg.jpg"
                  alt=""
                  className="w-[500px] h-[300px] md:max-w-[500px] object-cover"
                />
              </div>
            </div>
          </div>
          {/* text */}
          <div className="flex-[1] flex flex-col max-w-[600px] space-y-[30px] px-[30px]">
            <h2 className="text-2xl font-bold ">About Removal & Selfstorage</h2>
            <p className="text-[16px] lg:text-[17px]">
              By choosing Removal & Selfstorage, you’re guaranteeing a great
              moving day. All customers receive transparent pricing, flexible
              service options, background-checked movers, industry-best customer
              support, and an easy-to-access online dashboard.
            </p>
            <div className="">
              <button className="btn btn-block md:btn-wide btn-primary flex items-center space-x-[5px]">
                <span className="">Book A Move</span>
                {/* <span className="">
                  <FiEdit className="text-[20px]" />
                </span> */}
              </button>
            </div>
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
        <Modal closeModal={() => setShowModal(false)}>
          <div className="px-[30px] md:px-[0]">
              <iframe
                src="https://player.vimeo.com/video/464246309?autoplay=1&loop=1"
                // width="640"
                // height="360"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
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

export default AboutUs;
