import { titleFont } from '@/utils/fonts';
import React from 'react';

const WhyChooseUs = () => {
  return (
    <div className="mb-[50px]">
      <div className="md:max-w-7xl mx-auto">
        {/* Title */}
        <div className="w-full flex justify-center py-[50px]">
          {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
          <h3
            className={`${titleFont.variable} font-sans2 text-4xl font-extrabold flex-col items-center justify-center`}
          >
            <p className="">Why Choose Us</p>{' '}
            <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
          </h3>
        </div>

        {/* row 1 */}
        <div className="flex  flex-col space-y-[30px] md:flex-row md:items-center  md:space-y-[0px] mb-[50px]">
          {/* image */}
          <div className="flex-[0.8] flex  justify-center hover:rotate-[5deg] duration-200">
            <img
              src="/movers1.jpg"
              alt="Album"
              className="rounded-tl-[100px] rounded-br-[100px]"
            />
          </div>
          {/* text */}
          <div className="flex-[1] flex flex-col lg:flex-row  space-y-[20px] lg:space-y-[0]">
            <div className="flex-[1] flex flex-col lg:max-w-[350px] space-y-[30px] px-[40px] lg:px-[10px]">
              <h2 className="text-2xl font-bold ">High Quality Services</h2>
              <p className="text-[16px] lg:text-[17px]">
                We offer a comprehensive range of moving services tailored to
                meet your specific needs. Whether you require full-service
                packing, loading and unloading, transportation, or even
                specialized services such as furniture assembly and disassembly,
                <b> Removal & Selfstorage</b> have you covered. Our goal is to
                provide you with a customized moving plan that suits your
                requirements, making your move effortless and efficient.
              </p>
            </div>
            <div className="flex-[1] flex flex-col lg:max-w-[350px] space-y-[30px] px-[40px]">
              <h2 className="text-2xl font-bold ">Safe Transportation</h2>
              <p className="text-[16px] lg:text-[17px]">
                With <b>Removal & Selfstorage,</b> the safety and security of
                your belongings are of paramount importance to us. We utilize
                top-quality packing materials, state-of-the-art equipment, and
                secure transportation methods to safeguard your items throughout
                the moving process.
              </p>
            </div>
          </div>
        </div>

        {/* row 2 */}
        <div className="flex items-center flex-col space-y-[30px] md:flex-row-reverse md:items-center md:space-y-[0px]">
          {/* image */}
          <div className="flex-[0.8] flex  justify-center hover:rotate-[5deg] duration-200">
            <img
              src="/movers2.jpg"
              alt="Album"
              className="rounded-tl-[100px] rounded-br-[100px]"
            />
          </div>
          {/* text */}
          <div className="flex-[1] flex flex-col lg:flex-row  space-y-[20px] lg:space-y-[0]">
            <div className="flex-[1] flex flex-col lg:max-w-[350px] space-y-[30px] px-[40px] lg:px-[10px]">
              <h2 className="text-2xl font-bold ">Transparent Pricing</h2>
              <p className="text-[16px] lg:text-[17px]">
                At <b>Removal & Selfstorage,</b> we believe in transparency when
                it comes to pricing. We provide upfront and detailed cost
                estimates, free of any hidden charges or surprises. Our pricing
                is competitive and reflects the value of the services we offer.
                With us, you can have peace of mind knowing that you are
                receiving excellent service at a fair and reasonable price.
              </p>
            </div>
            <div className="flex-[1] flex flex-col lg:max-w-[350px] space-y-[30px] px-[40px]">
              <h2 className="text-2xl font-bold ">
                Excellent Customer Service
              </h2>
              <p className="text-[16px] lg:text-[17px]">
                We prioritize your satisfaction above all else. Our dedicated
                customer support team is available to address any questions or
                concerns you may have before, during, and after your move. We
                believe in open communication and strive to provide prompt and
                helpful responses to ensure your experience with us is nothing
                short of exceptional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
