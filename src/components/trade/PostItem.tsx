import { FormEvent } from 'react';
import { usePriceInput } from '@/hooks/usePriceInput';
import { usePhoneNumberInput } from '@/hooks/usePhoneNumberInput';
import { useCreateTradePost } from '@/hooks/useCreateTradePost';
import CategoryHandler from '@/components/trade/CategoryHandler';
import SelectBox from '@/components/common/SelectBox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SelectedValues from '@/types/trade/selectedValues.type';
import { FetchedMutantArmorItem, FetchedWeaponItem } from '@/types/trade/fetchedItem.type';
import upgradeTypes from '@/constants/ItemUpgradeTypes';

export default function PostItem({
  selectedValues,
  selectedItem,
  clearSelectedOptions,
}: {
  selectedValues: SelectedValues;
  selectedItem?: FetchedWeaponItem | FetchedMutantArmorItem | null;
  clearSelectedOptions: () => void;
}) {
  const { rawPrice, price, onPriceChange } = usePriceInput();
  const { rawPhoneNumber, phoneNumber, onPhoneNumberChange } = usePhoneNumberInput();
  const { createTradePostData, handleCreateTradePostData } = useCreateTradePost();

  const handlePostButton = (e: FormEvent) => {
    e.preventDefault();
    console.log(createTradePostData);
  };

  return (
    <form className='flex flex-col gap-6 mx-auto max-w-7xl md:w-3/5 lg:w-1/2'>
      <CategoryHandler selectedValues={selectedValues} selectedItemName={selectedItem?.item_name} />

      {selectedItem && (
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-4 md:gap-10'>
            <div className='w-fit border rounded-lg p-4'>
              <img src={selectedItem.img_url} />
            </div>
            <div className='w-full grid gap-2'>
              <div className='grid grid-cols-6 items-center'>
                <span className='col-span-1'>개조</span>
                <div className='col-span-5'>
                  <SelectBox
                    placeholder='개조 상태를 선택해주세요.'
                    items={upgradeTypes.tuningType}
                    onChange={value =>
                      handleCreateTradePostData('forSaleItem', {
                        item: selectedItem,
                        upgrade: {
                          tuning: value,
                          enhancement: createTradePostData.forSaleItem?.upgrade?.enhancement ?? null,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className='grid grid-cols-6 items-center'>
                <span className='col-span-1'>강화</span>
                <div className='col-span-5'>
                  <SelectBox
                    placeholder='강화 수치를 선택해주세요.'
                    items={
                      selectedValues.firstSelected === 'weapon'
                        ? upgradeTypes.weaponEnhancementType
                        : upgradeTypes.mutantArmorEnhancementType
                    }
                    onChange={value =>
                      handleCreateTradePostData('forSaleItem', {
                        item: selectedItem,
                        upgrade: {
                          tuning: createTradePostData.forSaleItem?.upgrade?.tuning ?? null,
                          enhancement: value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Input
        type='text'
        name='title'
        placeholder='제목을 입력해주세요.'
        onChange={e => handleCreateTradePostData('title', e.target.value)}
      />

      <Textarea
        name='content'
        placeholder='내용을 입력해주세요.'
        onChange={e => handleCreateTradePostData('content', e.target.value)}
        className='h-36'
      />

      <div className='w-full grid grid-cols-4 items-center'>
        <span className='mr-4 col-span-1'>가격</span>
        <Input
          type='text'
          name='price'
          placeholder='숫자를 입력해주세요.'
          value={price}
          onChange={e => {
            onPriceChange(e);
            handleCreateTradePostData('price', rawPrice);
          }}
          className='col-span-3'
        />
      </div>

      <div className='w-full grid grid-cols-4 items-center'>
        <span className='mr-4 col-span-1'>캐릭터명</span>
        <Input
          type='text'
          name='characterNickname'
          placeholder='거래할 캐릭터명을 입력해주세요.'
          onChange={e => handleCreateTradePostData('character_nickname', e.target.value)}
          className='col-span-3'
        />
      </div>

      <div className='w-full grid grid-cols-4 items-center'>
        <span className='mr-4 col-span-1'>연락처</span>
        <Input
          type='text'
          name='phoneNumber'
          placeholder='숫자를 입력해주세요.'
          value={phoneNumber}
          onChange={e => {
            onPhoneNumberChange(e);
            handleCreateTradePostData('phone_number', rawPhoneNumber);
          }}
          className='col-span-3'
        />
      </div>

      <Button onClick={handlePostButton} className='mt-4'>
        판매 등록
      </Button>
      <Button variant='outline' onClick={clearSelectedOptions}>
        취소
      </Button>
    </form>
  );
}
