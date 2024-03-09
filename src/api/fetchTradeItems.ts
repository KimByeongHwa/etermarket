import supabase from '@/lib/supabase';

export default async function fetchTradeItems(pageIndex: number, searchInput?: string | null) {
  const startIndex = pageIndex * 5;

  let query = supabase.from('trade_posts').select('*').order('created_at', { ascending: false });

  if (searchInput) {
    query = query.ilike('title', `%${searchInput}%`);
  }

  query = query.range(startIndex, startIndex + 4);

  const { data, error } = await query;

  return { data, error };
}
