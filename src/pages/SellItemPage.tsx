import { useEffect, useState } from 'react';
import { useSelectedValues } from '@/hooks/useSelectedValues';
import checkAuthentication from '@/api/checkAuthentication';
import fetchSelectedItem from '@/api/fetchSelectedItem';
import ConditionalSelectBox from '@/components/trade/ConditionalSelectBox';
import { Button } from '@/components/ui/button';
import ItemBox from '@/components/trade/ItemBox';
import CustomAlert from '@/components/common/CustomAlert';
import PostItem from '@/components/trade/PostItem';
import defaultImage from '@/assets/noImage.jpg';
import SelectedValues from '@/types/trade/selectedValues.type';
import { MutantArmorParameter } from '@/types/trade/itemFetchParameter.type';
import { FetchedWeaponItem, FetchedMutantArmorItem } from '@/types/trade/fetchedItem.type';

export default function SellItemPage() {
  const [fetchedItems, setFetchedItems] = useState<FetchedWeaponItem[] | FetchedMutantArmorItem[] | null>(null);
  const [isWeaponOrMutantArmor, setIsWeponOrMutantArmor] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FetchedWeaponItem | FetchedMutantArmorItem | null>(null);
  const [isPostStep, setIsPostStep] = useState(false);

  const { selectedValues, setSelectedValues, handleSelectedValues } = useSelectedValues();

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

  const handleSelectButton = async () => {
    const isAuthenticated = await checkAuthentication();

    if (!isAuthenticated) {
      CustomAlert('로그인 후 이용해주세요.', 'warning');
      return;
    }

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
          GoToPostStep(selectedValues);
          break;
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
      case 'accessories':
      case 'belt':
      case 'toy':
      case 'tarot':
      case 'costume':
      case 'wing':
      case 'etc': {
        GoToPostStep(selectedValues);
        break;
      }
    }
  };

  const clearSelectedOptions = () => {
    setSelectedValues({
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
    setIsWeponOrMutantArmor(false);
    setFetchedItems(null);
    setSelectedItem(null);
    setIsPostStep(false);
  };

  const GoToPostStep = (
    selectedValues: SelectedValues,
    selectedItem?: FetchedWeaponItem | FetchedMutantArmorItem | null,
  ) => {
    if (
      selectedValues.firstSelected === 'weapon' ||
      (selectedValues.firstSelected === 'armor' && selectedValues.raceSelected === 'mutant')
    ) {
      if (!selectedItem) {
        CustomAlert('판매할 아이템을 선택해주세요.', 'warning');
        return;
      }
    }

    setIsPostStep(true);
    setIsWeponOrMutantArmor(false);
    setFetchedItems(null);
  };

  useEffect(() => {
    if (fetchedItems) setIsWeponOrMutantArmor(true);
    else setIsWeponOrMutantArmor(false);
  }, [fetchedItems]);

  return (
    <div className='mx-auto my-16 max-w-7xl px-6 lg:px-8'>
      {/* 아이템 조건 선택 */}
      {!fetchedItems && !isPostStep && (
        <>
          <div className='mb-14 text-center text-xl font-semibold leading-8 text-gray-900'>
            어떤 아이템을 판매하시겠어요?
          </div>
          <div className='grid gap-4 mx-auto w-full sm:w-2/5 lg:w-1/4'>
            <ConditionalSelectBox selectedValues={selectedValues} handleSelectedValues={handleSelectedValues} />
            <Button onClick={handleSelectButton} className='mt-10'>
              확인
            </Button>
          </div>
        </>
      )}

      {/* 무기, 변이 방어구일 때 */}
      {isWeaponOrMutantArmor && !isPostStep && (
        <>
          <div className='mb-14 text-center text-xl font-semibold leading-8 text-gray-900'>아이템을 선택해주세요.</div>
          <div className='space-y-10'>
            {fetchedItems && fetchedItems.length > 0 ? (
              fetchedItems.map(item => {
                return (
                  <ItemBox
                    key={item.item_name}
                    itemName={item.item_name}
                    imgSrc={item.img_url || defaultImage}
                    onClick={() => {
                      setSelectedItem(item);
                    }}
                    isSelected={selectedItem?.item_name === item.item_name}
                  />
                );
              })
            ) : (
              <div className='text-center'>검색된 아이템이 없습니다.</div>
            )}
          </div>
          <div className='mt-14 flex gap-4 w-fit mx-auto'>
            <Button variant='outline' onClick={clearSelectedOptions}>
              뒤로 가기
            </Button>
            {fetchedItems && fetchedItems.length > 0 && (
              <Button onClick={() => GoToPostStep(selectedValues, selectedItem)}>확인</Button>
            )}
          </div>
        </>
      )}

      {/* 아이템 등록 */}
      {isPostStep && (
        <PostItem
          selectedValues={selectedValues}
          selectedItem={selectedItem}
          clearSelectedOptions={clearSelectedOptions}
        />
      )}
    </div>
  );
}
