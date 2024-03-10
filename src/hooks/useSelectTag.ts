import { useState } from 'react';

export const useSelectTag = () => {
  const [selectedTradeTypeTag, setSelectedTradeTypeTag] = useState('all');
  const [selectedItemCategoryTag, setSelectedItemCategoryTag] = useState('all');

  const handleTradeTypeTag = (value: string) => {
    setSelectedTradeTypeTag(value);
  };

  const handleItemCategoryTag = (value: string) => {
    setSelectedItemCategoryTag(value);
  };

  return { selectedTradeTypeTag, handleTradeTypeTag, selectedItemCategoryTag, handleItemCategoryTag };
};
