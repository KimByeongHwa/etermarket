import { useForm } from 'react-hook-form';
import { SignUpFormData } from '@/../types';
import handleSignUp from '@/api/handleSignUp';

export default function SingUpPage() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormData>({ mode: 'onBlur' });

  const userPwInput = watch('userPw');

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>회원가입</h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSubmit(handleSignUp)}>
          <div>
            <label htmlFor='userId' className='block text-sm font-medium leading-6 text-gray-900'>
              아이디
            </label>
            <div className='mt-2'>
              <input
                type='text'
                id='userId'
                className='block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                {...register('userId', {
                  required: '아이디를 입력해 주세요.',
                  pattern: { value: /^[a-z0-9]+$/, message: '아이디는 영문 소문자와 숫자만 사용 가능합니다.' },
                  minLength: { value: 4, message: '아이디는 4자 이상이어야 합니다.' },
                  maxLength: { value: 18, message: '아이디는 18자 이하이어야 합니다.' },
                })}
              />
              {errors.userId && <div className='my-2 text-red-500'>{errors.userId.message?.toString()}</div>}
            </div>
          </div>

          <div>
            <label htmlFor='nickname' className='block text-sm font-medium leading-6 text-gray-900'>
              닉네임
            </label>
            <div className='mt-2'>
              <input
                type='text'
                id='nickname'
                className='block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                {...register('nickname', {
                  required: '닉네임을 입력해 주세요.',
                  minLength: { value: 2, message: '닉네임은 2자 이상이어야 합니다.' },
                  maxLength: { value: 18, message: '닉네임은 18자 이하이어야 합니다.' },
                })}
              />
              {errors.nickname && <div className='my-2 text-red-500'>{errors.nickname.message?.toString()}</div>}
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='userPw' className='block text-sm font-medium leading-6 text-gray-900'>
                비밀번호
              </label>
            </div>
            <div className='mt-2'>
              <input
                type='password'
                id='userPw'
                className='block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                {...register('userPw', {
                  required: '비밀번호를 입력해 주세요.',
                  minLength: { value: 6, message: '비밀번호는 6자 이상이어야 합니다.' },
                })}
              />
              {errors.userPw && <div className='my-2 text-red-500'>{errors.userPw.message?.toString()}</div>}
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='userPwConfirm' className='block text-sm font-medium leading-6 text-gray-900'>
                비밀번호 확인
              </label>
            </div>
            <div className='mt-2'>
              <input
                type='password'
                id='userPwConfirm'
                className='block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                {...register('userPwConfirm', {
                  required: '비밀번호가 일치하지 않습니다.',
                  validate: value => value === userPwInput || '비밀번호가 일치하지 않습니다.',
                })}
              />
              {errors.userPwConfirm && (
                <div className='my-2 text-red-500'>{errors.userPwConfirm.message?.toString()}</div>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex mt-14 w-full justify-center rounded-md bg-blue-950 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950'
            >
              회원가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
