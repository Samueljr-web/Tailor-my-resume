"use client";

import apiClient from "@/lib/interceptor/api-client";
import useAuthStore from "@/store/useAuthStore";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../components/spinner";
import { FcGoogle } from "react-icons/fc";

type SignInProps = {
  email: string;
  password: string;
};

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInProps>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const [loading, setLoading] = React.useState(false);

  const onSubmit: SubmitHandler<SignInProps> = async (data) => {
    setLoading(true);
    try {
      const res = await apiClient.post("/auth/login", data);
      if (res.status === 200) {
        toast.success("Signed in successfully");
        const { data } = res;
        setAuthState({
          isAuthenticated: true,
          user: data,
        });
        const redirectTo = searchParams.get("redirectTo");
        router.push(redirectTo || "/generate");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error("Invalid credentials");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" text-center mt-6 max-w-3xl mx-auto bg-white p-6 shadow rounded-[20px]">
      <h2 className="text-2xl text-[#111827]">Login</h2>
      <h4 className="text-[#12121280] mt-4">
        Welcome back, you’ve been missed!
      </h4>
      <button
        disabled={loading}
        className="cursor-pointer text-center mt-12  border border-[#CBD5E1] w-[500px] py-4 disabled:opacity-70 rounded-lg"
      >
        <span className="flex  items-center justify-center gap-2">
          <i className="text-3xl">
            <FcGoogle />
          </i>
          Sign In with Google
        </span>
      </button>

      <div className="flex w-full items-center mt-8 gap-2 ">
        <div className="w-full bg-[#CBD5E1] h-[1px]"></div> OR
        <div className="w-full bg-[#CBD5E1] h-[1px]"></div>
      </div>

      <div className="mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center w-full flex-col gap-6 px-[29px] text-[16px]"
        >
          <div className="flex flex-col w-full">
            <label className="text-left">Email</label>
            <input
              className={`py-4 p-2 ${
                errors.email ? "outline-red-400" : ""
              }  mt-3 rounded-lg text-sm  border border-[#CBD5E1]`}
              placeholder="Enter your email address"
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-left">Password</label>
            <input
              className={`py-4 p-2 ${
                errors.password ? "outline-red-400" : ""
              }  mt-3 rounded-lg text-sm border border-[#CBD5E1]`}
              placeholder="Enter password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-1">
              <input type="checkbox" id="rmcheck" />
              <label htmlFor="rmcheck">Remember me?</label>
            </div>
            <div>
              {" "}
              <Link className="text-[#121212]" href={"/signup"}>
                Forgot Password?
              </Link>
            </div>
          </div>
          <button
            disabled={loading}
            className="cursor-pointer flex justify-center rounded-[8px] w-full mt-4 bg-gradient-to-r from-[rgba(16,24,40,0.5)] to-[rgba(43,127,255,0.5)] py-4 text-[#FFFFFF80]"
          >
            {loading ? <Spinner /> : "Login"}
          </button>
          <h2 className="mt-2 text-[#12121280]">
            Don’t have an account?{" "}
            <Link className="text-[#2B7FFF]" href={"/signup"}>
              Signup
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  );
}
