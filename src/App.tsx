import './App.css';
import { useState, useRef, useEffect } from 'react';
import Characters, { CharactersHandle } from './components/Characters';
import { Character } from './types';

function App() {
  const [characterIds, setCharacterIds] = useState<number[]>([1]);
  const characterRefs = useRef<Map<number, CharactersHandle>>(new Map());

  const addCharacter = () => {
    const newId = characterIds.length + 1;
    setCharacterIds(prev => [...prev, newId]);
  };

  const handleSaveAll = async () => {
    const savedStates: Character[] = [];
    characterIds.forEach((id) => {
      const ref = characterRefs.current.get(id);
      if (ref && ref.exportState) {
        savedStates.push(ref.exportState());
      }
    });
    try {
      const response = await fetch('https://recruiting.verylongdomaintotestwith.ca/api/{byan-2}/character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(savedStates),
      });
      if (!response.ok) {
        throw new Error('Failed to save characters');
      }
      alert('Characters saved successfully.');
    } catch (err) {
      console.error(err);
      alert('Error saving characters.');
    }
  };

  const handleLoadAll = async () => {
    try {
      const response = await fetch('https://recruiting.verylongdomaintotestwith.ca/api/{byan-2}/character');
      if (!response.ok) {
        throw new Error('Failed to load characters');
      }
      const loadedStates = await response.json();
      const sortedStates = loadedStates.body.sort((a: Character, b: Character) => a.id - b.id);
      const loadedIds = sortedStates.map((state: Character) => state.id);
      setCharacterIds(loadedIds);
      setTimeout(() => {
        sortedStates.forEach((state: Character) => {
          const ref = characterRefs.current.get(state.id);
          if (ref && ref.importState) {
            ref.importState(state);
          }
        });
      }, 0);
    } catch (err) {
      console.error(err);
      alert('Error loading characters.');
    }
  };

  useEffect(() => {
    handleLoadAll();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Character Creation</h1>
        <button onClick={addCharacter}>Add New Character</button>
        <button onClick={handleSaveAll}>Save All Characters</button>
      </header>
      {characterIds.map(id => (
        <section className="App-section" key={id}>
          <Characters
            id={id}
            ref={el => {
              if (el) {
                characterRefs.current.set(id, el);
              } else {
                characterRefs.current.delete(id);
              }
            }}
          />
        </section>
      ))}
    </div>
  );
}

export default App;
