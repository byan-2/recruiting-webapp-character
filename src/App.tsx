import './App.css';
import { useState, useEffect } from 'react';
import Characters from './components/Characters';
import { Character } from './types';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts';

const INITIAL_STAT = 10;

const createDefaultCharacter = (id: number): Character => ({
  id,
  attributes: ATTRIBUTE_LIST.reduce((acc, attr) => {
    acc[attr] = INITIAL_STAT;
    return acc;
  }, {} as any),
  skillPoints: SKILL_LIST.reduce((acc, skill) => {
    acc[skill.name] = 0;
    return acc;
  }, {} as Record<string, number>),
  dc: 20
});

function App() {
  const [characters, setCharacters] = useState<Character[]>([createDefaultCharacter(1)]);

  const addCharacter = () => {
    const newId = characters.length + 1;
    setCharacters(prev => [...prev, createDefaultCharacter(newId)]);
  };

  const updateCharacter = (updated: Character) => {
    setCharacters(prev =>
      prev.map(c => (c.id === updated.id ? updated : c))
    );
  };

  const handleSaveAll = async () => {
    try {
      const response = await fetch('https://recruiting.verylongdomaintotestwith.ca/api/{byan-2}/character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(characters),
      });
      if (!response.ok) throw new Error('Failed to save characters');
      alert('Characters saved successfully.');
    } catch (err) {
      console.error(err);
      alert('Error saving characters.');
    }
  };

  const handleLoadAll = async () => {
    try {
      const response = await fetch('https://recruiting.verylongdomaintotestwith.ca/api/{byan-2}/character');
      if (!response.ok) throw new Error('Failed to load characters');
      const loaded = await response.json();
      const sorted = loaded.body.sort((a: Character, b: Character) => a.id - b.id);
      setCharacters(sorted);
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
      {characters.map(character => (
        <section className="App-section" key={character.id}>
          <Characters
            character={character}
            onChange={updateCharacter}
          />
        </section>
      ))}
    </div>
  );
}

export default App;
