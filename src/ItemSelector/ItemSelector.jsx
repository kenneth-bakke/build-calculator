import React, { useEffect, useState } from 'react';
import { queryGraphQL } from '../utils/graphqlClient';
import Dropdown from './Dropdown';

const COMPLETE_ITEM_QUERY = `{
  armor(limit: 10000){
    id,
    name,
    image,
    description,
    category,
    weight,
    resistance{
      name,
      amount
    }
  },
  weapon(limit: 10000){
    id,
    name,
    image,
    description,
    category,
    weight,
    attack{
      name,
      amount
    },
    defence{
      name,
      amount
    },
    requiredAttributes{
      name,
      amount
    },
    scalesWith {
      name,
      scaling
    }
  },
  shield(limit: 10000){
    id,
    name,
    image,
    description,
    category,
    weight,
    attack{
      name,
      amount
    },
    defence{
      name,
      amount
    },
    requiredAttributes{
      name,
      amount
    },
    scalesWith{
      name,
      scaling
    }
  },
  incantation(limit: 10000){
    id,
    name,
    image,
    description,
    type,
    cost,
    slots,
    effects,
    requires{
      name,
      amount,
    }
  },
  sorcery(limit: 10000){
    id,
    name,
    image,
    description,
    type,
    cost,
    slots,
    effects,
    requires{
      name,
      amount
    }
  },
  talisman(limit: 10000){
    id,
    name,
    image,
    description,
    effect
  },
}`;

export default function ItemSelector() {
  const [allItems, setAllItems] = useState();

  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    const query = COMPLETE_ITEM_QUERY;

    const itemList = await queryGraphQL(query);
    setAllItems(itemList);
  };

  return (
    <div>
      <Dropdown />
    </div>
  );
}
