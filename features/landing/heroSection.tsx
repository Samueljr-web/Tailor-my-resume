import React from "react";

function HeroSection() {
  return (
    <div className="flex items-center justify-center">
      <div>
        <section className="bg-gray-50 py-20 px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            One Resume.{" "}
            <span className="text-blue-500">Infinite Customizations.</span>
          </h2>
          <h4 className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Our smart system automatically adapts your resume to every job you
            apply for — no more manual edits or missed opportunities.
          </h4>
        </section>
        {/* 
        <section className="bg-gray-50 py-20 px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Smart Resumes,{" "}
            <span className="text-blue-500">Tailored for Every Job</span>
          </h2>
          <h4 className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Stop sending the same resume everywhere. Our tool automatically
            customizes your resume to match any job description — saving you
            time and boosting your chances.
          </h4>
        </section> */}
      </div>
    </div>
  );
}

export default HeroSection;
