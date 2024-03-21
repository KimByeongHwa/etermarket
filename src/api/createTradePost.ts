import CustomAlert from '@/components/common/CustomAlert';
import supabase from '@/lib/supabase';
import { TradePostCreatingData } from '@/types/trade/tradePostData.type';

export default async function createTradePost(postData: TradePostCreatingData) {
  try {
    const { data, error } = await supabase.from('trade_posts').insert(postData);
    return { data, error };
  } catch {
    CustomAlert('등록에 실패했습니다.', 'error');
  }
}
