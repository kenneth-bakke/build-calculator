import React, { useEffect, useState } from 'react';
import items from '../static/itemCategories.json';
import { capitalize, getListByCategory } from '../utils/utils';
import sha256 from 'crypto-js/sha256';
import { queryGraphQL } from '../utils/graphqlClient';

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const [displayCategories, setDisplayCategories] = useState(
    items.itemCategories
  );
  const [itemList, setItemList] = useState([]);
  const [searchCategory, setSearchCategory] = useState('weapon');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const clearId = setTimeout(() => {
      renderCategories();
    }, 250);

    return () => clearTimeout(clearId);
  }, [displayCategories]);

  const getCategoryList = async (e) => {
    const category = e.target.value;
    const categoryList = await getListByCategory(category.toLowerCase(), 10000);

    setSearchCategory(category.toLowerCase());
    setItemList(categoryList);
  };

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm);
  };

  const renderCategories = () => {
    const categoryList = displayCategories.map((category) => (
      <option key={sha256(category)}>{capitalize(category)}</option>
    ));

    return <select onChange={getCategoryList}>{categoryList}</select>;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleInput} />
      </form>
      {renderCategories()}
    </div>
  );
}
