import supabase from '@/lib/supabase';
import { LoginResultData } from '@/types/authData.type';

export default async function handleLogIn(inputs: { userId: string; userPw: string }): Promise<LoginResultData> {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('user_id', inputs.userId).maybeSingle();

    if (error) {
      return {
        success: false,
        errorMessage: '로그인에 실패했습니다. 관리자에게 문의해주세요.',
        data: null,
      };
    }

    if (!data) {
      return {
        success: false,
        errorMessage: '존재하지 않는 아이디입니다.',
        data: null,
      };
    }

    if (data.user_pw !== inputs.userPw) {
      return {
        success: false,
        errorMessage: '비밀번호가 일치하지 않습니다.',
        data: null,
      };
    }

    return {
      success: true,
      errorMessage: null,
      data: data,
    };
  } catch {
    throw new Error();
  }
}
