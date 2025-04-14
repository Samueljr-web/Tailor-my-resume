import { useEffect, useState } from "react";
import type { Profile, WorkExperience, Education } from "@/types/profile";
import withAuth from "@/app/components/withAuth";
import apiClient from "@/lib/interceptor/api-client";
import { AxiosError } from "axios";
import useProfileStore from "@/store/useProfileStore";

function ProfilePage() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const profile = useProfileStore((state) => state.getProfile());
  const setProfile = useProfileStore((state) => state.setProfile);

  const handleChange = (field: keyof Profile, value: string | number) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleArrayChange = (
    section: "workExperience" | "education" | "skills",
    index: number,
    field: string,
    value: string
  ) => {
    if (!profile) return;
    const updatedArray = [...(profile[section] || [])] as any[];
    updatedArray[index][field] = value;
    setProfile({ ...profile, [section]: updatedArray });
  };

  const handleAdd = (
    section: "workExperience" | "education" | "skills",
    newItem: WorkExperience | Education | { name: string }
  ) => {
    if (!profile) return;
    setProfile({
      ...profile,
      [section]: [...(profile[section] || []), newItem],
    });
  };

  const handleRemove = (
    section: "workExperience" | "education" | "skills",
    index: number
  ) => {
    if (!profile) return;
    const updatedArray = [...(profile[section] || [])];
    updatedArray.splice(index, 1);
    setProfile({ ...profile, [section]: updatedArray });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient("/profile");
        if (res.status === 200) {
          setProfile(res.data);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          console.log("Unauthorized");
        } else {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
  }, [setProfile]);

  if (!profile) return <p className="text-center mt-8">Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      {" "}
      <h2 className="font-medium text-3xl m-5">Profile</h2>
      <section className=" p-6 bg-white rounded-xl shadow-md">
        {/* Header */}

        <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
          <div>
            <p className="text-gray-600 mt-1">
              📍{" "}
              {editMode ? (
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="border-b border-gray-300"
                />
              ) : (
                profile.address
              )}
            </p>

            <p className="text-gray-600">
              🧠{" "}
              {editMode ? (
                <input
                  type="number"
                  value={profile.yearsOfExperience}
                  onChange={(e) =>
                    handleChange("yearsOfExperience", e.target.value)
                  }
                  className="border-b border-gray-300 w-16"
                />
              ) : (
                `${profile.yearsOfExperience}+ Years Experience`
              )}
            </p>

            {editMode ? (
              <input
                type="text"
                value={profile.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                className="text-blue-500 border-b border-gray-300 w-full mt-1"
              />
            ) : (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline block mt-1"
              >
                LinkedIn Profile
              </a>
            )}
          </div>

          {/* Edit Toggle */}
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {editMode ? "Save" : "Edit"}
          </button>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Skills</h3>

          <ul className={editMode ? "" : "flex gap-2 flex-wrap"}>
            {profile.skills.map((skill, index) => (
              <li key={index} className="flex items-center justify-between ">
                {editMode ? (
                  <div className="flex flex-col gap-2 space-y-4">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) =>
                        handleArrayChange(
                          "skills",
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      className="border p-2 rounded"
                    />
                    <button
                      onClick={() => handleRemove("skills", index)}
                      className="text-red-500 text-sm mt-1"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    <span>
                      {skill.name} {index < profile.skills.length - 1 && " | "}{" "}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {editMode && (
            <button
              onClick={() => handleAdd("skills", { name: "" })}
              className="text-blue-500 mt-2"
            >
              + Add Skill
            </button>
          )}
        </div>

        {/* Work Experience */}
        <div className="my-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Work Experience
          </h3>
          <ul className="space-y-4">
            {profile.workExperience.map((job, index) => (
              <li key={index} className="border-b pb-4">
                {editMode ? (
                  <div className="grid md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Job Position"
                      value={job.position}
                      onChange={(e) =>
                        handleArrayChange(
                          "workExperience",
                          index,
                          "position",
                          e.target.value
                        )
                      }
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={job.companyName}
                      onChange={(e) =>
                        handleArrayChange(
                          "workExperience",
                          index,
                          "companyName",
                          e.target.value
                        )
                      }
                      className="border p-2 rounded"
                    />

                    <button
                      onClick={() => handleRemove("workExperience", index)}
                      className="text-red-500 text-sm mt-1"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <h4 className="text-lg font-medium text-gray-900">
                      {job.position}
                    </h4>
                    <p className="text-sm text-gray-700">{job.companyName}</p>
                  </>
                )}
              </li>
            ))}
          </ul>

          {editMode && (
            <button
              onClick={() =>
                handleAdd("workExperience", {
                  position: "",
                  companyName: "",
                })
              }
              className="text-blue-500 mt-2"
            >
              + Add Work Experience
            </button>
          )}
        </div>

        {/* Education */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Education
          </h3>
          <ul className="space-y-4">
            {profile?.education.map((edu, index) => (
              <li key={index} className="border-b pb-4">
                {editMode ? (
                  <div className="grid md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.programme}
                      onChange={(e) =>
                        handleArrayChange(
                          "education",
                          index,
                          "programme",
                          e.target.value
                        )
                      }
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="School"
                      value={edu.school}
                      onChange={(e) =>
                        handleArrayChange(
                          "education",
                          index,
                          "school",
                          e.target.value
                        )
                      }
                      className="border p-2 rounded"
                    />

                    <button
                      onClick={() => handleRemove("education", index)}
                      className="text-red-500 text-sm mt-1"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <h4 className="text-lg font-medium text-gray-900">
                      {edu.programme}
                    </h4>
                    <p className="text-sm text-gray-700">{edu.school}</p>
                  </>
                )}
              </li>
            ))}
          </ul>

          {editMode && (
            <button
              onClick={() =>
                handleAdd("education", { programme: "", school: "" })
              }
              className="text-blue-500 mt-2"
            >
              + Add Education
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default withAuth(ProfilePage);
