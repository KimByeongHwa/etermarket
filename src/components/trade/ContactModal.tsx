import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { TradePostReadingData } from '@/types/trade/tradePostData.type';
import addDashToPhoneNumber from '@/utils/addDashToPhoneNumber';
import checkAuthentication from '@/api/checkAuthentication';
import CustomAlert from '../common/CustomAlert';

export default function ContactModal({ detailsData }: { detailsData: TradePostReadingData | null }) {
  let writer;

  if (detailsData?.trade_type === 'sell') {
    writer = '판매자';
  } else writer = '구매자';

  const handleTrigger = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const authResult = await checkAuthentication();

    if (!authResult) {
      e.preventDefault();
      CustomAlert('로그인 후 이용해주세요.', 'warning');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={handleTrigger} asChild>
        <Button className='my-8 w-full'>{`${writer}와 연락하기`}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='gap-8 md:gap-4'>
        <div className='grid gap-4 pt-4'>
          <div className='grid grid-cols-4'>
            <span className='col-span-2 font-semibold'>{writer}</span>
            <span className='col-span-2'>{detailsData?.writer.nickname}</span>
          </div>
          <div className='grid grid-cols-4'>
            <span className='col-span-2 font-semibold'>거래할 캐릭터명</span>
            <span className='col-span-2'>{detailsData?.character_nickname}</span>
          </div>
          <div className='grid grid-cols-4'>
            <span className='col-span-2 font-semibold'>휴대폰 번호</span>
            <span className='col-span-2'>
              {detailsData?.phone_number ? addDashToPhoneNumber(detailsData.phone_number) : '조회에 실패하였습니다.'}
            </span>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
