import { FormEvent, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { usePriceInput } from '@/hooks/usePriceInput';
import { usePhoneNumberInput } from '@/hooks/usePhoneNumberInput';
import { useCreateTradePost } from '@/hooks/useCreateTradePost';
import createTradePost from '@/api/createTradePost';
import fetchMyTradePosts from '@/api/fetchMyTradePosts';
import CategoryHandler from '@/components/trade/CategoryHandler';
import SelectBox from '@/components/common/SelectBox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CustomAlert from '@/components/common/CustomAlert';
import SelectedValues from '@/types/trade/selectedValues.type';
import { FetchedMutantArmorItem, FetchedWeaponItem } from '@/types/trade/fetchedItem.type';
import { TradePostCreatingData } from '@/types/trade/tradePostData.type';
import upgradeTypes from '@/constants/itemUpgradeTypes';

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

  const location = useLocation();

  const tradeType = location.pathname.includes('sell-item') ? 'sell' : 'buy';

  const writer = useMemo(() => {
    const userData = localStorage.getItem('userData');
    const parsedUserData = userData ? JSON.parse(userData) : null;

    return {
      id: parsedUserData.id,
      kakao_email: parsedUserData.kakao_email,
      user_id: parsedUserData.user_id,
      nickname: parsedUserData.nickname,
    };
  }, []);

  const isValidPostData = (data: TradePostCreatingData) => {
    if (selectedValues.firstSelected === 'weapon' || selectedValues.raceSelected === 'mutant') {
      if (!data.trade_item || !data.trade_item.upgrade.enhancement || !data.trade_item.upgrade.tuning) {
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
      if (key !== 'trade_item' && (value === null || value.length === 0)) {
        return false;
      }
    }

    return true;
  };

  const checkTradePostsCount = async () => {
    const userData = localStorage.getItem('userData');
    const { id } = userData ? JSON.parse(userData) : null;

    const myTradePosts = await fetchMyTradePosts(id);

    if (myTradePosts.data.length >= 10) {
      return false;
    }

    return true;
  };

  const handlePostButton = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValidPostData(tradePostCreatingData)) {
      return CustomAlert('모든 항목을 입력해주세요.', 'warning');
    }

    if (!(await checkTradePostsCount())) {
      return CustomAlert(
        '거래 글은 10개까지 작성 가능합니다. <br /> 기존 거래 글을 삭제 후 다시 작성해주세요.',
        'warning',
      );
    }

    try {
      const postRequest = await createTradePost(tradePostCreatingData);

      if (postRequest?.error) {
        return CustomAlert('등록에 실패했습니다.', 'error');
      }

      const result = await CustomAlert('성공적으로 등록되었습니다.', 'success');
      if (result.isConfirmed || result.isDismissed) {
        window.location.href = '/etermarket/search-item';
      }
    } catch {
      return CustomAlert('등록에 실패했습니다.', 'error');
    }
  };

  useEffect(() => {
    handleTradePostCreatingData('trade_type', tradeType);
    handleTradePostCreatingData('item_category', selectedValues.firstSelected);
    handleTradePostCreatingData('price', rawPrice);
    handleTradePostCreatingData('phone_number', rawPhoneNumber);
    handleTradePostCreatingData('writer', writer);
  }, [
    location,
    tradeType,
    selectedValues.firstSelected,
    rawPrice,
    rawPhoneNumber,
    writer,
    handleTradePostCreatingData,
  ]);

  return (
    <form className='flex flex-col gap-6 mx-auto max-w-7xl md:w-3/5 lg:w-1/2'>
      <CategoryHandler selectedValues={selectedValues} selectedItemName={selectedItem?.item_name} />

      {selectedItem && (
        <div className='flex items-center gap-4 md:gap-10'>
          <div className='w-fit border rounded-lg p-4'>
            <img src={selectedItem.img_url} alt='item_img' />
          </div>
          <div className='w-full grid gap-2'>
            <div className='grid grid-cols-6 items-center'>
              <span className='col-span-1'>개조</span>
              <div className='col-span-5'>
                <SelectBox
                  placeholder='개조 상태를 선택해주세요.'
                  items={upgradeTypes.tuningType}
                  onChange={value =>
                    handleTradePostCreatingData('trade_item', {
                      item: selectedItem,
                      upgrade: {
                        tuning: value,
                        enhancement: tradePostCreatingData.trade_item?.upgrade?.enhancement ?? null,
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
                    handleTradePostCreatingData('trade_item', {
                      item: selectedItem,
                      upgrade: {
                        tuning: tradePostCreatingData.trade_item?.upgrade?.tuning ?? null,
                        enhancement: value,
                      },
                    })
                  }
                />
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
          onChange={e => handleTradePostCreatingData('character_nickname', e.target.value)}
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
            handleTradePostCreatingData('phone_number', rawPhoneNumber);
          }}
          className='col-span-3'
        />
      </div>

      <Button onClick={handlePostButton} className='mt-4'>
        {tradeType === 'sell' ? '판매 등록' : '구매 등록'}
      </Button>
      <Button variant='outline' onClick={clearSelectedOptions}>
        취소
      </Button>
    </form>
  );
}
