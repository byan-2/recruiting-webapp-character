import React, { useState, useMemo } from 'react';
import { CLASS_LIST } from '../consts';
import MinAttributes from './MinAttributes';
import { Class } from '../types';

type ClassesProps = {
  attributes: Record<string, number>;
};

const Classes: React.FC<ClassesProps> = ({ attributes }) => {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const qualifiedClasses = useMemo(() => {
    return Object.entries(CLASS_LIST).reduce((acc, [className, classRequirements]) => {
      const meetsRequirements = Object.entries(classRequirements).every(
        ([attr, minValue]) => attributes[attr] >= minValue
      );

      return {
        ...acc,
        [className]: meetsRequirements
      };
    }, {});
  }, [attributes]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <h2>Available Classes</h2>
        {Object.keys(CLASS_LIST).map((className: Class) => (
          <div
            key={className}
            onClick={() => setSelectedClass(className)}
            style={{
              cursor: 'pointer',
              color: qualifiedClasses[className]
                ? 'white'
                : 'red'
            }}
          >
            {className}
          </div>
        ))}
      </div>
      {selectedClass && <MinAttributes selectedClass={selectedClass} onClose={() => setSelectedClass(null)} />}
    </div>
  );
};

export default Classes;

