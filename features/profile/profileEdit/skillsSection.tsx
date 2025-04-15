"use client";

import { BiX } from "react-icons/bi";

interface Skill {
  [category: string]: string[];
}

interface SkillsSectionProps {
  skills: Skill[];
  setSkills: (updatedSkills: Skill[]) => void;
}

export default function SkillsSection({
  skills,
  setSkills,
}: SkillsSectionProps) {
  const handleDeleteCategory = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  };

  const handleCategoryChange = (index: number, newCategory: string) => {
    const oldCategory = Object.keys(skills[index])[0];
    const items = skills[index][oldCategory];
    const updated = [...skills];
    updated[index] = { [newCategory]: items };
    setSkills(updated);
  };

  const handleSkillChange = (
    catIndex: number,
    skillIndex: number,
    value: string
  ) => {
    const category = Object.keys(skills[catIndex])[0];
    const items = [...skills[catIndex][category]];
    items[skillIndex] = value;
    const updated = [...skills];
    updated[catIndex][category] = items;
    setSkills(updated);
  };

  const handleAddSkill = (catIndex: number) => {
    const category = Object.keys(skills[catIndex])[0];
    const updated = [...skills];
    updated[catIndex][category].push("");
    setSkills(updated);
  };

  const handleRemoveSkill = (catIndex: number, skillIndex: number) => {
    const category = Object.keys(skills[catIndex])[0];
    const updated = [...skills];
    updated[catIndex][category].splice(skillIndex, 1);
    setSkills(updated);
  };

  const handleAddCategory = () => {
    setSkills([...skills, { "New Category": [""] }]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Skills</h2>

      {skills.map((skillObj, index) => {
        const category = Object.keys(skillObj)[0];
        const items = skillObj[category];

        return (
          <div
            key={index}
            className="relative border p-4 rounded-lg bg-gray-50 mb-4"
          >
            <button
              type="button"
              onClick={() => handleDeleteCategory(index)}
              className="absolute bg-red-500 rounded-full -top-2 -right-2 text-gray-400 hover:text-red-500"
              aria-label="Delete experience"
            >
              <BiX size={18} className="text-white" />
            </button>

            {/* Category name */}
            <input
              className="input mb-3"
              value={category}
              onChange={(e) => handleCategoryChange(index, e.target.value)}
              placeholder="Skill Category"
            />

            {/* Skills */}
            <div className="space-y-2">
              {items.map((item, skillIndex) => (
                <div key={skillIndex} className="flex items-center gap-2">
                  <input
                    className="input flex-1"
                    value={item}
                    onChange={(e) =>
                      handleSkillChange(index, skillIndex, e.target.value)
                    }
                    placeholder={`Skill ${skillIndex + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index, skillIndex)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <BiX size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add skill */}
            <button
              type="button"
              onClick={() => handleAddSkill(index)}
              className="text-blue-600 text-sm mt-2"
            >
              + Add Skill
            </button>
          </div>
        );
      })}

      {/* Add new category */}
      <button
        type="button"
        onClick={handleAddCategory}
        className="text-blue-600 mt-2"
      >
        + Add Skill Category
      </button>
    </div>
  );
}
