import React, { useState } from 'react';
import { capitalize } from '../utils/utils';

export default function Attribute({ attribute, value }) {
  const [editAttribute, setEditAttribute] = useState(false);
  const [val, setVal] = useState(value);

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
        <input type='number' min={val} value={val} onChange={setAttribute} />
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
  };

  const toggleEditAttribute = () => {
    setEditAttribute(!editAttribute);
  };

  return <div>{editAttribute ? renderAttributeForm() : renderAttribute()}</div>;
}
