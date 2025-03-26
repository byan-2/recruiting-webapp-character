import React from 'react';
import { ATTRIBUTE_LIST } from '../consts';
import { calculateModifier } from '../utils';

type AttributesProps = {
  attributes: Record<string, number>;
  onIncrement: (attribute: string) => void;
  onDecrement: (attribute: string) => void;
};

const Attributes: React.FC<AttributesProps> = ({
  attributes,
  onIncrement,
  onDecrement
}) => {
  return (
    <div>
      <h2>Attributes</h2>
      {ATTRIBUTE_LIST.map(attribute => (
        <div key={attribute}>
          {attribute}: {attributes[attribute]}
          (Modifier: {calculateModifier(attributes[attribute])})
          <button onClick={() => onDecrement(attribute)}>-</button>
          <button onClick={() => onIncrement(attribute)}>+</button>
        </div>
      ))}
    </div>
  );
};

export default Attributes;