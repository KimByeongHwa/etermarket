import supabase from '@/lib/supabase';
import { SignUpFormData } from 'types';
import Swal from 'sweetalert2';

export default async function handleSignUp(data: SignUpFormData) {
  const authInfo = await supabase.auth.getSession();
  const session = authInfo.data.session;

  localStorage.setItem('kakaoSession', JSON.stringify(session));

  const kakaoSession = localStorage.getItem('kakaoSession');

  if (kakaoSession !== null) {
    const parsedKakaoSession = JSON.parse(kakaoSession);
    const kakaoEmail = parsedKakaoSession.user.email;

    const { error } = await supabase.from('users').insert({
      kakao_email: kakaoEmail,
      user_id: data.userId,
      user_pw: data.userPw,
      nickname: data.nickname,
    });
    if (error) {
      let errorMessage = '알 수 없는 이유로 회원가입에 실패했습니다.<br /> 관리자에게 문의해주세요.';

      if (error.message.includes('profile_pkey')) {
        errorMessage = '해당 카카오 계정으로 이미 가입된 아이디가 있습니다.';
      } else if (error.message.includes('profile_user_id_key')) {
        errorMessage = '이미 사용 중인 아이디입니다.';
      } else if (error.message.includes('profile_nickname_key')) {
        errorMessage = '이미 사용 중인 닉네임입니다.';
      } else if (error.message.includes('kakao_email')) {
        errorMessage = '카카오 인증이 정상적으로 완료되지 않았습니다.';
      }

      Swal.fire({
        html: errorMessage,
        icon: 'error',
        confirmButtonColor: '#172554',
        confirmButtonText: '확인',
      });
    } else {
      Swal.fire({
        html: '회원가입이 완료되었습니다.<br /> 새로 만든 아이디로 로그인 해주세요.',
        icon: 'success',
        confirmButtonColor: '#172554',
        confirmButtonText: '확인',
      }).then(res => {
        if (res.isConfirmed) window.location.href = '/';
      });
    }
  }
}
