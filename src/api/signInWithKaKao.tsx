import supabase from '@/lib/supabase';

export default function signInWithKaKao() {
  async function signInWithKakao() {
    const result = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: 'http://localhost:5173/etermarket/signup/',
        queryParams: {
          prompt: 'login',
          scope: 'profile_nickname account_email',
        },
      },
    });
    return result;
  }

  // console.log(signInWithKakao);
  signInWithKakao().then(result => console.log(result));
}
