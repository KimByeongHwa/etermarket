import SelectBox from '@/components/common/SelectBox';
import categories from '@/constants/itemCategoryTypes';
import SelectedValues from '@/types/trade/selectedValues.type';

export default function ConditionalSelectBox({
  selectedValues,
  handleSelectedValues,
}: {
  selectedValues: SelectedValues;
  handleSelectedValues: (name: keyof SelectedValues) => (value: string) => void;
}) {
  return (
    <>
      <SelectBox
        placeholder='1차 분류'
        items={categories.firstCategory}
        onChange={handleSelectedValues('firstSelected')}
      />
      {selectedValues.firstSelected === 'armor' && (
        <SelectBox
          placeholder='휴먼 / 변이 선택'
          items={categories.armorCategory}
          onChange={handleSelectedValues('raceSelected')}
        />
      )}
      {selectedValues.firstSelected === 'armor' && selectedValues.raceSelected === 'mutant' && (
        <SelectBox
          placeholder='성별 선택'
          items={categories.genderCategory}
          onChange={handleSelectedValues('genderSelected')}
        />
      )}
      {selectedValues.firstSelected === 'weapon' && (
        <SelectBox
          placeholder='근거리 / 원거리 선택'
          items={categories.weaponDistanceCategory}
          onChange={handleSelectedValues('distanceSelected')}
        />
      )}
      {selectedValues.firstSelected === 'weapon' && (
        <SelectBox
          placeholder='합법 / 불법 선택'
          items={categories.legalCategory}
          onChange={handleSelectedValues('legalSelected')}
        />
      )}
      {(selectedValues.firstSelected === 'weapon' ||
        (selectedValues.firstSelected === 'armor' && selectedValues.raceSelected === 'mutant')) && (
        <SelectBox
          placeholder='CL / NonCL 선택'
          items={categories.clCategory}
          onChange={handleSelectedValues('clSelected')}
        />
      )}
      {(selectedValues.firstSelected === 'weapon' ||
        (selectedValues.firstSelected === 'armor' && selectedValues.raceSelected === 'mutant')) && (
        <SelectBox
          placeholder='등급 선택'
          items={categories.gradeCategory}
          onChange={handleSelectedValues('gradeSelected')}
        />
      )}
      {selectedValues.distanceSelected === 'short' && (
        <SelectBox
          placeholder='근거리 분류'
          items={categories.shortWeponCategory}
          onChange={handleSelectedValues('shortWeaponSelected')}
        />
      )}
      {selectedValues.distanceSelected === 'long' && (
        <SelectBox
          placeholder='원거리 분류'
          items={categories.longWeaponCategory}
          onChange={handleSelectedValues('longWeaponSelected')}
        />
      )}
    </>
  );
}
