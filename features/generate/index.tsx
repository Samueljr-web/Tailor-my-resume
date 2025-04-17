"use client";
import withAuth from "@/app/components/withAuth";
import apiClient from "@/lib/interceptor/api-client";
import { GenerateProps } from "@/types/generate";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Generate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GenerateProps>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<GenerateProps> = async (data) => {
    setLoading(true);
    toast.loading("Generating your resume...");
    try {
      const res = await apiClient.post("/resume/generate", data, {
        timeout: 30000,
      });
      if (res.status === 200) {
        const { fileUrl } = res.data;
        const a = document.createElement("a");
        a.href = fileUrl;
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
        a.download = `${data.role}-${data.companyName}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        toast.dismiss();
        toast.success("Resume generated successfully!");
        setLoading(false);
      }
    } catch (error: unknown) {
      console.error("Error generating resume:", error);
      setLoading(false);
      toast.dismiss();
      toast.error("Error generating resume. Please try again.");
      return;
    }
    console.log(data);
  };
  return (
    <div className="flex flex-col mt-5 items-center justify-center">
      <div className="text-center">
        <h2 className="text-[#111827] font-semibold text-3xl">
          Tailor my Resume
        </h2>
        <h4 className="text-[#111827] text-lg mt-2">
          Generate a tailored resume for your job applications
        </h4>
      </div>
      <div className="flex w-[400px] flex-col gap-4 mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-col">
            <label>Job Role</label>
            <input
              className="p-2  border "
              type="text"
              placeholder="e.g. Software Engineer"
              {...register("role", { required: "Job role is required" })}
            />
            {errors.role && (
              <span className="text-red-500 text-sm">
                {errors.role.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label>Company Name</label>
            <input
              className="p-2  border "
              type="text"
              placeholder="e.g. Acme intl"
              {...register("companyName", {
                required: "Company name is required",
              })}
            />
            {errors.companyName && (
              <span className="text-red-500 text-sm">
                {errors.companyName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label>Job Description</label>
            <textarea
              className="p-2 border h-16"
              placeholder="Paste the job description here"
              {...register("jobDescription", {
                required: "Job description is required",
              })}
            />
            {errors.jobDescription && (
              <span className="text-red-500 text-sm">
                {errors.jobDescription.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`p-2 w-full bg-[#1F2937] mt-2 text-white cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Generate
          </button>
        </form>
      </div>
    </div>
  );
}

export default withAuth(Generate);
