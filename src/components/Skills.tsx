import React, { useState, useMemo } from "react";
import { SKILL_LIST } from "../consts";
import { calculateModifier } from "../utils";

type SkillsProps = {
  attributes: Record<string, number>;
  skillPoints: Record<string, number>;
  onIncrement: (skillName: string) => void;
  onDecrement: (skillName: string) => void;
};

const Skills: React.FC<SkillsProps> = ({ attributes, skillPoints, onIncrement, onDecrement }) => {
  const [totalPointsSpent, setTotalPointsSpent] = useState(0);

  const totalAvailablePoints = useMemo(() => {
    return 10 + 4 * calculateModifier(attributes.Intelligence);
  }, [attributes.Intelligence]);

  return (
    <div>
      <h2>Skills</h2>
      <div>Points: {totalAvailablePoints - totalPointsSpent}</div>
      {SKILL_LIST.map((skill) => {
        const attributeModifier = calculateModifier(attributes[skill.attributeModifier]);
        const skillPointsForSkill = skillPoints[skill.name];

        return (
          <div key={skill.name}>
            {`${skill.name} - points`}: {skillPointsForSkill}
            <button onClick={() => {
                if (totalPointsSpent < totalAvailablePoints) {
                  onIncrement(skill.name)
                  setTotalPointsSpent(prev => prev + 1);
                }
            }}>+</button>
            <button onClick={() => {
              if (skillPoints[skill.name] > 0) {
                onDecrement(skill.name);
                setTotalPointsSpent(prev => prev - 1);
              }
            }
            }>-</button>
            ({`Modifier: ${skill.attributeModifier}`}): {attributeModifier + ' '}
            total: {skillPointsForSkill + attributeModifier}
          </div>
        );
      })}
    </div>
  );
};

export default Skills;