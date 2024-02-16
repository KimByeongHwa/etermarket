import supabase from '@/lib/supabase';

export default async function signInWithKakao() {
  try {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: 'http://localhost:5173/etermarket/signup/',
        queryParams: {
          prompt: 'login',
          scope: 'profile_nickname account_email',
        },
      },
    });
  } catch {
    throw new Error();
  }
}
