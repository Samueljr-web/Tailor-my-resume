"use client";

import apiClient from "@/lib/interceptor/api-client";
import useAuthStore from "@/store/useAuthStore";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type SignInProps = {
  email: string;
  password: string;
};
function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInProps>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const setAuthState = useAuthStore((state) => state.setAuthState);
  const onSubmit: SubmitHandler<SignInProps> = async (data) => {
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
        console.log("Redirecting to:", redirectTo);
        router.push(redirectTo || "/generate");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        console.log("error:", error.response.data.message);
        toast.error("Invalid credentials");
      } else {
        console.log("error:", error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F9FAFB]">
      <h2 className="text-2xl text-[#111827]">Welcome back!</h2>
      <div className="mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center flex-col "
        >
          <input
            className="p-2 w-[300px] border"
            placeholder="johndoe@mail.com"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          <input
            className="p-2 w-[300px] border mt-4"
            placeholder="********"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
          />{" "}
          <div className="w-[300px] mt-2 text-left text-red-500 text-sm">
            {(errors.email?.type === "required" ||
              errors.password?.type === "required") && (
              <p>All fields are required</p>
            )}
          </div>
          <button className="cursor-pointer w-[300px] mt-4 bg-[#1F2937] p-2 text-white">
            Sign in
          </button>{" "}
          <h2>
            dont have an account?{" "}
            <Link className="underline" href={"/signup"}>
              Signup
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
}

export default Page;
