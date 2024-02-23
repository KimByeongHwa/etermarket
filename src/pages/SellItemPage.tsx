import { useState } from 'react';
import { useSelectedValues } from '@/hooks/useSelectedValues';
import getSelectedItem from '@/api/getSelectedItem';
import ConditionalSelectBox from '@/components/trade/ConditionalSelectBox';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';
import ItemBox from '@/components/trade/ItemBox';
import Item from '@/types/item.type';
import defaultImage from '@/../public/no-image.jpg';

export default function SellItemPage() {
  const [isSelectCondition, setIsSelectCondition] = useState(false);
  const [searchedItems, setSearchedItems] = useState<Item[]>([]);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);

  const { selectedValues, setSelectedValues, getSelectedValuesObject } = useSelectedValues();

  const handleSelectedItem = () => {
    getSelectedItem(selectedValues).then(res => {
      if (res === undefined || res.error) {
        Swal.fire({
          html: '모든 선택을 완료해주세요.',
          icon: 'error',
          confirmButtonColor: '#172554',
          confirmButtonText: '확인',
        });
      } else if (res.data !== null) {
        setIsSelectCondition(true);
        setSearchedItems(res.data);
      }
    });
  };

  const clearSelectedOptions = () => {
    setIsSelectCondition(false);
    setSelectedValues({
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
  };

  return (
    <div className='mx-auto my-16 max-w-7xl px-6 lg:px-8'>
      {/* 1단계 */}
      {!isSelectCondition && (
        <>
          <div className='mb-14 text-center text-xl font-semibold leading-8 text-gray-900'>
            어떤 아이템을 판매하시겠어요?
          </div>
          <div className='grid gap-4 mx-auto w-full sm:w-2/5 lg:w-1/4'>
            <ConditionalSelectBox selectedValues={selectedValues} getSelectedValuesObject={getSelectedValuesObject} />
            <Button onClick={handleSelectedItem} className='mt-6'>
              확인
            </Button>
          </div>
        </>
      )}

      {/* 2단계 */}
      {isSelectCondition && (
        <>
          <div className='mb-14 text-center text-xl font-semibold leading-8 text-gray-900'>아이템을 선택해주세요.</div>
          <div className='space-y-10'>
            {searchedItems.length > 0 ? (
              searchedItems.map(item => {
                return (
                  <ItemBox
                    itemName={item.item_name}
                    imgSrc={item.img_url || defaultImage}
                    onClick={() => {
                      setSelectedItemName(item.item_name);
                    }}
                    isSelected={selectedItemName === item.item_name}
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
            {searchedItems.length > 0 && <Button>확인</Button>}
          </div>
        </>
      )}
    </div>
  );
}
