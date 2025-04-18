import Image from "next/image";
import Link from "next/link";
import React from "react";

function HeroSection() {
  return (
    <div className="flex items-center justify-around">
      <div className="flex justify-around md:mt-20 px-3 md:px-10">
        <section className="bg-gray-50 py-20 text-left space-y-4 max-w-2xl">
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4">
            One Resume.{" "}
            <span className="text-blue-500">Infinite Customizations.</span>
          </h2>
          <h4 className="text-lg md:text-xl text-gray-700 mx-auto">
            Our smart system automatically adapts your resume to every job you
            apply for — no more manual edits or missed opportunities.
          </h4>
          <Link href={"/generate"}>
            {" "}
            <button className="bg-[#111827] text-white px-2 py-2 md:py-3 ">
              Generate now
            </button>
          </Link>
        </section>
        <div className="hidden md:flex items-center justify-center bg-blue-200 p-3 w-[600px] rounded">
          <Image
            src={"/pexels-tima.jpg"}
            alt="img"
            sizes="lg"
            className="rounded"
            width={500}
            height={250}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
