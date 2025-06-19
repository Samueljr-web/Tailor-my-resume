import React from "react";
import { BiX } from "react-icons/bi";

export interface Edu {
  school: string;
  programme: string;
}

interface EduProps {
  education: Edu[];
  setEducation: (updatedEducations: Edu[]) => void;
}

function EducationSec({ education, setEducation }: EduProps) {
  const handleAddEducation = () => {
    setEducation([...education, { school: "", programme: "" }]);
  };

  const handleRemoveEducation = (index: number) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
  };

  const handleChange = (index: number, field: keyof Edu, value: string) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Education</h2>

      {education.map((edu, index) => (
        <div
          key={index}
          className="relative border p-4 mb-4 rounded-lg bg-gray-50"
        >
          <button
            type="button"
            onClick={() => handleRemoveEducation(index)}
            className="absolute bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
            aria-label="Delete education"
          >
            <BiX size={18} className="text-white" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="input"
              name="school"
              value={edu.school}
              onChange={(e) => handleChange(index, "school", e.target.value)}
              placeholder="School"
            />
            <input
              className="input"
              name="programme"
              value={edu.programme}
              onChange={(e) => handleChange(index, "programme", e.target.value)}
              placeholder="Programme"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddEducation}
        className="text-blue-600 mt-2"
      >
        + Add Education
      </button>
    </div>
  );
}

export default EducationSec;
