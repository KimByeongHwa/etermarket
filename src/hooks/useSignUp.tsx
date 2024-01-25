import supabase from '@/lib/supabase';

export default function useSignUp() {
  async function signInWithKakao() {
    const result = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: 'http://localhost:5173/etermarket/signup/',
      },
    });
    return result;
  }

  // console.log(signInWithKakao);
  signInWithKakao().then(result => console.log(result));
}
