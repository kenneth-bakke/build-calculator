import React, { useState, useEffect } from 'react';
import { queryGraphQL } from '../utils/utils';

export default function SearchBar() {
  const [queryTerm, setQueryTerm] = useState('');

  useEffect(() => {
    const clearId = setTimeout(() => {
      queryGraphQL(queryTerm);
    }, 400);

    return () => clearTimeout(clearId);
  }, []);

  const handleInput = (e) => {
    setQueryTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    alert(`SEARCHING FOR ${queryTerm}`);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input type='text' onChange={handleInput} autofocus />
      </form>
    </div>
  );
}
