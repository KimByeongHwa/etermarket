import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import useSignUp from '@/hooks/useSignUp';

export default function SignInModal() {
  const [isLogin, setIsLogin] = useState(false);

  async function checkLogin() {
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>카카오 로그인</DialogTitle>
              <DialogDescription>카카오 계정을 통해 간편하게 시작해보세요!</DialogDescription>
            </DialogHeader>
            <div>
              <Button type='submit' onClick={useSignUp}>
                카카오 계정 로그인
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
