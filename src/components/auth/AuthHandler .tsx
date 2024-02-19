import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';
import signInWithKakao from '@/api/signInWithKakao';
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
import handleLogIn from '@/api/handleLogIn';

export default function AuthHandler() {
  const [inputs, setInputs] = useState({
    userId: '',
    userPw: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [isLogInFalied, setIsLogInFalied] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);

  const handleKakaoLogin = async () => {
    await signInWithKakao();
  };

  const submitLogIn = () => {
    handleLogIn(inputs).then(res => {
      console.log(res);

      if (res.success === true) {
        setIsLogInFalied(false);
        localStorage.setItem('userData', JSON.stringify(res.data));
        window.location.href = '/etermarket/';
      } else {
        setIsLogInFalied(true);
        setErrorMessage(res.errorMessage);
      }
    });
  };

  async function checkLogin() {
    const logInUserData = localStorage.getItem('userData');

    if (logInUserData) setIsLogIn(true);
    else setIsLogIn(false);
  }

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('userData');
    window.location.href = '/etermarket/';
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      {isLogIn ? (
        <button type='button' onClick={handleLogOut}>
          로그아웃
        </button>
      ) : (
        <Dialog>
          <DialogTrigger>로그인</DialogTrigger>
          <DialogContent className='text-center'>
            <DialogHeader>
              <DialogTitle className='text-center mt-2 text-xl'>로그인</DialogTitle>
            </DialogHeader>

            <form onSubmit={e => e.preventDefault()} className='w-3/5 mx-auto'>
              <label htmlFor='userId' className='block text-start font-medium leading-6 text-gray-900'>
                아이디
              </label>
              <input
                type='text'
                id='userId'
                value={inputs.userId}
                onChange={e => setInputs({ ...inputs, userId: e.target.value })}
                className='block w-full rounded-md border-0 mt-2 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />

              <label htmlFor='userPw' className='mt-4 block text-start font-medium leading-6 text-gray-900'>
                비밀번호
              </label>
              <input
                type='password'
                autoComplete='off'
                id='userPw'
                value={inputs.userPw}
                onChange={e => setInputs({ ...inputs, userPw: e.target.value })}
                className='block w-full rounded-md border-0 mt-2 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />

              <div className='mt-8'>
                {isLogInFalied && <div className='mb-4 text-red-500'>{errorMessage}</div>}
                <Button type='submit' onClick={submitLogIn} className='w-full rounded-md'>
                  로그인하기
                </Button>
              </div>
            </form>

            <div className='w-3/5 mt-4 mx-auto'>
              <DialogDescription>아직 회원이 아니신가요?</DialogDescription>
              <Button
                type='button'
                onClick={handleKakaoLogin}
                className='w-full mt-3 mb-4 rounded-xl bg-kakaoYellow hover:bg-kakaoYellow text-kakaoBlack'
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
