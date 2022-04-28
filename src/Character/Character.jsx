import sha256 from 'crypto-js/sha256';
import React, { useEffect, useState } from 'react';
import Attribute from './Attribute';
import CharacterContext from './CharacterContext';
import baseCharacter from '../static/baseCharacter.json';
import classes from '../static/classes.json';
import { capitalize, calculateRunesNeeded } from '../utils/utils';

export default function Character() {
  const startingStatSum = Object.values(baseCharacter.stats.attributes).reduce(
    (a, b) => a + b
  );
  const [name, setName] = useState(baseCharacter.name);
  const [characterClass, setCharacterClass] = useState(baseCharacter.class);
  const [level, setLevel] = useState(baseCharacter.stats.level);
  const [previousLevel, setPreviousLevel] = useState(level);
  const [runesHeld, setRunesHeld] = useState(baseCharacter.stats.runesHeld);
  const [runesNeeded, setRunesNeeded] = useState(
    baseCharacter.stats.runesNeededForOneLevel
  );
  const [attributes, setAttributes] = useState(baseCharacter.stats.attributes);
  const [editMode, setEditMode] = useState(false);
  const [statSum, setStatSum] = useState(startingStatSum);

  useEffect(() => {
    const clearId = setTimeout(() => {
      const [cost, leftoverRunes] = calculateRunesNeeded(
        level,
        previousLevel,
        runesHeld
      );
      setRunesNeeded(cost);
      setRunesHeld(leftoverRunes);
      setPreviousLevel(level);
    }, 400);

    return () => clearTimeout(clearId);
  }, [level]);

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
          <div title='runesNeeded'>Runes Needed: {runesNeeded}</div>
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
          <div>Level: </div>
          <input onChange={updateCategory} value={level} title='level'></input>
          <div>Runes Held: </div>
          <input
            onChange={updateCategory}
            value={runesHeld}
            title='runesHeld'
          ></input>
          <div>Runes Needed: </div>
          <input
            onChange={updateCategory}
            value={runesNeeded}
            title='runesNeeded'
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
    setAttributes(classAttributes);
  };

  const updateCategory = (e) => {
    const category = e.target.title;
    const newCategoryValue = e.target.value;

    console.log(category, newCategoryValue);
    return;
  };

  return (
    <div>
      <CharacterContext.Provider value={[level, setLevel]}>
        <div>{editMode ? renderCharacterForm() : renderCharacter()}</div>
      </CharacterContext.Provider>
    </div>
  );
}
