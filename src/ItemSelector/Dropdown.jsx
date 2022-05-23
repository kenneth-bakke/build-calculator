import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import items from '../static/itemCategories.json';
import { capitalize, getListByCategory } from '../utils/utils';
import sha256 from 'crypto-js/sha256';

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const [itemCategories, setItemCategories] = useState(items.itemCategories);
  const [displayCategories, setDisplayCategories] = useState(itemCategories);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const clearId = setTimeout(() => {
      renderCategories();
    }, 250);

    return () => clearTimeout(clearId);
  }, [displayCategories]);

  const getCategoryList = async (e) => {
    const category = e.target.value;
    const categoryList = await getListByCategory('armor', 10, 0);

    setItemList(categoryList);
  };

  const renderCategories = () => {
    const categoryList = displayCategories.map((category) => (
      <option key={sha256(category)}>{category}</option>
    ));

    return <select onChange={getCategoryList}>{categoryList}</select>;
  };

  return <div>{renderCategories()}</div>;
}
