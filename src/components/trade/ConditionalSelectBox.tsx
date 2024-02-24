import SelectBox from '@/components/common/SelectBox';
import categories from '@/constants/ItemCategoryTypes';
import SelectedValues from '@/types/selectedValues.type';
import { Button } from '../ui/button';

export default function ConditionalSelectBox({
  selectedValues,
  getSelectedValuesObject,
}: {
  selectedValues: SelectedValues;
  getSelectedValuesObject: (name: string) => (value: string) => void;
}) {
  const handleSelectBoxes = () => {
    // 1차 선택에 따른 유효성 검사를 여기서 수행
    // getSelectedItem에선 data fetch 기능만 수행
  };
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
          onChange={getSelectedValuesObject('raceSelected')}
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
        (selectedValues.firstSelected === 'armor' && selectedValues.raceSelected === 'mutant')) && (
        <SelectBox
          placeholder='CL / NonCL 선택'
          items={categories.clCategory}
          onChange={getSelectedValuesObject('clSelected')}
        />
      )}
      {selectedValues.firstSelected === 'weapon' && (
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

      <Button onClick={handleSelectBoxes} className='mt-6'>
        확인
      </Button>
    </>
  );
}
