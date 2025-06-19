"use client";
import Spinner from "@/app/components/spinner";
import withAuth from "@/app/components/withAuth";
import apiClient from "@/lib/interceptor/api-client";
import useProfileStore from "@/store/useProfileStore";
import { WorkExperience } from "@/types/profile";

import { useState } from "react";
import toast from "react-hot-toast";
import { BiX } from "react-icons/bi";
import SkillsSection from "./skillsSection";
import ProfileSkeleton from "./profileSkeleton";
import Breadcrumb from "@/app/components/breadCrumb";
import CertificateSection from "./certificateSection";

function ProfileEdit() {
  const { _hasHydrated, profile, setProfile } = useProfileStore();
  const [loading, setLoading] = useState(false);
  const breadcrumbPaths = [
    { name: "Profile", link: "/profile" },
    { name: "Edit Profile" },
  ];

  useState(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get("/profile");
        if (res.status === 200) {
          setProfile(res.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  });

  if (!_hasHydrated) {
    return null;
  }
  if (!profile) {
    return <ProfileSkeleton />;
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, user: { ...profile.user, [name]: value } });
  };

  const handleExperienceChange = (
    index: number,
    field: keyof WorkExperience,
    value: string
  ) => {
    const updatedExperience = [...profile.user.workExperience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    setProfile({
      ...profile,
      user: { ...profile.user, workExperience: updatedExperience },
    });
  };
  const handleDeleteExperience = (index: number) => {
    const updatedExperience = profile.user.workExperience.filter(
      (_, i) => i !== index
    );
    setProfile({
      ...profile,
      user: { ...profile.user, workExperience: updatedExperience },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile.user.jobTitle || !profile.user.yearsOfExperience) {
      toast.error("Job Title and Years of Experience are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await apiClient.put("/profile", profile.user);
      if (res.status === 200) {
        toast.success("Profile updated!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="ml-5 my-4 flex items-center space-x-2">
        <Breadcrumb paths={breadcrumbPaths} />
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="input"
              name="firstName"
              value={profile.user.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            <input
              className="input"
              name="lastName"
              value={profile.user.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            <input
              className="input"
              name="phoneNumber"
              value={profile.user.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
            <input
              className="input"
              name="jobTitle"
              value={profile.user.jobTitle}
              onChange={handleInputChange}
              placeholder="Job Title"
            />
            <input
              className="input"
              name="linkedinUrl"
              value={profile.user.linkedinUrl}
              onChange={handleInputChange}
              placeholder="LinkedIn URL"
            />
            <input
              className="input outline-none border"
              type="text"
              name="address"
              value={profile.user.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
            <input
              className="input outline-none border"
              type="number"
              name="yearsOfExperience"
              value={profile.user.yearsOfExperience}
              onChange={handleInputChange}
              placeholder="Years Of Experience"
            />
            <input
              className="input outline-none border"
              type="text"
              name="portfolioUrl"
              value={profile.user.portfolioUrl}
              onChange={handleInputChange}
              placeholder="Portfolio URL"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Work Experience</h2>

            {profile.user.workExperience?.map((exp, index) => (
              <div
                key={index}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border p-4 rounded-lg bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => handleDeleteExperience(index)}
                  className="absolute bg-red-500 rounded-full -top-2 -right-2 text-gray-400 hover:text-red-500"
                  aria-label="Delete experience"
                >
                  <BiX size={18} className="text-white" />
                </button>
                <input
                  className="input"
                  name="CompanyName"
                  value={exp.CompanyName}
                  onChange={(e) =>
                    handleExperienceChange(index, "CompanyName", e.target.value)
                  }
                  placeholder="Company Name"
                />
                <input
                  className="input"
                  name="Position"
                  value={exp.Position}
                  onChange={(e) =>
                    handleExperienceChange(index, "Position", e.target.value)
                  }
                  placeholder="Role"
                />
                <input
                  className="input"
                  type="date"
                  name="startDate"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleExperienceChange(index, "startDate", e.target.value)
                  }
                  placeholder="Start Date"
                />
                <input
                  className="input"
                  type="date"
                  name="endDate"
                  value={exp.endDate ?? ""}
                  onChange={(e) =>
                    handleExperienceChange(index, "endDate", e.target.value)
                  }
                  placeholder="End Date"
                />
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 mt-2"
              onClick={() =>
                setProfile({
                  ...profile,
                  user: {
                    ...profile.user,
                    workExperience: [
                      ...profile.user.workExperience,
                      {
                        CompanyName: "",
                        Position: "",
                        startDate: "",
                        endDate: "",
                      },
                    ],
                  },
                })
              }
            >
              + Add another experience
            </button>
          </div>
          <SkillsSection
            skills={profile.user.skills || []}
            setSkills={(newSkills) =>
              setProfile({
                ...profile,
                user: {
                  ...profile.user,
                  skills: newSkills,
                },
              })
            }
          />

          <div>
            <h2 className="text-2xl font-bold mb-4">Education</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="input"
                name="school"
                value={profile.user.education?.school}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    user: {
                      ...profile.user,
                      education: {
                        ...profile.user.education,
                        school: e.target.value,
                      },
                    },
                  })
                }
                placeholder="School"
              />

              <input
                className="input"
                name="programme"
                value={profile.user.education?.programme}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    user: {
                      ...profile.user,
                      education: {
                        ...profile.user.education,
                        programme: e.target.value,
                      },
                    },
                  })
                }
                placeholder="Programme"
              />
            </div>
          </div>

          <CertificateSection
            certificate={profile.user.certifications}
            setCertificate={(newCert) =>
              setProfile({
                ...profile,
                user: { ...profile.user, certifications: newCert },
              })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="flex justify-center bg-blue-600 text-white w-[170px] py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? <Spinner /> : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default withAuth(ProfileEdit);
