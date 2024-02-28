import { useState, ChangeEvent } from 'react';

export const usePhoneNumberInput = (initialValue = '') => {
  const [phoneNumber, setPhoneNumber] = useState(initialValue);
  const [rawPhoneNumber, setRawPhoneNumber] = useState('');

  const onPhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const onlyNums = value.replace(/[^0-9]/g, '');
    setRawPhoneNumber(onlyNums);

    if (onlyNums.length <= 11) {
      setRawPhoneNumber(onlyNums);
      setPhoneNumber(onlyNums.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3').replace(/-{1,2}$/g, ''));
    }
  };

  return { rawPhoneNumber, phoneNumber, onPhoneNumberChange };
};
