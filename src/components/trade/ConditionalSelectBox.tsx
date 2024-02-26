import fetchSelectedItem from '@/api/fetchSelectedItem';
import CustomAlert from '@/components/common/CustomAlert';
import SelectBox from '@/components/common/SelectBox';
import { Button } from '@/components/ui/button';
import categories from '@/constants/ItemCategoryTypes';
import SelectedValues from '@/types/selectedValues.type';
import { MutantArmorParameter } from '@/types/itemFetchParameter.type';
import { FetchedWeaponItem, FetchedMutantArmorItem } from '@/types/fetchedItem.type';

export default function ConditionalSelectBox({
  selectedValues,
  getSelectedValuesObject,
  setFetchedItems,
}: {
  selectedValues: SelectedValues;
  getSelectedValuesObject: (name: string) => (value: string) => void;
  setFetchedItems: (items: FetchedWeaponItem[] | FetchedMutantArmorItem[]) => void;
}) {
  const isValidParameter = (parameter: Partial<SelectedValues>) => {
    if (Object.keys(parameter).length === 0) {
      return false;
    }

    for (const key in parameter) {
      const keyOfParameter = parameter[key as keyof SelectedValues];
      if (keyOfParameter === null) {
        return false;
      }
    }
    return true;
  };

  const handleSelectBoxes = () => {
    if (selectedValues.firstSelected === '') {
      CustomAlert('1차 분류를 선택해주세요.', 'warning');
      return;
    }

    switch (selectedValues.firstSelected) {
      case 'weapon': {
        const parameter = {
          distanceSelected: selectedValues.distanceSelected || null,
          legalSelected: selectedValues.legalSelected || null,
          clSelected: selectedValues.clSelected || null,
          gradeSelected: selectedValues.gradeSelected || null,
          weaponSelected: selectedValues.shortWeaponSelected || selectedValues.longWeaponSelected || null,
        };

        if (!isValidParameter(parameter)) {
          CustomAlert('모든 선택을 완료해주세요', 'warning');
          return;
        }

        fetchSelectedItem(selectedValues.firstSelected, parameter).then(res => {
          if (res?.data) setFetchedItems(res.data);
        });

        break;
      }
      case 'armor': {
        let parameter: MutantArmorParameter;

        if (selectedValues.raceSelected === null) {
          CustomAlert('모든 선택을 완료해주세요', 'warning');
          return;
        }

        if (selectedValues.raceSelected === 'human') {
          console.log('go to post step');
        } else if (selectedValues.raceSelected === 'mutant') {
          parameter = {
            genderSelected: selectedValues.genderSelected || null,
            clSelected: selectedValues.clSelected || null,
            gradeSelected: selectedValues.gradeSelected || null,
          };

          if (!isValidParameter(parameter)) {
            CustomAlert('모든 선택을 완료해주세요', 'warning');
            return;
          }

          fetchSelectedItem(selectedValues.firstSelected, parameter).then(res => {
            if (res?.data) setFetchedItems(res.data);
          });
        }

        break;
      }
      case 'accessory': {
        console.log('악세에 관하여');
        break;
      }
      case 'costume': {
        console.log('코스튬에 관하여');
        break;
      }
      case 'wing': {
        console.log('날개에 관하여');
        break;
      }
      case 'etc': {
        console.log('기타템에 관하여');
        break;
      }
    }
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
          placeholder='휴먼 / 변이 선택'
          items={categories.armorCategory}
          onChange={getSelectedValuesObject('raceSelected')}
        />
      )}
      {selectedValues.firstSelected === 'armor' && selectedValues.raceSelected === 'mutant' && (
        <SelectBox
          placeholder='성별 선택'
          items={categories.genderCategory}
          onChange={getSelectedValuesObject('genderSelected')}
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
      {(selectedValues.firstSelected === 'weapon' ||
        (selectedValues.firstSelected === 'armor' && selectedValues.raceSelected === 'mutant')) && (
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
