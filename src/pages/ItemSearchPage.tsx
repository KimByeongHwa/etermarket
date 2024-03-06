import { useState, useEffect, useCallback, useRef } from 'react';
import fetchTradeItems from '@/api/fetchTradeItems';
import { Input } from '@/components/ui/input';
import ItemListBox from '@/components/trade/ItemListBox';
import ConditinalSearchPopover from '@/components/trade/ConditinalSearchPopover';
import { TradePostReadingData } from '@/types/trade/tradePostData.type';

export default function ItemSearchPage() {
  const [resultData, setResultData] = useState<TradePostReadingData[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const targetRef = useRef<HTMLDivElement | null>(null);

  const getItemList = useCallback(async (pageIndex: number, searchInput: string) => {
    const res = await fetchTradeItems(pageIndex, searchInput ? searchInput : null);

    if (res.data && pageIndex === 0) {
      setResultData(res.data);
    } else {
      setResultData(prev => [...prev, ...(res.data as TradePostReadingData[])]);
    }

    setPageIndex(prev => prev + 1);

    if (res.data?.length === 0) {
      setIsEnd(true);
    }
    console.log('pageIndex', pageIndex);
  }, []);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isEnd) {
          getItemList(pageIndex, searchInput);
        }
      });
    },
    [getItemList, isEnd, pageIndex, searchInput],
  );

  const handleSearch = () => {
    setResultData([]);
    setPageIndex(0);
    getItemList(0, searchInput);
  };

  useEffect(() => {
    const options = {
      threshold: 0.8,
      root: null,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    targetRef.current && observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, pageIndex, handleIntersection]);

  useEffect(() => {
    getItemList(pageIndex, searchInput);
  }, []);

  return (
    <div className='mx-auto my-16 max-w-7xl px-6'>
      <div className='mb-14 text-center text-xl font-semibold leading-8 text-gray-900'>매물 리스트</div>

      <Input
        placeholder='글 제목 검색'
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        className='w-full mx-auto p-6 rounded-full sm:w-4/5 md:w-3/5 lg:w-1/2'
      />

      <div className='flex w-fit mx-auto mt-10 mb-14'>
        <ConditinalSearchPopover />
      </div>
      <div className='flex flex-col gap-4'>
        {resultData.length ? (
          resultData.map((data, idx) => {
            if (idx === resultData.length - 1) return <ItemListBox ref={targetRef} key={data.id} listData={data} />;

            return <ItemListBox key={data.id} listData={data} />;
          })
        ) : (
          <div>검색된 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
