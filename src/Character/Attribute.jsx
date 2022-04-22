import React, { useState, useContext } from 'react';
import { capitalize } from '../utils/utils';
import CharacterContext from './CharacterContext';

export default function Attribute({ attribute, value }) {
  const [editAttribute, setEditAttribute] = useState(false);
  const [val, setVal] = useState(value);
  const [nextVal, setNextVal] = useState(val);
  const [level, setLevel] = useContext(CharacterContext);

  const renderAttribute = () => {
    return (
      <div onClick={toggleEditAttribute}>
        {capitalize(attribute)}: {val}
      </div>
    );
  };

  const renderAttributeForm = () => {
    return (
      <form onSubmit={updateAttribute}>
        <span>{capitalize(attribute)}</span>
        <input
          type='number'
          min={value}
          max={99}
          value={nextVal}
          onChange={setAttribute}
        />
        <input type='submit' />
      </form>
    );
  };

  const updateAttribute = (e) => {
    e.preventDefault();
    const diff = nextVal - val;
    const nextLevel = level + diff;
    console.log(nextLevel);
    setVal(nextVal);
    setLevel(nextLevel);

    toggleEditAttribute();
  };

  const setAttribute = (e) => {
    e.preventDefault();
    const newAttributeValue = e.target.value;
    setNextVal(Number(newAttributeValue));
  };

  const toggleEditAttribute = () => {
    setEditAttribute(!editAttribute);
  };

  return <div>{editAttribute ? renderAttributeForm() : renderAttribute()}</div>;
}
