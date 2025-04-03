import React, { useState } from "react";
import { Character } from "../types";
import { SKILL_LIST } from "../consts";
import { calculateModifier } from "../utils";

type SkillCheckProps = {
  dc: number;
  character: Character;
  onCheck: (result: string) => void;
};

const SkillCheck: React.FC<SkillCheckProps> = ({ character, dc, onCheck }) => {
  const [rollValue, setRollValue] = useState<number | null>(null);
  const [rollResult, setRollResult] = useState<string | null>(null);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number>(0);
  const selectedSkill = SKILL_LIST[selectedSkillIndex];

  const handleRoll = () => {
    const MAX_ROLL = 20;
    const roll = Math.floor(Math.random() * MAX_ROLL) + 1;
    const total = roll + character.skillPoints[selectedSkill.name] + calculateModifier(character.attributes[selectedSkill.attributeModifier]);
    setRollValue(total);
    setRollResult(total >= dc ? "Success" : "Failure");
  };

  return (
    <div>
      <h3>Skill Check</h3>
      <div>
        <label>
          Skill:
          <select
            value={selectedSkillIndex}
            onChange={(e) => setSelectedSkillIndex(Number(e.target.value))}
          >
            {SKILL_LIST.map((skill, index) => (
              <option key={skill.name} value={index}>
                {skill.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          DC:
          <input
            type="number"
            value={dc}
            onChange={(e) => onCheck(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleRoll}>Roll</button>
      {rollValue !== null && (
        <div>
          <p>Roll: {rollValue}</p>
          <p>Result: {rollResult}</p>
        </div>
      )}
    </div>
  );
};

export default SkillCheck;
