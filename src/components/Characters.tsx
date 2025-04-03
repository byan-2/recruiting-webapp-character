import React from 'react';
import Attributes from './Attributes';
import Classes from './Classes';
import Skills from './Skills';
import SkillCheck from './SkillCheck';
import { Character } from '../types';

interface CharactersProps {
  character: Character;
  onChange: (updated: Character) => void;
}

const MAX_TOTAL_ATTRIBUTE_POINTS = 70;

const Characters = React.memo(({ character, onChange }: CharactersProps) => {
  const { id, attributes, skillPoints, dc } = character;

  const setAttribute = (attr: string, value: number) => {
    onChange({
      ...character,
      attributes: { ...attributes, [attr]: value },
    });
  };

  const incrementAttribute = (attr: string) => {
    if (Object.values(attributes).reduce((sum, val) => sum + val, 0) >= MAX_TOTAL_ATTRIBUTE_POINTS) {
      alert('You have reached the maximum total of 70 points');
      return;
    }
    setAttribute(attr, attributes[attr] + 1);
  };

  const decrementAttribute = (attr: string) => {
    if (attributes[attr] <= 0) return;
    setAttribute(attr, attributes[attr] - 1);
  };

  const setSkill = (skill: string, value: number) => {
    onChange({
      ...character,
      skillPoints: { ...skillPoints, [skill]: value },
    });
  };

  const incrementSkill = (skill: string) => {
    setSkill(skill, skillPoints[skill] + 1);
  };

  const decrementSkill = (skill: string) => {
    setSkill(skill, skillPoints[skill] - 1);
  };

  const updateDc = (value: string) => {
    const parsed = parseInt(value);
    if (!isNaN(parsed)) {
      onChange({ ...character, dc: parsed });
    }
  };

  return (
    <div className="Character">
      <h2>Character {id}</h2>
      <SkillCheck dc={dc} character={character} onCheck={updateDc} />
      <div style={{ display: 'flex' }}>
        <Attributes
          attributes={attributes}
          onIncrement={incrementAttribute}
          onDecrement={decrementAttribute}
        />
        <Classes attributes={attributes} />
        <Skills
          attributes={attributes}
          skillPoints={skillPoints}
          onIncrement={incrementSkill}
          onDecrement={decrementSkill}
        />
      </div>
    </div>
  );
});

export default Characters;
