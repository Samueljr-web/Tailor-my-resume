"use client";

import apiClient from "@/lib/interceptor/api-client";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../components/spinner";
import { FcGoogle } from "react-icons/fc";

type SignUpProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
};
function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const onSubmit: SubmitHandler<SignUpProps> = async (data) => {
    setLoading(true);
    try {
      const res = await apiClient.post("/auth/register", data);

      if (res.status === 200 || res.status === 201) {
        toast.success("Signed up successfully");
        router.push("/signin");
        setLoading(false);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        console.log("error:", error.response.data.message);
        toast.error("A user with this email already exists");
      } else {
        console.log("error", error);
        toast.error("Something went wrong");
      }
      setLoading(false);
    }
  };

  return (
    <div className=" text-center mt-6 max-w-3xl mx-auto bg-white p-6 shadow rounded-[20px]">
      <h2 className="text-2xl text-[#111827]">Sign up</h2>
      <h4 className="text-[#12121280] mt-4">
        Create an account to begin generating Resumes
      </h4>

      <button
        disabled={loading}
        className="cursor-pointer text-center mt-12  border border-[#CBD5E1] w-[500px] py-4 disabled:opacity-70 rounded-lg"
      >
        <span className="flex  items-center justify-center gap-2">
          <i className="text-3xl">
            <FcGoogle />
          </i>
          Sign Up with Google
        </span>
      </button>

      <div className="flex w-full items-center mt-8 gap-2 ">
        <div className="w-full bg-[#CBD5E1] h-[1px]"></div> OR
        <div className="w-full bg-[#CBD5E1] h-[1px]"></div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center w-full flex-col gap-6 px-[29px] text-[16px] mt-5"
      >
        <div className="flex w-full gap-2">
          <div className="flex flex-col w-full">
            <label className="text-left">First name</label>
            <input
              className={`py-4 p-2 ${
                errors.firstName ? "outline-red-400" : ""
              }  mt-3 rounded-lg text-sm  border border-[#CBD5E1]`}
              placeholder="Enter your first name"
              type="text"
              {...register("firstName", {
                required: "required",
              })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-left">Last name</label>
            <input
              className={`py-4 p-2 ${
                errors.lastName ? "outline-red-400" : ""
              }  mt-3 rounded-lg text-sm  border border-[#CBD5E1]`}
              placeholder="doe"
              type="text"
              {...register("lastName", {
                required: "lastName is required",
              })}
            />{" "}
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <label className="text-left">Email</label>
          <input
            className={`py-4 p-2 ${
              errors.email ? "outline-red-400" : ""
            }  mt-3 rounded-lg text-sm  border border-[#CBD5E1]`}
            placeholder="Enter your email address"
            type="email"
            {...register("email", {
              required: "email is required",
            })}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label className="text-left">Password</label>
          <input
            className={`py-4 p-2 ${
              errors.password ? "outline-red-400" : ""
            }  mt-3 rounded-lg text-sm  border border-[#CBD5E1]`}
            placeholder="create password"
            type="password"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label className="text-left">Retype Password</label>
          <input
            className={`py-4 p-2 ${
              errors.password ? "outline-red-400" : ""
            }  mt-3 rounded-lg text-sm  border border-[#CBD5E1]`}
            placeholder="Retype Password"
            type="password"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
        </div>

        <div className="flex items-center justify-start w-full gap-2">
          <input type="checkbox" id="agree" />
          <label htmlFor="agree" className="text-[12px]">
            I agree to all the Terms and Privacy policy{" "}
          </label>
        </div>

        <button
          disabled={loading}
          className="cursor-pointer flex justify-center rounded-[8px] w-full mt-4 bg-gradient-to-r from-[rgba(16,24,40,0.5)] to-[rgba(43,127,255,0.5)] py-4 text-[#FFFFFF80]"
        >
          {loading ? <Spinner /> : "Sign up"}
        </button>
        <h2>
          dont have an account?{" "}
          <Link className="text-[#2B7FFF]" href={"/signin"}>
            Signin
          </Link>
        </h2>
      </form>
    </div>
  );
}

export default Page;
