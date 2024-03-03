import { FormEvent, useEffect } from 'react';
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
import { TradePostCreatingData } from '@/types/trade/tradePostData.type';
import upgradeTypes from '@/constants/ItemUpgradeTypes';
import CustomAlert from '../common/CustomAlert';
import createTradePost from '@/api/createTradePost';

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
  const { tradePostCreatingData, handleTradePostCreatingData } = useCreateTradePost();

  const isValidPostData = (data: TradePostCreatingData) => {
    if (selectedValues.firstSelected === 'weapon' || selectedValues.raceSelected === 'mutant') {
      if (
        data.tradeItem === null ||
        data.tradeItem?.upgrade.enhancement === null ||
        data.tradeItem?.upgrade.tuning === null
      ) {
        return false;
      }

      for (const value of Object.values(data)) {
        if (value === null || value.length === 0) {
          return false;
        }
      }

      return true;
    }

    // 아이템, 변이옷 이외
    for (const [key, value] of Object.entries(data)) {
      if (key !== 'tradeItem' && (value === null || value.length === 0)) {
        return false;
      }
    }

    return true;
  };

  const handlePostButton = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidPostData(tradePostCreatingData)) {
      CustomAlert('모든 항목을 입력해주세요.', 'warning');
      return;
    }

    try {
      await createTradePost(tradePostCreatingData);

      const result = await CustomAlert('성공적으로 등록되었습니다.', 'success');
      if (result.isConfirmed) {
        window.location.href = '/etermarket/search-item';
      }
    } catch {
      CustomAlert('등록에 실패했습니다.', 'error');
    }
  };

  useEffect(() => {
    handleTradePostCreatingData('price', rawPrice);
  }, [rawPrice, handleTradePostCreatingData]);

  useEffect(() => {
    handleTradePostCreatingData('phoneNumber', rawPhoneNumber);
  }, [rawPhoneNumber, handleTradePostCreatingData]);

  useEffect(() => {
    handleTradePostCreatingData('postType', 'sell');
  }, [handleTradePostCreatingData]);

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
                      handleTradePostCreatingData('tradeItem', {
                        item: selectedItem,
                        upgrade: {
                          tuning: value,
                          enhancement: tradePostCreatingData.tradeItem?.upgrade?.enhancement ?? null,
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
                      handleTradePostCreatingData('tradeItem', {
                        item: selectedItem,
                        upgrade: {
                          tuning: tradePostCreatingData.tradeItem?.upgrade?.tuning ?? null,
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
        onChange={e => handleTradePostCreatingData('title', e.target.value)}
      />

      <Textarea
        name='content'
        placeholder='내용을 입력해주세요.'
        onChange={e => handleTradePostCreatingData('content', e.target.value)}
        className='h-36'
      />

      <div className='w-full grid grid-cols-4 items-center'>
        <span className='mr-4 col-span-1'>가격</span>
        <Input
          type='text'
          name='price'
          placeholder='단위 (원)'
          value={price}
          onChange={e => {
            onPriceChange(e);
            handleTradePostCreatingData('price', rawPrice);
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
          onChange={e => handleTradePostCreatingData('characterNickname', e.target.value)}
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
            handleTradePostCreatingData('phoneNumber', rawPhoneNumber);
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
