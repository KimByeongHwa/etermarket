import { useState, ChangeEvent } from 'react';

export const usePriceInput = (initialValue = '') => {
  const [rawPrice, setRwaPrice] = useState('');
  const [price, setPrice] = useState(initialValue);

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const onlyNums = value.replace(/[^0-9]/g, '');
    const withComma = onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setRwaPrice(onlyNums);
    setPrice(withComma);
  };

  return { rawPrice, price, onPriceChange };
};
