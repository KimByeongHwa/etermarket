import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelectTag } from '@/hooks/useSelectTag';
import fetchTradeItems from '@/api/fetchTradeItems';
import { Input } from '@/components/ui/input';
import SelectChip from '@/components/common/SelectChip';
import ItemListBox from '@/components/trade/ItemListBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { IoIosSearch } from 'react-icons/io';
import { TradePostReadingData } from '@/types/trade/tradePostData.type';
import searchTags from '@/constants/searchTags';
import checkAuthentication from '@/api/checkAuthentication';
import CustomAlert from '@/components/common/CustomAlert';

export default function ItemSearchPage() {
  const [resultData, setResultData] = useState<TradePostReadingData[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { selectedTradeTypeTag, handleTradeTypeTag, selectedItemCategoryTag, handleItemCategoryTag } = useSelectTag();

  const targetRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const getItemList = useCallback(
    async (pageIndex: number, searchInput?: string, tradeType?: string, itemCategory?: string) => {
      if (pageIndex === 0) setIsLoading(true);
      try {
        const res = await fetchTradeItems(
          pageIndex,
          searchInput ? searchInput : null,
          tradeType ? tradeType : null,
          itemCategory ? itemCategory : null,
        );

        if (!res.data) {
          throw new Error();
        }

        if (res.data && pageIndex === 0) {
          setResultData(res.data);
        } else {
          setResultData(prev => [...prev, ...(res.data as TradePostReadingData[])]);
        }

        setPageIndex(prev => prev + 1);

        if (res.data?.length === 0) {
          setIsEnd(true);
        }
      } catch {
        throw new Error();
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isEnd) {
          getItemList(pageIndex, searchKeyword, selectedTradeTypeTag, selectedItemCategoryTag);
        }
      });
    },
    [getItemList, isEnd, pageIndex, searchKeyword, selectedTradeTypeTag, selectedItemCategoryTag],
  );

  const handleSearch = () => {
    setPageIndex(0);
    setResultData([]);
    setIsEnd(false);
    handleTradeTypeTag('all');
    handleItemCategoryTag('all');
    setSearchKeyword(searchInput);
  };

  const onClickTradeTypeTag = (value: string) => {
    setPageIndex(0);
    setResultData([]);
    setIsEnd(false);
    handleTradeTypeTag(value);
  };

  const onClickItemCategoryTag = (value: string) => {
    setPageIndex(0);
    setResultData([]);
    setIsEnd(false);
    handleItemCategoryTag(value);
  };

  const onClickItemListBox = async (postId: number) => {
    const isAuthenticated = await checkAuthentication();

    if (!isAuthenticated) {
      return CustomAlert('로그인 후 이용해주세요.', 'warning');
    }

    navigate(`/etermarket/trade-post/${postId}`);
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
    getItemList(0, searchKeyword, selectedTradeTypeTag, selectedItemCategoryTag);
  }, [getItemList, searchKeyword, selectedTradeTypeTag, selectedItemCategoryTag]);

  return (
    <div className='mx-auto my-16 max-w-7xl px-6'>
      <div
        onClick={() => window.location.reload()}
        className='w-fit mx-auto mb-14 text-center text-xl font-semibold leading-8 text-gray-900 cursor-pointer'
      >
        매물 리스트
      </div>

      <div className='relative flex w-full mx-auto sm:w-4/5 md:w-3/5 lg:w-1/2'>
        <Input
          placeholder='글 제목 검색'
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          className='mx-auto px-6 py-5 rounded-full'
        />
        <IoIosSearch size={20} onClick={handleSearch} className='absolute right-6 bottom-2.5 cursor-pointer' />
      </div>

      <div className='grid grid-cols-3 gap-3.5 w-fit mx-auto mt-12 mb-3.5 md:gap-4 md:mt-14 md:mb-6'>
        {searchTags.tradeTypeTag.map(category => {
          return (
            <SelectChip
              key={category.value}
              onClick={() => onClickTradeTypeTag(category.value)}
              isSelected={category.value === selectedTradeTypeTag}
            >
              {category.text}
            </SelectChip>
          );
        })}
      </div>

      <div className='grid grid-cols-5 gap-3.5 w-fit mx-auto mb-6 md:grid-cols-10 md:gap-4 md:mb-8'>
        {searchTags.itemCategoryTag.map(category => {
          return (
            <SelectChip
              key={category.value}
              onClick={() => onClickItemCategoryTag(category.value)}
              isSelected={category.value === selectedItemCategoryTag}
            >
              {category.text}
            </SelectChip>
          );
        })}
      </div>

      <div className='flex flex-col gap-4'>
        {isLoading && <div className='mx-auto mt-10'>{<LoadingSpinner />}</div>}

        {!isLoading && resultData.length === 0 ? (
          <div>검색된 결과가 없습니다.</div>
        ) : (
          resultData.map((data, idx) => {
            if (idx === resultData.length - 1)
              return (
                <ItemListBox
                  ref={targetRef}
                  key={data.id}
                  postData={data}
                  onClick={() => {
                    navigate(`/etermarket/trade-post/${data.id}`);
                  }}
                />
              );

            return <ItemListBox key={data.id} postData={data} onClick={() => onClickItemListBox(data.id)} />;
          })
        )}
      </div>
    </div>
  );
}
