import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Attributes from './Attributes';
import Classes from './Classes';
import Skills from './Skills';
import SkillCheck from './SkillCheck';
import { ATTRIBUTE_LIST, SKILL_LIST } from '../consts';
import { Attribute, Character } from '../types';

const INITIAL_STAT = 10;
const MAX_TOTAL_ATTRIBUTE_POINTS = 70;

interface CharacterProps {
  id: number;
}

export interface CharactersHandle {
  exportState: () => Character;
  importState: (state: Character) => void;
}

const Characters = forwardRef<CharactersHandle, CharacterProps>(({ id }: CharacterProps, ref) => {
  const [attributes, setAttributes] = useState<Attribute>(() =>
    ATTRIBUTE_LIST.reduce((acc, attribute) => {
      acc[attribute] = INITIAL_STAT;
      return acc;
    }, {} as Attribute)
  );

  const [totalAttributePoints, setTotalAttributePoints] = useState<number>(
    ATTRIBUTE_LIST.length * INITIAL_STAT
  );

  const [skillPoints, setSkillPoints] = useState<Record<string, number>>(() =>
    SKILL_LIST.reduce((acc, skill) => {
      acc[skill.name] = 0;
      return acc;
    }, {} as Record<string, number>)
  );

  const [dc, setDc] = useState<number>(20);

  const incrementAttribute = (attribute: string) => {
    if (totalAttributePoints >= MAX_TOTAL_ATTRIBUTE_POINTS) {
      alert('You have reached the maximum total of 70 points');
      return;
    }
    setAttributes(prev => ({
      ...prev,
      [attribute]: prev[attribute] + 1,
    }));
    setTotalAttributePoints(prev => prev + 1);
  };

  const decrementAttribute = (attribute: string) => {
    if (attributes[attribute] <= 0) return;
    setAttributes(prev => ({
      ...prev,
      [attribute]: prev[attribute] - 1,
    }));
    setTotalAttributePoints(prev => prev - 1);
  };

  const incrementSkill = (skillName: string) => {
    setSkillPoints(prev => ({
      ...prev,
      [skillName]: prev[skillName] + 1,
    }));
  };

  const decrementSkill = (skillName: string) => {
    setSkillPoints(prev => ({
      ...prev,
      [skillName]: prev[skillName] - 1,
    }));
  };

  const characterState: Character = {
    id,
    attributes,
    totalAttributePoints,
    skillPoints,
    dc
  };

  const exportState = (): Character => characterState;

  const importState = (state: Character) => {
    setAttributes(state.attributes);
    setTotalAttributePoints(state.totalAttributePoints);
    setSkillPoints(state.skillPoints);
    setDc(state.dc);
  };

  useImperativeHandle(ref, () => ({
    exportState,
    importState,
  }));

  return (
    <div className="Character">
      <h2>Character {id}</h2>
      <SkillCheck dc={dc} character={characterState} onCheck={(value) => {
          const parsedValue = parseInt(value);
          if (!Number.isNaN(parsedValue)) {
            setDc(parsedValue)
          }
        }
      } />
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
