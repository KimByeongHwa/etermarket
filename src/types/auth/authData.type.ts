export interface SignUpFormData extends LogInFormData {
  userPwConfirm: string;
  nickname: string;
}

export interface LogInFormData {
  userId: string;
  userPw: string;
}

export interface UserData {
  created_at: string;
  id: number;
  kakao_email: string;
  nickname: string;
  user_id: string;
  user_pw: string;
}

export interface LoginResultData {
  success: boolean;
  errorMessage: string | null;
  data: UserData | null;
}
