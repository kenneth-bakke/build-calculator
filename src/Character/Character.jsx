import React, { useState } from 'react';
import Attribute from './Attribute';
import baseCharacter from '../static/baseCharacter.json';
import { capitalize } from '../utils/utils';
import CharacterContext from './CharacterContext';

export default function Character() {
  const [name, setName] = useState(baseCharacter.name);
  const [characterClass, setCharacterClass] = useState(baseCharacter.class);
  const [level, setLevel] = useState(baseCharacter.stats.level);
  const [statSum, setStatSum] = useState(80);
  const [runesHeld, setRunesHeld] = useState(baseCharacter.stats.runesHeld);
  const [runesNeeded, setRunesNeeded] = useState(
    baseCharacter.stats.runesNeededForOneLevel
  );
  const [attributes, setAttributes] = useState(baseCharacter.stats.attributes);

  const renderCharacter = () => {
    const attributeList = renderAttributes();
    return (
      <div>
        <div>Character Name: {capitalize(name)}</div>
        <div>Class: {capitalize(characterClass)}</div>
        <div>Level: {level}</div>
        <div>Runes Held: {runesHeld}</div>
        <div>Runes Needed: {runesNeeded}</div>
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

  return (
    <div>
      <CharacterContext.Provider value={[statSum, setStatSum, level, setLevel]}>
        <div>{renderCharacter()}</div>
      </CharacterContext.Provider>
    </div>
  );
}
