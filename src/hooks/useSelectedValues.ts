import { useState } from 'react';
import SelectedValues from '@/types/selectedValues.type';

export const useSelectedValues = () => {
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    firstSelected: '',
    distanceSelected: null,
    legalSelected: null,
    shortWeaponSelected: null,
    longWeaponSelected: null,
    armorSelected: null,
    genderSelected: null,
    clSelected: null,
    gradeSelected: null,
  });

  const getSelectedValuesObject = (name: string) => (value: string) => {
    if (name === 'firstSelected') {
      setSelectedValues({
        firstSelected: value,
        distanceSelected: null,
        legalSelected: null,
        clSelected: null,
        shortWeaponSelected: null,
        longWeaponSelected: null,
        gradeSelected: null,
        armorSelected: null,
        genderSelected: null,
        wingSelected: null,
      });
    } else {
      setSelectedValues(prev => ({ ...prev, [name]: value }));
    }
  };

  return { selectedValues, setSelectedValues, getSelectedValuesObject };
};
