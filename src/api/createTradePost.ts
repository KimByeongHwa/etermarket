import CustomAlert from '@/components/common/CustomAlert';
import supabase from '@/lib/supabase';
import { TradePostCreatingData, TradePostReadingData, WriterData } from '@/types/trade/tradePostData.type';

export default async function createTradePost(postData: TradePostCreatingData | TradePostReadingData) {
  const userData = localStorage.getItem('userData');

  if (!userData) {
    CustomAlert('로그인 데이터가 존재하지 않습니다.', 'error');
    return;
  }

  const parsedUserData = JSON.parse(userData);
  const { kakao_email, user_id, nickname } = parsedUserData;
  const writerData: WriterData = { kakao_email: kakao_email, user_id: user_id, nickname: nickname };

  try {
    await supabase.from('trade_posts').insert({
      trade_type: postData.trade_type,
      item_category: postData.item_category,
      trade_item: postData.trade_item,
      title: postData.title,
      content: postData.content,
      price: postData.price,
      character_nickname: postData.character_nickname,
      phone_number: postData.phone_number,
      writer: writerData,
    });

    await supabase
      .from('users')
      .update({ trade_posts: [postData] })
      .eq('user_id', parsedUserData.user_id);
  } catch {
    CustomAlert('등록에 실패했습니다.', 'error');
  }
}
