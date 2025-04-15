"use client";

import apiClient from "@/lib/interceptor/api-client";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../components/spinner";

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
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#F9FAFB]">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center flex-col "
        >
          <div className="flex w-[300px] gap-2">
            <input
              className="p-2 w-full border"
              placeholder="john"
              type="text"
              {...register("firstName", {
                required: "required",
              })}
            />
            <input
              className="p-2 w-full border "
              placeholder="doe"
              type="text"
              {...register("lastName", {
                required: "lastName is required",
              })}
            />{" "}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <input
              className="p-2 w-[300px] border "
              placeholder="johndoe@mail.com"
              type="email"
              {...register("email", {
                required: "email is required",
              })}
            />
            <input
              className="p-2 w-[300px] border "
              placeholder="********"
              type="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <input
              className="p-2 w-[300px] border "
              placeholder="+44 (8000000000)"
              type="tel"
              {...register("phoneNumber", {
                required: "phone is required",
              })}
            />
          </div>

          <div className="w-full text-red-500 text-left text-sm">
            {(errors.email || errors.password) && (
              <h2>All fields are required</h2>
            )}
            {errors.password?.type === "minLength" && (
              <div>{errors.password.message}</div>
            )}
          </div>
          <button
            disabled={loading}
            className="flex justify-center cursor-pointer w-[300px] mt-4 bg-[#1F2937] p-2 text-white disabled:opacity-70"
          >
            {loading ? <Spinner /> : "Sign up"}
          </button>
          <h2>
            dont have an account?{" "}
            <Link className="underline" href={"/signin"}>
              Signin
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
}

export default Page;
