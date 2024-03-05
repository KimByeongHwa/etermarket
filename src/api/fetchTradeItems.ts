import supabase from '@/lib/supabase';

export default async function fetchTradeItems(pageIndex: number) {
  const startIndex = pageIndex * 5;

  const { data, error } = await supabase
    .from('trade_posts')
    .select('*')
    .range(startIndex, startIndex + 4)
    .order('created_at', { ascending: false });
  return { data, error };
}
