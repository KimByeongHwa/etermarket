import CustomAlert from '@/components/common/CustomAlert';
import supabase from '@/lib/supabase';

export default async function deleteTradePost(postId: number) {
  try {
    const { error } = await supabase.from('trade_posts').delete().eq('id', postId);
    return { error };
  } catch {
    CustomAlert('등록에 실패했습니다.', 'error');
  }
}
