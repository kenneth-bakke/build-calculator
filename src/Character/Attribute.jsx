import React, { useState, useContext } from 'react';
import { capitalize } from '../utils/utils';
import CharacterContext from './CharacterContext';

export default function Attribute({ attribute, value }) {
  const [editAttribute, setEditAttribute] = useState(false);
  const [val, setVal] = useState(value);
  const [level, setLevel, statSum, setStatSum] = useContext(CharacterContext);

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
          value={val}
          onChange={setAttribute}
        />
        <input type='submit' />
      </form>
    );
  };

  const updateAttribute = (e) => {
    e.preventDefault();
    toggleEditAttribute();
  };

  const setAttribute = (e) => {
    e.preventDefault();
    const newAttributeValue = e.target.value;
    setVal(newAttributeValue);
    setLevel();
  };

  const toggleEditAttribute = () => {
    setEditAttribute(!editAttribute);
  };

  return <div>{editAttribute ? renderAttributeForm() : renderAttribute()}</div>;
}
