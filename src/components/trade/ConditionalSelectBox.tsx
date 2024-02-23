import SelectBox from '@/components/common/SelectBox';
import categories from '@/constants/ItemCategoryTypes';
import SelectedValues from '@/types/selectedValues.type';

export default function ConditionalSelectBox({
  selectedValues,
  getSelectedValuesObject,
}: {
  selectedValues: SelectedValues;
  getSelectedValuesObject: (name: string) => (value: string) => void;
}) {
  return (
    <>
      <SelectBox
        placeholder='1차 분류'
        items={categories.firstCategory}
        onChange={getSelectedValuesObject('firstSelected')}
      />
      {selectedValues.firstSelected === 'armor' && (
        <SelectBox
          placeholder='성별 선택'
          items={categories.genderCategory}
          onChange={getSelectedValuesObject('genderCategory')}
        />
      )}
      {selectedValues.firstSelected === 'armor' && (
        <SelectBox
          placeholder='휴먼 / 변이 선택'
          items={categories.armorCategory}
          onChange={getSelectedValuesObject('armorSelected')}
        />
      )}
      {selectedValues.firstSelected === 'weapon' && (
        <SelectBox
          placeholder='근거리 / 원거리 선택'
          items={categories.weaponDistanceCategory}
          onChange={getSelectedValuesObject('distanceSelected')}
        />
      )}
      {selectedValues.firstSelected === 'weapon' && (
        <SelectBox
          placeholder='합법 / 불법 선택'
          items={categories.legalCategory}
          onChange={getSelectedValuesObject('legalSelected')}
        />
      )}
      {(selectedValues.firstSelected === 'weapon' ||
        (selectedValues.firstSelected === 'armor' && selectedValues.armorSelected === 'mutant') ||
        selectedValues.firstSelected === 'accessory' ||
        selectedValues.firstSelected === 'costume') && (
        <SelectBox
          placeholder='CL / NonCL 선택'
          items={categories.clCategory}
          onChange={getSelectedValuesObject('clSelected')}
        />
      )}
      {(selectedValues.firstSelected === 'weapon' ||
        (selectedValues.firstSelected === 'accessory' && selectedValues.clSelected === 'noncl')) && (
        <SelectBox
          placeholder='등급 선택'
          items={categories.gradeCategory}
          onChange={getSelectedValuesObject('gradeSelected')}
        />
      )}
      {selectedValues.distanceSelected === 'short' && (
        <SelectBox
          placeholder='근거리 분류'
          items={categories.shortWeponCategory}
          onChange={getSelectedValuesObject('shortWeaponSelected')}
        />
      )}
      {selectedValues.distanceSelected === 'long' && (
        <SelectBox
          placeholder='원거리 분류'
          items={categories.longWeaponCategory}
          onChange={getSelectedValuesObject('longWeaponSelected')}
        />
      )}
      {selectedValues.firstSelected === 'wing' && (
        <SelectBox
          placeholder='날개 옵션 선택'
          items={categories.wingCategory}
          onChange={getSelectedValuesObject('wingSelected')}
        />
      )}
    </>
  );
}
