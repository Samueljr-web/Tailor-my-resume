import React from "react";

function HeroSection() {
  return (
    <div className="flex items-center mt-[5rem] md:mt-[10rem] justify-center ">
      <div className="">
        <div className="flex flex-col justify-start items-center">
          <div className="w-64 p-2 text-center bg-[#10182899] rounded-full text-neutral-50 text-sm font-medium">
            <span>AI-Powered Resume Analysis</span>
          </div>

          <div className="flex flex-col justify-start items-center mt-6">
            <div className="h-24 text-center">
              <span className="text-white text-2xl md:text-4xl font-bold md:leading-[90px]">
                One Resume.{" "}
              </span>
              <span className="text-blue-500 text-2xl md:text-4xl font-bold md:leading-[90px]">
                Infinite Customizations
              </span>
            </div>
            <div className="md:w-[648px] w-full text-center text-white text-xl font-semibold leading-7 mt-2 md:mt-4">
              Our smart system automatically adapts your resume to every job you
              apply for—no more manual edits or missed opportunities.
            </div>
          </div>

          <button className="cursor-pointer w-64 p-4 text-center mt-8 bg-gradient-to-br from-gray-900 to-blue-500 rounded-full outline outline-offset-[-1px] outline-neutral-50/50">
            <span className="text-neutral-50  text-xl font-semibold  leading-normal">
              Generate Resume
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
