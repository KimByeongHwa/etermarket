import { ForwardedRef, forwardRef } from 'react';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import addCommaToPrice from '@/utils/addCommaToPrice';
import { TradePostReadingData } from '@/types/trade/tradePostData.type';
import TradeTypeChip from './TradeTypeChip';

interface ItemListBoxProps {
  listData: TradePostReadingData;
}

export default forwardRef(function ItemListBox({ listData }: ItemListBoxProps, ref: ForwardedRef<HTMLDivElement>) {
  const itemImgSrc = listData.trade_item?.item.img_url;
  return (
    <div
      ref={ref}
      className='cursor-pointer w-full mx-auto grid grid-cols-4 items-center border rounded-2xl p-4 gap-10 md:grid-cols-5 md:py-6'
    >
      <div>
        <TradeTypeChip type={listData.post_type} />
      </div>
      <div className='h-14 m-auto'>
        {listData.trade_item ? (
          <img src={itemImgSrc} alt='item-img' className='w-full h-full object-contain' />
        ) : (
          <div className='flex justify-center items-center h-full'>
            <MdOutlineImageNotSupported size={24} />
          </div>
        )}
      </div>
      <div className='col-span-2 text-center whitespace-nowrap overflow-hidden text-ellipsis'>{listData.title}</div>
      <div className='hidden text-center whitespace-nowrap overflow-hidden text-ellipsis md:block'>
        {listData.price && addCommaToPrice(listData.price)} 원
      </div>
    </div>
  );
});
