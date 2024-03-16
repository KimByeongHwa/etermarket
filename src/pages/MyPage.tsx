import fetchMyTradePosts from '@/api/fetchMyTradePosts';
import { useEffect } from 'react';

export default function MyPage() {
  const userData = localStorage.getItem('userData');

  const parsedUserData = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    fetchMyTradePosts(parsedUserData.id, parsedUserData.kakao_email, parsedUserData.user_id);
  });
  return <div className='mx-auto my-16 max-w-7xl px-6'>마이페이지</div>;
}
