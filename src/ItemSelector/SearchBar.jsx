import React, { useState, useEffect } from 'react';
import { queryGraphQL } from '../utils/utils';

export default function SearchBar({ showCategories, setShowCategories }) {
  const [queryTerm, setQueryTerm] = useState('');

  useEffect(() => {
    const clearId = setTimeout(() => {
      // TODO: Add query call
    }, 400);

    return () => clearTimeout(clearId);
  }, [queryTerm]);

  const handleInput = (e) => {
    setQueryTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input type='text' onChange={handleInput} autoFocus />
      </form>
    </div>
  );
}
