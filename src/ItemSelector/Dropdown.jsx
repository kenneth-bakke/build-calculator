import React, { useState } from 'react';
import SearchBar from './SearchBar';
import items from '../static/itemCategories.json';
import {
  capitalize,
  getChestArmor,
  getGauntlets,
  getHelms,
  getIncantations,
  getLegArmor,
  getShields,
  getSorceries,
  getTalismans,
  getWeapons,
} from '../utils/utils';
import sha256 from 'crypto-js/sha256';

export default function Dropdown() {
  const [open, setOpen] = useState(false);

  const toggleDropdown = (e) => {
    setOpen(!open);
  };

  const getCategoryList = async (e) => {
    const category = e.target.innerText;

    switch (category) {
      case 'Helms':
        await getHelms();
      case 'Chest Armor':
        await getChestArmor();
      case 'Gauntlets':
        await getGauntlets();
      case 'LegArmor':
        await getLegArmor();
      case 'Weapons':
        await getWeapons();
      case 'Shields':
        await getShields();
      case 'Talismans':
        await getTalismans();
      case 'Incantations':
        await getIncantations();
      case 'Sorceries':
        await getSorceries();
      default:
        await getWeapons();
    }
  };

  const renderCategories = () => {
    const categoryList = items.itemCategories.map((category) => (
      <div onClick={getCategoryList} key={sha256(category)}>
        <h3>{category}</h3>
      </div>
    ));

    return categoryList;
  };

  return (
    <div onSelect={toggleDropdown}>
      <SearchBar />
      <div>{open ? renderCategories() : null}</div>
    </div>
  );
}
