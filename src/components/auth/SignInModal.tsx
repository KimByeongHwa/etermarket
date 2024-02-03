import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';
import useSignInWithKaKao from '@/hooks/useSignInWithKaKao';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import KaKaoSymbol from '@/assets/svg/KaKaoSymbol';

export default function SignInModal() {
  const [isLogin, setIsLogin] = useState(false);

  async function checkLogin() {
    // 임시
    const authInfo = await supabase.auth.getSession();
    const session = authInfo.data.session;

    if (session) setIsLogin(true);
    console.log(session);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setIsLogin(false);
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      {isLogin ? (
        <button type='submit' onClick={() => signOut()}>
          로그아웃
        </button>
      ) : (
        <Dialog>
          <DialogTrigger>로그인</DialogTrigger>
          <DialogContent className='text-center'>
            <DialogHeader>
              <DialogTitle className='text-center mt-2 text-xl'>로그인</DialogTitle>
            </DialogHeader>

            <div className='w-3/5 mx-auto'>
              <label htmlFor='userId' className='block text-start font-medium leading-6 text-gray-900'>
                아이디
              </label>
              <input
                type='text'
                id='userId'
                className='block w-full rounded-md border-0 mt-2 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />

              <label htmlFor='userPw' className='mt-4 block text-start text-sm font-medium leading-6 text-gray-900'>
                비밀번호
              </label>
              <input
                type='password'
                id='userPw'
                className='block w-full rounded-md border-0 mt-2 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />

              <Button type='submit' className='w-full mt-8 rounded-md'>
                로그인하기
              </Button>
            </div>

            <div className='w-3/5 mt-4 mx-auto'>
              <DialogDescription>아직 아이디가 없으신가요?</DialogDescription>
              <Button
                type='submit'
                onClick={useSignInWithKaKao}
                className='w-full my-3 rounded-xl bg-kakaoYellow hover:bg-kakaoYellow text-kakaoBlack'
              >
                <div className='mr-2'>
                  <KaKaoSymbol />
                </div>
                카카오로 시작하기
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
