import Image from "next/image";
import React from "react";

// interface HowProp {
//   img: string;
//   title: string;
//   desc: string;
// }

function HowItWorks() {
  const howData = [
    {
      img: "/assets/100percent.svg",
      title: "Match Score",
      desc: "Get a percentage match between your resume and job description",
    },
    {
      img: "/assets/stretch-checked.svg",
      title: "Keyword Optimization",
      desc: "Identify missing keywords and phrases that are important to include in your resume. ",
    },
    {
      img: "/assets/downloads-icon.svg",
      title: "ATS Optimization",
      desc: "Ensure your resume passes through Applicant Tracking Systems with our AI-powered suggestions.",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center mt-[155px]">
      <div className="flex flex-col items-center w-[537px] text-center">
        <h2 className="font-bold text-4xl text-[#2B7FFF]">
          How ResuTailor Works
        </h2>
        <h3 className="text-[20px] text-[#121212] mt-4 ">
          Our AI-powered platform makes it easy to optimize your resume for any
          job in just three simple steps.{" "}
        </h3>
      </div>

      <div className="grid grid-cols-3 items-center gap-3 mt-[64px]">
        {howData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-[linear-gradient(97deg,_#101828_14.11%,_#2B7FFF_187.12%)] w-[400px] h-[320px] text-white px-[24px] py-2 rounded-[40px]"
          >
            <div className="relative w-[300px] h-24">
              <Image
                src={item.img}
                className="absolute w-full"
                alt="icon"
                fill
              />
            </div>
            <div className="text-center w-full mt-[25px]">
              <h2 className="font-semibold text-[24px] ">{item.title}</h2>
              <p className="text-[16px]">{item.desc}</p>
            </div>
          </div>
        ))}
        <div></div>
      </div>
    </div>
  );
}

export default HowItWorks;
