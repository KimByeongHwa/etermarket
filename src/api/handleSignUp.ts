import supabase from '@/lib/supabase';
import CustomAlert from '@/components/common/CustomAlert';
import { SignUpFormData } from '@/types/auth/authData.type';

export default async function handleSignUp(data: SignUpFormData) {
  try {
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

        if (error.message.includes('profile_pkey') || error.message.includes('duplicate key value')) {
          errorMessage = '해당 카카오 계정으로 이미 가입된 아이디가 있습니다.';
        } else if (error.message.includes('profile_user_id_key')) {
          errorMessage = '이미 사용 중인 아이디입니다.';
        } else if (error.message.includes('profile_nickname_key')) {
          errorMessage = '이미 사용 중인 닉네임입니다.';
        }

        CustomAlert(errorMessage, 'error');
      } else {
        CustomAlert('회원가입이 완료되었습니다.<br /> 새로 만든 아이디로 로그인 해주세요.', 'success').then(res => {
          if (res.isConfirmed || res.isDismissed) window.location.href = '/';
        });
      }
    }

    localStorage.removeItem('kakaoSession');
  } catch {
    CustomAlert('카카오 인증 완료 후 접근해주세요.', 'error');
  }
}
