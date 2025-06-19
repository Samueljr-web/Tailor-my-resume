import React from "react";
import Logo from "./logo";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  const productLinks = [
    {
      name: "Features",
      to: "/",
    },
    {
      name: "Pricing",
      to: "/",
    },
    {
      name: "Dashboard",
      to: "/",
    },
  ];
  const companyLinks = [
    {
      name: "About Us",
      to: "/",
    },
    {
      name: "Contact",
      to: "/",
    },
    {
      name: "Privacy Policy",
      to: "/",
    },
    {
      name: "Terms of Service",
      to: "/",
    },
  ];
  return (
    <div className="w-full  bg-[linear-gradient(97deg,_#101828_14.11%,_#2B7FFF_187.12%)] py-[49px] px-18 mt-[64px]">
      <div className="flex justify-between">
        <div className="flex">
          <div className="mr-8">
            <Logo light={true} weight={"400"} />
            <h4 className="text-[16px] text-[#99A1AF] w-[270px] mt-[20px]">
              AI-powered resume analysis to help you land your dream job.{" "}
            </h4>
          </div>

          <div className="flex flex-col">
            <h2 className="text-white">PRODUCT</h2>
            {productLinks.map((link, index) => (
              <Link
                key={index}
                href={link.to}
                className="text-[#99A1AF] text-[16px] mt-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="ml-[100px] flex flex-col">
            <h2 className="text-white">COMPANY</h2>
            {companyLinks.map((link, index) => (
              <Link
                key={index}
                href={link.to}
                className="text-[#99A1AF] text-[16px] mt-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Image
            src={"/assets/logo-light.svg"}
            alt="logo-light"
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className="mt-[47px]">
        <hr className="border-white " />
        <div className="flex justify-between mt-8">
          <h3 className="text-white">
            &copy; 2025 ResuTailor. All rights reserved.
          </h3>
          <div className="text-[#99A1AF] flex gap-2">
            <Link href={""}>Privacy</Link>
            <Link href={""}>Terms</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
