import sha256 from 'crypto-js/sha256';
import React, { useEffect, useState } from 'react';
import Attribute from './Attribute';
import CharacterContext from './CharacterContext';
import baseCharacter from '../static/baseCharacter.json';
import classes from '../static/classes.json';
import { capitalize, calculateRunesNeeded, handleFocus } from '../utils/utils';

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
      updateRunes(level, nextLevel, runesHeld);
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
          <input
            onClick={handleFocus}
            onChange={updateCategory}
            value={name}
            title='name'
          ></input>
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
          <input
            onClick={handleFocus}
            onChange={updateCategory}
            value={level}
            title='level'
          ></input>
          <div>Runes Held: </div>
          <input
            onClick={handleFocus}
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
    let newCategoryValue = e.target.value;

    switch (category) {
      case 'name':
        setName(newCategoryValue);
        break;
      case 'level':
        newCategoryValue = Number(newCategoryValue);
        setLevel(newCategoryValue);
        setNextLevel(newCategoryValue + 1);
        if (newCategoryValue >= 1) {
          updateRunes(newCategoryValue, newCategoryValue + 1, runesHeld);
        }
        break;
      case 'runesHeld':
        setRunesHeld(newCategoryValue);
        break;
      default:
        setCharacterClass(characterClass);
        break;
    }
  };

  const updateRunes = (currentLevel, desiredLevel, runes) => {
    const [cost, leftoverRunes] = calculateRunesNeeded(
      currentLevel,
      desiredLevel,
      runes
    );
    setRunesNeeded(cost);
    setRunesHeld(leftoverRunes);
  };

  const updateCharacter = (e) => {
    e.preventDefault();

    console.log(e.target.value);
    setLevel(nextLevel);
    setNextLevel(nextLevel + 1);
    updateRunes(nextLevel, nextLevel + 1, runesHeld);
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

    // saveCharacter(character);
  };

  const confirmChoice = (e) => {
    e.preventDefault();

    if (window.confirm('Save this character? Runes needed will reset.')) {
      updateCharacter(e);
    }
  };

  // TODO: Build server/db that saves each character
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
      if (response) {
        alert('Character saved!');
      }
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
      <form onSubmit={confirmChoice}>
        <input type='submit' value='Save Build' />
      </form>
    </div>
  );
}
