"use client";

import useAuthStore from "@/store/useAuthStore";
import useProfileStore from "@/store/useProfileStore";
import Link from "next/link";
import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { MdLogout } from "react-icons/md";

export default function NavBar() {
  const { _hasHydrated, isAuthenticated, logout } = useAuthStore();
  const setProfile = useProfileStore((state) => state.setProfile);

  if (!_hasHydrated) {
    return null;
  }
  const onLogout = () => {
    logout();
    setProfile(undefined);
  };

  return (
    <div className="flex items-center justify-between py-4 px-5">
      <div>
        <Link href={"/"}>
          {" "}
          <h2 className="text-[#111827] text-lg md:text-2xl font-bold">
            ResuTailor
          </h2>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-5">
        <Link href={"/#"}>Home</Link>
        <Link href={"/#"}>Pricing</Link>
        <Link href={"/#"}>FAQs</Link>
      </nav>

      <div>
        {isAuthenticated && (
          <div className="flex items-center gap-4">
            {/* <span className="text-sm text-gray-700 hidden md:block">
              {user?.email}
            </span> */}
            <Link href={"/profile"}>
              <span>
                <BiUserCircle className="text-3xl" />
              </span>
            </Link>
            <button onClick={() => onLogout()} className=" text-red-500">
              <MdLogout />
            </button>
          </div>
        )}
        {!isAuthenticated && (
          <Link
            href={"/signin"}
            className="py-2 px-3 text-lg md:text-xl md:py-3 md:px-5 bg-[#1F2937] text-white"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
}
