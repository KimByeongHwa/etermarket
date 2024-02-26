import supabase from '@/lib/supabase';

export default async function checkAuthentication() {
  const userData = localStorage.getItem('userData');

  if (userData !== null) {
    const { user_id: userId, kakao_email: userKakaoEmail } = JSON.parse(userData);

    try {
      await supabase.from('users').select('*').eq('user_id', userId).eq('kakao_email', userKakaoEmail).maybeSingle();
      return true;
    } catch {
      return false;
    }
  } else return false;
}
