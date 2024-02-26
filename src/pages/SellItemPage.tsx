import { useEffect, useState } from 'react';
import { useSelectedValues } from '@/hooks/useSelectedValues';
import ConditionalSelectBox from '@/components/trade/ConditionalSelectBox';
import { Button } from '@/components/ui/button';
import ItemBox from '@/components/trade/ItemBox';
import defaultImage from '@/assets/noImage.jpg';
import CustomAlert from '@/components/common/CustomAlert';
import PostItem from '@/components/trade/PostItem';
import { FetchedWeaponItem, FetchedMutantArmorItem } from '@/types/fetchedItem.type.ts';

export default function SellItemPage() {
  const [fetchedItems, setFetchedItems] = useState<FetchedWeaponItem[] | FetchedMutantArmorItem[] | null>(null);
  const [isWeaponOrMutantArmor, setIsWeponOrMutantArmor] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FetchedWeaponItem | FetchedMutantArmorItem | null>(null);
  const [isPostStep, setIsPostStep] = useState(false);

  const { selectedValues, setSelectedValues, getSelectedValuesObject } = useSelectedValues();

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
  };

  const GoToPostWeaponOrMutantArmor = (selectedItem?: FetchedWeaponItem | FetchedMutantArmorItem | null) => {
    if (!selectedItem) {
      CustomAlert('판매할 아이템을 선택해주세요.', 'warning');
      return;
    }

    console.log(selectedItem);

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
            <ConditionalSelectBox
              selectedValues={selectedValues}
              getSelectedValuesObject={getSelectedValuesObject}
              setFetchedItems={setFetchedItems}
            />
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
              <Button onClick={() => GoToPostWeaponOrMutantArmor(selectedItem)}>확인</Button>
            )}
          </div>
        </>
      )}

      {/* 아이템 등록 */}
      {isPostStep && <PostItem firstSelected={selectedValues.firstSelected} selectedItem={selectedItem} />}
    </div>
  );
}
