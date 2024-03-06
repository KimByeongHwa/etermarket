import { ForwardedRef, forwardRef } from 'react';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { TradePostReadingData } from '@/types/trade/tradePostData.type';
import TradeTypeChip from './TradeTypeChip';

interface ItemListBoxProps {
  postData: TradePostReadingData;
}

export default forwardRef(function ItemListBox({ postData }: ItemListBoxProps, ref: ForwardedRef<HTMLDivElement>) {
  const itemImgSrc = postData.trade_item?.item.img_url;
  return (
    <div
      ref={ref}
      className='cursor-pointer w-full mx-auto grid grid-cols-4 items-center border rounded-2xl p-4 gap-10 md:grid-cols-5 md:py-6'
    >
      <div>
        <TradeTypeChip type={postData.post_type} />
      </div>
      <div className='h-14 m-auto'>
        {postData.trade_item ? (
          <img src={itemImgSrc} alt='item-img' className='w-full h-full object-contain' />
        ) : (
          <div className='flex justify-center items-center h-full'>
            <MdOutlineImageNotSupported size={24} />
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
