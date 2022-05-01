import sha256 from 'crypto-js/sha256';
import React, { useEffect, useState } from 'react';
import Attribute from './Attribute';
import CharacterContext from './CharacterContext';
import baseCharacter from '../static/baseCharacter.json';
import classes from '../static/classes.json';
import { capitalize, calculateRunesNeeded } from '../utils/utils';

export default function Character() {
  const [name, setName] = useState(baseCharacter.name);
  const [characterClass, setCharacterClass] = useState(
    baseCharacter.characterClass
  );
  const [level, setLevel] = useState(baseCharacter.stats.level);
  const [nextLevel, setNextLevel] = useState(level + 1);
  const [runesHeld, setRunesHeld] = useState(baseCharacter.stats.runesHeld);
  const [runesNeeded, setRunesNeeded] = useState(0);
  const [attributes, setAttributes] = useState(baseCharacter.stats.attributes);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const clearId = setTimeout(() => {
      const [cost, leftoverRunes] = calculateRunesNeeded(
        level,
        nextLevel,
        runesHeld
      );
      setRunesNeeded(cost);
      setRunesHeld(leftoverRunes);
    }, 400);

    return () => clearTimeout(clearId);
  }, [level, nextLevel, runesHeld]);

  // Renderers
  const renderCharacter = () => {
    const attributeList = renderAttributes();
    return (
      <>
        <div onClick={toggleEditMode}>
          <div title='name'>Character Name: {capitalize(name)}</div>
          <div title='characterClass'>Class: {capitalize(characterClass)}</div>
          <div title='level'>Level: {level}</div>
          <div title='runesHeld'>Runes Held: {runesHeld}</div>
          <div title='nextLevel'>Next Level: {nextLevel}</div>
        </div>
        <div title='runesNeeded'>
          Runes needed to level up {nextLevel - level} times:{' '}
          <h3>{runesNeeded}</h3>
        </div>
        {attributeList}
      </>
    );
  };

  const renderCharacterForm = () => {
    const attributeList = renderAttributes();
    return (
      <div>
        <form onSubmit={toggleEditMode}>
          <div>Character Name: </div>
          <input onChange={updateCategory} value={name} title='name'></input>
          <div>Class: </div>
          <select
            onChange={updateClass}
            value={characterClass}
            title='characterClass'
            name='characterClass'
          >
            {renderClassOptions()}
          </select>
          <div>Current Level: </div>
          <input onChange={updateCategory} value={level} title='level'></input>
          <div>Runes Held: </div>
          <input
            onChange={updateCategory}
            value={runesHeld}
            title='runesHeld'
          ></input>
          <input type='submit' />
        </form>
        {attributeList}
      </div>
    );
  };

  const renderAttributes = () => {
    const attributeList = [];
    for (let attr in attributes) {
      attributeList.push(
        <Attribute
          attribute={attr}
          value={attributes[attr]}
          key={attr + attributes[attr]}
        />
      );
    }
    return attributeList;
  };

  const renderClassOptions = () => {
    const classNames = Object.keys(classes);
    const classList = classNames.map((classType) => (
      <option key={sha256(classType)}>{capitalize(classType)}</option>
    ));
    return classList;
  };

  // State Modifiers
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const updateClass = (e) => {
    const newClassType = e.target.value;
    const classStats = classes[newClassType.toLowerCase()];
    const classAttributes = { ...classStats?.stats?.attributes };

    setCharacterClass(newClassType);
    setLevel(classStats.stats.level);
    setNextLevel(classStats.stats.level + 1);
    setAttributes(classAttributes);
  };

  const updateCategory = (e) => {
    const category = e.target.title;
    const newCategoryValue = e.target.value;

    switch (category) {
      case 'name':
        setName(newCategoryValue);
        break;
      case 'level':
        setLevel(newCategoryValue);
        break;
      case 'runesHeld':
        setRunesHeld(newCategoryValue);
        break;
      default:
        setCharacterClass(characterClass);
        break;
    }
  };

  const updateCharacter = (e) => {
    e.preventDefault();

    setLevel(nextLevel);
    setNextLevel(level + 1);
    const character = {
      name: name,
      characterClass: characterClass,
      stats: {
        level: level,
        runesHeld: runesHeld,
        runesNeededForOneLevel: runesNeeded,
        attributes: attributes,
      },
    };

    saveCharacter(character);
  };

  const saveCharacter = async (characterData) => {
    console.log(characterData);
    try {
      const response = await fetch('CHARACTER_DB_URL_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characterData),
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <CharacterContext.Provider
        value={[level, nextLevel, setLevel, setNextLevel]}
      >
        <div>{editMode ? renderCharacterForm() : renderCharacter()}</div>
      </CharacterContext.Provider>
      {/* <input type='submit' value='Save Build' onSubmit={updateCharacter} /> */}
    </div>
  );
}
