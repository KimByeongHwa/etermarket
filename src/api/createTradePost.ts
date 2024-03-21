import CustomAlert from '@/components/common/CustomAlert';
import supabase from '@/lib/supabase';
import { TradePostCreatingData } from '@/types/trade/tradePostData.type';

export default async function createTradePost(postData: TradePostCreatingData) {
  try {
    await supabase.from('trade_posts').insert(postData);

    const { data, error } = await supabase
      .from('users')
      .select('trade_posts')
      .eq('kakao_email', postData.writer.kakao_email)
      .single();

    if (error) {
      return CustomAlert('등록에 실패했습니다.', 'error');
    }

    const updatedTradePosts = [postData, ...(data.trade_posts || [])];

    await supabase
      .from('users')
      .update({ trade_posts: updatedTradePosts })
      .eq('kakao_email', postData.writer.kakao_email);
  } catch {
    CustomAlert('등록에 실패했습니다.', 'error');
  }
}
