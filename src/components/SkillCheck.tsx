import React, { useState } from "react";
import { Character } from "../types";
import { SKILL_LIST } from "../consts";
import { calculateModifier } from "../utils";

type SkillCheckProps = {
  dc: number;
  character: Character;
  onCheck: (result: string) => void;
};

const SkillCheck: React.FC<SkillCheckProps> = ({character, dc, onCheck}) => {
  const [rollValue, setRollValue] = useState(null);
  const [rollResult, setRollResult] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);

  const handleRoll = () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const skillValue = character.skillPoints[selectedSkill];
    const total = roll +
      skillValue +
      calculateModifier(character.attributes[SKILL_LIST.find(skill => skill.name === selectedSkill).attributeModifier]);
    setRollValue(total);
    if (total >= dc) {
      setRollResult('Success');
    } else {
      setRollResult('Failure');
    }
  };

  return (
    <div>
      <h3>Skill Check</h3>
      <div>
        <label>
          Skill:
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            {SKILL_LIST.map((skill) => (
              <option key={skill.name} value={skill.name}>
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