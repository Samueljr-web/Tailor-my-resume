"use client";

import useAuthStore from "@/store/useAuthStore";
import useProfileStore from "@/store/useProfileStore";
import Link from "next/link";
import React from "react";
import { MdLogout } from "react-icons/md";
import Logo from "./logo";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const currentPath = usePathname();
  const { _hasHydrated, isAuthenticated, logout } = useAuthStore();
  const setProfile = useProfileStore((state) => state.setProfile);
  const { profile } = useProfileStore();

  if (!_hasHydrated) {
    return null;
  }
  const onLogout = () => {
    logout();
    setProfile(undefined);
  };

  return (
    <div className="shadow-md flex items-center justify-between py-4 md:px-[58px] px-4">
      <div>
        <Link href={"/"}>
          <Logo light={false} weight={"700"} />
        </Link>
      </div>

      <nav className="hidden md:flex items-center text-[14px] text-[#121212] gap-5">
        <Link
          href={"/#"}
          className={currentPath === "/" ? " text-[#2B7FFF]" : ""}
        >
          Home
        </Link>
        <Link
          href={"/#"}
          className={currentPath === "/pricing" ? " text-[#2B7FFF]" : ""}
        >
          Pricing
        </Link>
        <Link
          href={"/#"}
          className={currentPath === "builder" ? " text-[#2B7FFF]" : ""}
        >
          Resume Builder
        </Link>
      </nav>

      <div>
        {isAuthenticated && (
          <div className="flex items-center gap-4">
            {/* <span className="text-sm text-gray-700 hidden md:block">
              {user?.email}
            </span> */}
            <Link href={"/profile"}>
              <span className="text-[#2B7FFF]">
                Welcome, {profile?.user.firstName}
              </span>
            </Link>
            <button onClick={() => onLogout()} className=" text-red-500">
              <MdLogout />
            </button>
          </div>
        )}
        {!isAuthenticated && (
          <div className="flex gap-2">
            <Link
              href={"/signup"}
              className="w-[134px] text-center py-2 bg-[linear-gradient(97deg,_#101828_14.11%,_#2B7FFF_187.12%)] rounded-full text-[16px] md:py-3 text-white"
            >
              Signup
            </Link>
            <Link
              href={"/signin"}
              className="w-[134px] text-center py-2 bg-[linear-gradient(97deg,_#101828_14.11%,_#2B7FFF_187.12%)] rounded-full text-[16px] md:py-3 text-white"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
