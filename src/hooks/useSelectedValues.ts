import { useState } from 'react';
import selectedValuesType from '@/constants/selectedValuesType';

export const useSelectedValues = () => {
  const [selectedValues, setSelectedValues] = useState<selectedValuesType>({
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

  const getSelectedValue = (name: string) => (value: string) => {
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

  return { selectedValues, getSelectedValue };
};
