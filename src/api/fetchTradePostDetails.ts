import supabase from '@/lib/supabase';

export default async function fetchTradePostDetails(postId: number) {
  try {
    const { data, error } = await supabase.from('trade_posts').select('*').eq('id', postId).single();
    return { data, error };
  } catch {
    throw new Error();
  }
}
