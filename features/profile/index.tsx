"use client";

import Breadcrumb from "@/app/components/breadCrumb";
import withAuth from "@/app/components/withAuth";
import apiClient from "@/lib/interceptor/api-client";
import useProfileStore from "@/store/useProfileStore";
import Link from "next/link";
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";

function ProfileView() {
  const { _hasHydrated, profile, setProfile } = useProfileStore();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const breadcrumbPaths = [{ name: "Home", link: "/" }, { name: "Profile" }];
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get("/profile");
        if (res.status === 200) {
          console.log(res.data);
          setProfile(res.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [setProfile]);

  if (!_hasHydrated) {
    return null;
  }
  if (!profile) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  return (
    <div className="">
      <div className="ml-5 my-4 flex justify-between">
        <Breadcrumb paths={breadcrumbPaths} />
        <Link href={"/generate"} className="py-2 px-2 bg-[#1F2937] text-white">
          Generate
        </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold ">Profile</h1>
          <Link href={"/profile/edit"}>
            <button className="bg-blue-500 text-white px-4 py-2 ">
              <BiEdit />
            </button>
          </Link>
        </div>

        <h2 className="text-xl capitalize mt-3">{profile?.user.jobTitle}</h2>

        <div className="my-5">
          <h2 className="text-xl  text-[#111827] font-medium">
            Personal Details
          </h2>

          <div className="mt-5 flex flex-col gap-3">
            <h2>{profile?.user.email || "email"}</h2>
            <h2>{profile?.user.address || "address"}</h2>
            <h2>
              <Link
                className="text-blue-500"
                target="_blank"
                href={`https://${
                  profile?.user?.linkedinUrl || "linkedin.com/in/"
                }`}
              >
                {profile?.user?.linkedinUrl || "https://linkedin.com/in/"}
              </Link>
            </h2>

            <h2>{profile?.user?.yearsOfExperience || 0}+ Years Experience</h2>
          </div>
        </div>
        <hr />
        {/* Skills */}
        <div className="mt-5">
          <h2 className="text-xl text-[#111827] font-medium">Skills</h2>
          <div className="my-4 space-y-4">
            {Array.isArray(profile?.user?.skills) &&
              profile.user?.skills.map((skill, index) => {
                if (typeof skill === "object" && skill !== null) {
                  const category = Object.keys(skill)[0];
                  const techSkills = skill[category];

                  return (
                    <div key={index}>
                      <h2 className="text-md font-medium capitalize mb-2">
                        {category}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {techSkills.map((s: string, i: number) => (
                          <span
                            key={i}
                            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={index} className="flex w-full gap-2">
                    <span className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        <hr />
        {/* Work Experience */}
        <div className="mt-5">
          <h2 className="text-xl text-[#111827] font-medium">
            Work Experience
          </h2>
          <div className="my-4">
            {profile?.user?.workExperience.map((work, index) => (
              <div key={index} className="mt-4">
                <h2 className="text-lg font-medium capitalize">
                  {work.Position}
                </h2>
                <h2>{work.CompanyName}</h2>
                <div>
                  {formatDate(work.startDate)} -{" "}
                  {work.endDate ? formatDate(work.endDate) : "Present"}
                </div>
                <hr className="mt-2" />
              </div>
            ))}
          </div>
        </div>
        {/* Education */}
        <div className="mt-5">
          <h2 className="text-xl text-[#111827] font-medium">Education</h2>
          <div>
            {profile?.user?.education.map((edu, index) => (
              <div key={index} className="mt-4">
                <h2 className="text-lg font-medium capitalize">
                  {edu.programme}
                </h2>
                <h2>{edu.school}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProfileView);
