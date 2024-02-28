import { useState } from 'react';
import SelectedValues from '@/types/trade/selectedValues.type';

export const useSelectedValues = () => {
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    firstSelected: '',
    distanceSelected: null,
    legalSelected: null,
    shortWeaponSelected: null,
    longWeaponSelected: null,
    raceSelected: null,
    genderSelected: null,
    clSelected: null,
    gradeSelected: null,
  });

  const handleSelectedValues = (key: keyof SelectedValues) => (value: string) => {
    if (key === 'firstSelected') {
      setSelectedValues({
        firstSelected: value,
        distanceSelected: null,
        legalSelected: null,
        clSelected: null,
        shortWeaponSelected: null,
        longWeaponSelected: null,
        gradeSelected: null,
        raceSelected: null,
        genderSelected: null,
        wingSelected: null,
      });
    } else {
      setSelectedValues(prev => ({ ...prev, [key]: value }));
    }
  };

  return { selectedValues, setSelectedValues, handleSelectedValues };
};
