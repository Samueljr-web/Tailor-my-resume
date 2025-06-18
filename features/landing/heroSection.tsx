import React from "react";

function HeroSection() {
  return (
    <div className="flex items-center mt-[10rem] justify-center relative z-10">
      <div className="w-[1440px] h-[776px] ">
        <div className="flex flex-col justify-start items-center">
          <div className="w-64 p-2 text-center bg-[#10182899] rounded-full text-neutral-50 text-sm font-medium">
            <span>AI-Powered Resume Analysis</span>
          </div>

          <div className="flex flex-col justify-start items-center mt-6">
            <div className="h-24 text-center">
              <span className="text-white text-4xl font-bold leading-[90px]">
                One Resume.{" "}
              </span>
              <span className="text-blue-500 text-4xl font-bold leading-[90px]">
                Infinite Customizations
              </span>
            </div>
            <div className="w-[648px] text-center text-white text-xl font-semibold leading-7 mt-4">
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
