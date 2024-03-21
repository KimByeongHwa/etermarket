import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchMyTradePosts from '@/api/fetchMyTradePosts';
import checkAuthentication from '@/api/checkAuthentication';
import ItemListBox from '@/components/trade/ItemListBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CustomAlert from '@/components/common/CustomAlert';
import { TradePostReadingData } from '@/types/trade/tradePostData.type';

export default function MyPage() {
  const [myTradePosts, setMyTradePosts] = useState<TradePostReadingData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const userData = localStorage.getItem('userData');

  const parsedUserData = userData ? JSON.parse(userData) : null;

  const getMyTradePosts = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetchMyTradePosts(parsedUserData.id);

      if (res.data) {
        setMyTradePosts(res.data);
      }
    } catch {
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  }, [parsedUserData.id]);

  const onClickItemListBox = async (postId: number) => {
    const isAuthenticated = await checkAuthentication();

    if (!isAuthenticated) {
      return CustomAlert('로그인 후 이용해주세요.', 'warning');
    }

    navigate(`/etermarket/trade-post/${postId}`);
  };

  useEffect(() => {
    getMyTradePosts();
  }, [getMyTradePosts]);

  return (
    <div className='mx-auto my-16 max-w-7xl px-6'>
      <div className='mb-12'>
        <div>
          <span className='text-lg font-semibold'>{parsedUserData.nickname}</span> 님이 작성하신 거래 글
          <span className='ml-2 text-lg'>{`(${myTradePosts.length} / 10)`}</span>
        </div>
        <span className='text-zinc-400'>도배 방지를 위해 거래 글은 총 10개까지 작성 가능합니다.</span>
      </div>

      <div className='grid grid-cols-1 divide-y border-red-100'>
        {isLoading && <div className='mx-auto mt-14'>{<LoadingSpinner />}</div>}

        {!isLoading && myTradePosts.length === 0 ? (
          <div>검색된 결과가 없습니다.</div>
        ) : (
          myTradePosts.map(post => {
            return <ItemListBox key={post.id} postData={post} onClick={() => onClickItemListBox(post.id)} />;
          })
        )}
      </div>
    </div>
  );
}
