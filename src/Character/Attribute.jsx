import React, { useState, useContext } from 'react';
import { capitalize } from '../utils/utils';
import CharacterContext from './CharacterContext';

export default function Attribute({ attribute, value }) {
  const [editAttribute, setEditAttribute] = useState(false);
  const [attributeValue, setAttributeValue] = useState(value);
  const [nextAttributeValue, setNextAttributeValue] = useState(attributeValue);
  const [level, setLevel] = useContext(CharacterContext);

  const renderAttribute = () => {
    return (
      <div onClick={toggleEditAttribute}>
        {capitalize(attribute)}: {attributeValue}
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
          value={nextAttributeValue}
          onChange={setAttribute}
        />
        <input type='submit' />
      </form>
    );
  };

  const updateAttribute = (e) => {
    e.preventDefault();
    const diff = nextAttributeValue - attributeValue;
    const nextLevel = level + diff;

    setLevel(nextLevel);
    setAttributeValue(nextAttributeValue);

    toggleEditAttribute();
  };

  const setAttribute = (e) => {
    e.preventDefault();
    const newAttributeValue = e.target.value;
    setNextAttributeValue(newAttributeValue);
  };

  const toggleEditAttribute = () => {
    setEditAttribute(!editAttribute);
  };

  return <div>{editAttribute ? renderAttributeForm() : renderAttribute()}</div>;
}
