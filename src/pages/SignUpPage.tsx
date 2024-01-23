export default function SingUpPage() {
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>회원가입</h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6'>
          <div>
            <label htmlFor='userId' className='block text-sm font-medium leading-6 text-gray-900'>
              아이디
            </label>
            <div className='mt-2'>
              <input
                type='text'
                id='userId'
                name='userId'
                required
                className='block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='userPassword' className='block text-sm font-medium leading-6 text-gray-900'>
                비밀번호
              </label>
            </div>
            <div className='mt-2'>
              <input
                type='password'
                id='userPassword'
                name='userPassword'
                required
                className='block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='userPasswordConfirm' className='block text-sm font-medium leading-6 text-gray-900'>
                비밀번호 확인
              </label>
            </div>
            <div className='mt-2'>
              <input
                type='password'
                id='userPasswordConfirm'
                name='userPasswordConfirm'
                required
                className='block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
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
                name='nickname'
                required
                className='block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
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
