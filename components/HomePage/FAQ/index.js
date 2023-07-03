import FaqAccordion from '@/components/Accordion/FaqAccordion';
import { faqData } from '@/dummyData/FaqData';
import { titleFont } from '@/utils/fonts';



const FAQ = () => {
  return (
    <div className="mb-[30px] lg:mb-[50px]">
      <div className="md:max-w-7xl mx-auto">
        {/* Title */}
        <div className="w-full flex justify-center py-[50px]">
          {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
          <h3
            className={`${titleFont.variable} font-sans2 text-3xl lg:text-4xl font-extrabold flex-col items-center justify-center`}
          >
            <p className="">FAQ</p>{' '}
            <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
          </h3>
        </div>

        {/* Accordion */}
        <div className="mt-[0px]  mb-6 px-[20px] md:px-[30px] ">
          <FaqAccordion
            items={faqData}
            openFirst
            showLock
            titleStyle="px-[20px] py-[20px] lg:py-[30px]"
            childrenStyle=" px-[20px] py-[20px] text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
