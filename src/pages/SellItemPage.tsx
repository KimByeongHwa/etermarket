import { useEffect } from 'react';
import SelectBox from '@/components/common/SelectBox';
import categories from '@/constants/ItemCategoryTypes';
import { useSelectedValues } from '@/hooks/useSelectedValues';
import getSelectedItem from '@/api/getSelectedItem';

export default function SellItemPage() {
  const { selectedValues, getSelectedValue } = useSelectedValues();

  useEffect(() => {
    getSelectedItem(selectedValues);
  }, [selectedValues]);

  return (
    <div className='mx-auto my-16 max-w-7xl px-6 lg:px-8'>
      <div className='mb-14 text-center text-xl font-semibold leading-8 text-gray-900'>
        어떤 아이템을 판매하시겠어요?
      </div>
      <div className='grid gap-4 mx-auto w-full sm:w-2/5 lg:w-1/4'>
        <SelectBox
          placeholder='1차 분류'
          items={categories.firstCategory}
          onChange={getSelectedValue('firstSelected')}
        />
        {selectedValues.firstSelected === 'armor' && (
          <SelectBox
            placeholder='성별 선택'
            items={categories.genderCategory}
            onChange={getSelectedValue('genderCategory')}
          />
        )}
        {selectedValues.firstSelected === 'armor' && (
          <SelectBox
            placeholder='휴먼 / 변이 선택'
            items={categories.armorCategory}
            onChange={getSelectedValue('armorSelected')}
          />
        )}
        {selectedValues.firstSelected === 'weapon' && (
          <SelectBox
            placeholder='근거리 / 원거리 선택'
            items={categories.weaponDistanceCategory}
            onChange={getSelectedValue('distanceSelected')}
          />
        )}
        {selectedValues.firstSelected === 'weapon' && (
          <SelectBox
            placeholder='합법 / 불법 선택'
            items={categories.legalCategory}
            onChange={getSelectedValue('legalSelected')}
          />
        )}
        {(selectedValues.firstSelected === 'weapon' ||
          (selectedValues.firstSelected === 'armor' && selectedValues.armorSelected === 'mutant') ||
          selectedValues.firstSelected === 'accessory' ||
          selectedValues.firstSelected === 'costume') && (
          <SelectBox
            placeholder='CL / NonCL 선택'
            items={categories.clCategory}
            onChange={getSelectedValue('clSelected')}
          />
        )}
        {(selectedValues.firstSelected === 'weapon' ||
          (selectedValues.firstSelected === 'accessory' && selectedValues.clSelected === 'non_cl')) && (
          <SelectBox
            placeholder='등급 선택'
            items={categories.gradeCategory}
            onChange={getSelectedValue('gradeSelected')}
          />
        )}
        {selectedValues.distanceSelected === 'short' && (
          <SelectBox
            placeholder='근거리 분류'
            items={categories.shortWeponCategory}
            onChange={getSelectedValue('shortWeaponSelected')}
          />
        )}
        {selectedValues.distanceSelected === 'long' && (
          <SelectBox
            placeholder='원거리 분류'
            items={categories.longWeaponCategory}
            onChange={getSelectedValue('longWeaponSelected')}
          />
        )}
        {selectedValues.firstSelected === 'wing' && (
          <SelectBox
            placeholder='날개 옵션 선택'
            items={categories.wingCategory}
            onChange={getSelectedValue('wingSelected')}
          />
        )}
      </div>
    </div>
  );
}
