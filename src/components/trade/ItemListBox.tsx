import { ForwardedRef, forwardRef } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import TradeTypeChip from '@/components/trade/TradeTypeChip';
import { TradePostReadingData } from '@/types/trade/tradePostData.type';
import addCommaToPrice from '@/utils/addCommaToPrice';

interface ItemListBoxProps {
  postData: TradePostReadingData;
  onClick: () => void;
}

export default forwardRef(function ItemListBox(
  { postData, onClick }: ItemListBoxProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const itemImgSrc = postData.trade_item?.item.img_url;

  return (
    <div
      ref={ref}
      onClick={onClick}
      className='cursor-pointer w-full mx-auto grid grid-cols-4 items-center p-4 gap-10 md:grid-cols-5 md:py-6'
    >
      <div>
        <TradeTypeChip type={postData.trade_type} />
      </div>
      <div className='h-14 m-auto'>
        {postData.trade_item ? (
          <img src={itemImgSrc} alt='item-img' className='w-full h-full object-contain' />
        ) : (
          <div className='flex justify-center items-center h-full'>
            <BsBoxSeam size={24} />
          </div>
        )}
      </div>
      <div className='col-span-2 text-center whitespace-nowrap overflow-hidden text-ellipsis'>{postData.title}</div>
      <div className='hidden text-center whitespace-nowrap overflow-hidden text-ellipsis md:block'>
        {postData.price && addCommaToPrice(postData.price)} 원
      </div>
    </div>
  );
});
