import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <div className="cursor-pointer flex items-baseline gap-0">
      <Image
        src="/assets/logo.png"
        width={56}
        height={56}
        alt="resutailor-logo"
      />
      <h2 className="font-bold text-2xl text-[#101828] tracking-[2.4px] -ml-1">
        Resu<span className="text-[#2B7FFF]">Tailor</span>
      </h2>
    </div>
  );
}

export default Logo;
