import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import fetchTradePostDetails from '@/api/fetchTradePostDetails';
import { Button } from '@/components/ui/button';
import TradeTypeChip from '@/components/trade/TradeTypeChip';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import upgradeTypes from '@/constants/itemUpgradeTypes';
import ContactModal from '@/components/trade/ContactModal';
import { TradePostReadingData } from '@/types/trade/tradePostData.type';
import addCommaToPrice from '@/utils/addCommaToPrice';
import dateHandler from '@/utils/dateHandler';
import isEqualObject from '@/utils/isEqualObject';

export default function TradePostDetailsPage() {
  const [detailsData, setDetailsData] = useState<TradePostReadingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMine, setIsMine] = useState(false);

  const params = useParams();
  const postId = Number(params.id);

  const checkIsMine = (postWriter: { [key: string]: string }) => {
    const loggedInUserData = localStorage.getItem('userData');

    if (loggedInUserData) {
      const parsedLoggedInUser = JSON.parse(loggedInUserData);

      const loggedInUserAuthData = {
        id: parsedLoggedInUser.id,
        user_id: parsedLoggedInUser.user_id,
        kakao_email: parsedLoggedInUser.kakao_email,
        nickname: parsedLoggedInUser.nickname,
      };

      isEqualObject(loggedInUserAuthData, postWriter) && setIsMine(true);
    }
  };

  const getDetailsData = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await fetchTradePostDetails(postId);

      if (!result.error) {
        setDetailsData(result.data);
        checkIsMine(result.data.writer);
      } else {
        throw new Error();
      }
    } catch {
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  const handleTuning = (tuning: string | null) => {
    if (tuning === null) return;

    const tuningType = upgradeTypes.tuningType;

    const matchedTuning = tuningType?.find(e => e.value === tuning);

    return matchedTuning?.text;
  };

  const handleEnhancement = (enhancement: string | null, itemCategory: string | null) => {
    if (enhancement === null || itemCategory === null) return;

    let enhancementType;

    if (itemCategory === 'weapon') {
      enhancementType = upgradeTypes.weaponEnhancementType;
    }

    if (itemCategory === 'armor') {
      enhancementType = upgradeTypes.mutantArmorEnhancementType;
    }

    const matchedEnhancement = enhancementType?.find(e => e.value === enhancement);

    return matchedEnhancement?.text;
  };

  useEffect(() => {
    getDetailsData();
  }, [getDetailsData, isMine]);

  return (
    <div className='flex flex-col gap-6 mx-auto max-w-7xl my-16 px-6 md:gap-8 md:w-3/5 lg:w-1/2'>
      {isLoading ? (
        <div className='flex justify-center items-center mt-36'>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {detailsData && (
            <div className='flex justify-between items-center'>
              <div>
                <TradeTypeChip type={detailsData?.trade_type} />
              </div>
              {isMine && (
                <Button size='sm' variant='outline'>
                  삭제
                </Button>
              )}
            </div>
          )}

          <div className='flex flex-col gap-2 break-words whitespace-pre-line'>
            <div className='w-full font-semibold'>{detailsData?.title}</div>
            {detailsData && <div className='text-zinc-400'>{dateHandler(detailsData?.created_at)}</div>}
            <hr />
          </div>

          {detailsData && detailsData.trade_item && (
            <div className='flex items-center gap-6 md:gap-8'>
              <div className='w-fit border rounded-lg p-4'>
                <img src={detailsData.trade_item.item.img_url} alt='item_img' />
              </div>
              <div className='w-full grid gap-2'>
                <div className='flex items-center'>
                  <span className='mr-6 text-lg font-semibold'>개조</span>
                  <span>{handleTuning(detailsData.trade_item.upgrade.tuning)}</span>
                </div>
                <div className='flex items-center'>
                  <span className='mr-6 text-lg font-semibold'>강화</span>
                  <span>
                    {handleEnhancement(detailsData.trade_item.upgrade.enhancement, detailsData.item_category)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className='grid grid-cols-5 items-start gap-4 break-words whitespace-pre-line md:grid-cols-6 lg:grid-cols-7'>
            <span className='col-span-1 whitespace-nowrap text-lg font-semibold'>내용</span>
            <div className='col-span-4 mb-4 md:col-span-5 lg:col-span-6'>{detailsData?.content}</div>
          </div>

          <div className='grid grid-cols-5 items-center gap-4 break-words whitespace-pre-line md:grid-cols-6 lg:grid-cols-7'>
            <span className='col-span-1 whitespace-nowrap text-lg font-semibold'>가격</span>
            <div className='col-span-4 md:col-span-5 lg:col-span-6'>
              <span>{detailsData?.price && addCommaToPrice(detailsData.price)}</span>
              <span className='ml-1'>원</span>
            </div>
          </div>

          {!isMine && <ContactModal detailsData={detailsData} />}
          {isMine && <Button className='w-full my-8'>거래 완료하기</Button>}
        </>
      )}
    </div>
  );
}
