import React, { useState } from 'react';
import { capitalize } from '../utils/utils';

export default function Attribute({ attribute, value }) {
  const [editAttribute, setEditAttribute] = useState(false);

  const renderAttribute = () => {
    toggleEditAttribute();
    return (
      <div>
        {capitalize(attribute)}: {value}
      </div>
    );
  };

  const renderAttributeForm = () => {
    return (
      <div>
        <input type='number'></input>
        <input type='submit' onSubmit={updateAttribute} />
      </div>
    );
  };

  const updateAttribute = (e) => {};

  const toggleEditAttribute = () => {
    setEditAttribute(!editAttribute);
  };

  return <div>{editAttribute ? renderAttributeForm() : renderAttribute()}</div>;
}
