"use client";

import { BiX } from "react-icons/bi";
import { useState } from "react";

interface Skill {
  [category: string]: string[];
}

type SkillsSectionProps = {
  skills: Skill[] | string[];
  setSkills: (updatedSkills: Skill[] | string[]) => void;
};

export default function SkillsSection({
  skills,
  setSkills,
}: SkillsSectionProps) {
  const [isCategorized, setIsCategorized] = useState(
    Array.isArray(skills) ? false : true
  );

  const toggleSkillType = () => {
    if (isCategorized) {
      const flat = (skills as Skill[]).flatMap((obj) =>
        Object.values(obj).flat()
      );
      setSkills(flat);
    } else {
      setSkills([{ "New Category": [...(skills as string[])] }]);
    }
    setIsCategorized(!isCategorized);
  };

  const handleUncategorizedSkillChange = (index: number, value: string) => {
    const updated = [...(skills as string[])];
    updated[index] = value;
    setSkills(updated);
  };

  const addUncategorizedSkill = () => {
    setSkills([...(skills as string[]), ""]);
  };

  const removeUncategorizedSkill = (index: number) => {
    const updated = [...(skills as string[])];
    updated.splice(index, 1);
    setSkills(updated);
  };

  // ---------------------
  // CATEGORIZED HANDLING
  // ---------------------
  const handleDeleteCategory = (index: number) => {
    const updated = (skills as Skill[]).filter((_, i) => i !== index);
    setSkills(updated);
  };

  const handleCategoryChange = (index: number, newCategory: string) => {
    const oldCategory = Object.keys((skills as Skill[])[index])[0];
    const items = (skills as Skill[])[index][oldCategory];
    const updated = [...(skills as Skill[])];
    updated[index] = { [newCategory]: items };
    setSkills(updated);
  };

  const handleSkillChange = (
    catIndex: number,
    skillIndex: number,
    value: string
  ) => {
    const category = Object.keys((skills as Skill[])[catIndex])[0];
    const items = [...(skills as Skill[])[catIndex][category]];
    items[skillIndex] = value;
    const updated = [...(skills as Skill[])];
    updated[catIndex][category] = items;
    setSkills(updated);
  };

  const handleAddSkill = (catIndex: number) => {
    const category = Object.keys((skills as Skill[])[catIndex])[0];
    const updated = [...(skills as Skill[])];
    updated[catIndex][category].push("");
    setSkills(updated);
  };

  const handleRemoveSkill = (catIndex: number, skillIndex: number) => {
    const category = Object.keys((skills as Skill[])[catIndex])[0];
    const updated = [...(skills as Skill[])];
    updated[catIndex][category].splice(skillIndex, 1);
    setSkills(updated);
  };

  const handleAddCategory = () => {
    setSkills([...(skills as Skill[]), { "New Category": [""] }]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Skills</h2>
        <button
          type="button"
          onClick={toggleSkillType}
          className="text-sm text-blue-600"
        >
          Switch to {isCategorized ? "Simple List" : "Categorized"} Skills
        </button>
      </div>

      {isCategorized ? (
        <>
          {(skills as Skill[]).map((skillObj, index) => {
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
                  className="absolute bg-red-500 rounded-full -top-2 -right-2 text-white"
                  aria-label="Delete category"
                >
                  <BiX size={18} />
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

          <button
            type="button"
            onClick={handleAddCategory}
            className="text-blue-600 mt-2"
          >
            + Add Skill Category
          </button>
        </>
      ) : (
        <>
          {(skills as string[]).map((skill, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                className="input flex-1"
                value={skill}
                onChange={(e) =>
                  handleUncategorizedSkillChange(index, e.target.value)
                }
                placeholder={`Skill ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeUncategorizedSkill(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <BiX size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addUncategorizedSkill}
            className="text-blue-600 mt-2"
          >
            + Add Skill
          </button>
        </>
      )}
    </div>
  );
}
