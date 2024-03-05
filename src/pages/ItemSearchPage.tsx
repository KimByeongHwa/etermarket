import { useState, useEffect, useCallback } from 'react';
import fetchTradeItems from '@/api/fetchTradeItems';
import ItemListBox from '@/components/trade/ItemListBox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TradePostReadingData } from '@/types/trade/tradePostData.type';

export default function ItemSearchPage() {
  const [postedData, setPostedData] = useState<TradePostReadingData[] | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [isEnd, setIsEnd] = useState(false);

  const fetchItemsData = useCallback(async () => {
    await fetchTradeItems(pageIndex).then(res => {
      setPostedData(prev => [...(prev || []), ...(res.data as TradePostReadingData[])]);
      setPageIndex(prev => prev + 1);

      if (res.data?.length === 0) {
        setIsEnd(true);
      }
    });
  }, [pageIndex]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isEnd) {
          fetchItemsData();
        }
      });
    },
    [fetchItemsData, isEnd],
  );

  useEffect(() => {
    const options = {
      threshold: 0.8,
      root: null,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    target && observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [target, pageIndex, handleIntersection]);

  return (
    <div className='mx-auto my-16 max-w-7xl px-6'>
      <div className='mb-14 text-center text-xl font-semibold leading-8 text-gray-900'>매물 검색</div>

      <Input placeholder='글 제목 검색' className='w-full mx-auto p-6 rounded-full sm:w-4/5 md:w-3/5 lg:w-1/2' />

      <div className='flex w-fit mx-auto mt-10 mb-14'>
        <Button variant='outline'>조건 검색</Button>
      </div>
      <div className='flex flex-col gap-4'>
        {postedData?.map(data => {
          return <ItemListBox key={data.id} postData={data} />;
        })}
        <div ref={setTarget}></div>
      </div>
    </div>
  );
}
