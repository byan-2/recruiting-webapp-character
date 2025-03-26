import { CLASS_LIST } from '../consts';
import { Class } from '../types';

type MinAttrProps = {
  selectedClass: Class;
  onClose: () => void;
};

const MinAttributes: React.FC<MinAttrProps> = function MinAttributes({ selectedClass, onClose }) {
  return (
      <div>
        <h4>Minimum Required Statistics for {selectedClass}:</h4>
        {Object.entries(CLASS_LIST[selectedClass]).map(([attr, minValue]) => (
          <div
            key={attr}
            style={{
              color: 'white'
            }}
          >
            {attr}: {minValue}
          </div>
        ))}
      <button onClick={onClose}>Close requirement view</button>
      </div>
  )
}

export default MinAttributes;