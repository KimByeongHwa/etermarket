import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';
import LogInModal from '@/components/auth/LogInModal';

export default function AuthHandler() {
  const [isLogIn, setIsLogIn] = useState(false);

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
        <LogInModal trigger='로그인' />
      )}
    </>
  );
}
