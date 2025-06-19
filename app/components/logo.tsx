import Image from "next/image";
import React from "react";

function Logo({ light, weight }: any) {
  return (
    <div className="cursor-pointer flex items-baseline gap-0">
      {light ? (
        <Image
          src="/assets/logo-light.svg"
          width={56}
          height={56}
          alt="resutailor-logo"
        />
      ) : (
        <Image
          src="/assets/logo.png"
          width={56}
          height={56}
          alt="resutailor-logo"
        />
      )}

      <h2
        style={{ fontWeight: weight, color: light ? "#fff" : "#101828" }}
        className="text-2xl  tracking-[2.4px] -ml-1"
      >
        Resu<span className="text-[#2B7FFF]">Tailor</span>
      </h2>
    </div>
  );
}

export default Logo;
