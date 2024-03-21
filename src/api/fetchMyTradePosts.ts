import supabase from '@/lib/supabase';

export default async function fetchMyTradePosts(id: number) {
  try {
    const { data, error } = await supabase
      .from('trade_posts')
      .select('*')
      .eq('writer->id', id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data };
  } catch {
    throw new Error();
  }
}
