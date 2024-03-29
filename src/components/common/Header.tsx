import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import checkAuthentication from '@/api/checkAuthentication';
import { Dialog, Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import AuthHandler from '@/components/auth/AuthHandler ';
import CustomAlert from '@/components/common/CustomAlert';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      const authResult = await checkAuthentication();
      setIsAuthenticated(authResult);
    };

    authenticate();
  }, []);

  let nickname;

  const logInUserData = localStorage.getItem('userData');

  if (isAuthenticated && logInUserData) {
    nickname = JSON.parse(logInUserData).nickname;
  }

  return (
    <header>
      <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <Link to='/etermarket/' className='-m-1.5 p-1.5 font-roboto text-lg font-bold'>
            <span className='sr-only'>ETERMARKET</span>
            ETERMARKET
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <Popover.Group className='hidden lg:flex lg:gap-x-12 font-semibold leading-6 text-gray-900'>
          <Link to='/etermarket/search-item'>매물 검색</Link>
          <Link to='/etermarket/sell-item'>판매 등록</Link>
          <Link to='/etermarket/buy-item'>구매 등록</Link>
          <Link
            to='/etermarket/trade-history'
            onClick={e => {
              if (!isAuthenticated) {
                e.preventDefault();
                CustomAlert('로그인 후 이용해주세요.', 'warning');
              }
            }}
          >
            시세 조회
          </Link>
        </Popover.Group>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12 font-semibold leading-6 text-gray-900'>
          {nickname && (
            <Link to='/etermarket/mypage' className='cursor-pointer'>
              {nickname} 님
            </Link>
          )}
          <AuthHandler />
        </div>
      </nav>

      <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className='fixed inset-0 z-10' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link to='/etermarket/' className='-m-1.5 p-1.5 font-roboto text-lg font-bold'>
              <span className='sr-only'>ETERMARKET</span>
              ETERMARKET
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6 text-base font-semibold leading-7 text-gray-900'>
                <Link
                  to='/etermarket/search-item'
                  onClick={() => setMobileMenuOpen(false)}
                  className='-mx-3 block rounded-lg px-3 py-2   hover:bg-gray-50'
                >
                  매물 검색
                </Link>
                <Link
                  to='/etermarket/sell-item'
                  onClick={() => setMobileMenuOpen(false)}
                  className='-mx-3 block rounded-lg px-3 py-2   hover:bg-gray-50'
                >
                  판매 등록
                </Link>
                <Link
                  to='/etermarket/buy-item'
                  onClick={() => setMobileMenuOpen(false)}
                  className='-mx-3 block rounded-lg px-3 py-2   hover:bg-gray-50'
                >
                  구매 등록
                </Link>
                <Link
                  to='/etermarket/trade-history'
                  onClick={e => {
                    if (!isAuthenticated) {
                      e.preventDefault();
                      CustomAlert('로그인 후 이용해주세요.', 'warning');
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className='-mx-3 block rounded-lg px-3 py-2  hover:bg-gray-50'
                >
                  시세 조회
                </Link>
              </div>
              <div className='py-6 text-base font-semibold leading-7 text-gray-900'>
                {nickname && (
                  <div>
                    <Link
                      to='/etermarket/mypage'
                      onClick={() => setMobileMenuOpen(false)}
                      className='cursor-pointer -mx-3 block rounded-lg px-3 py-2 hover:bg-gray-50'
                    >
                      {nickname} 님
                    </Link>
                  </div>
                )}
                <div className='cursor-pointer -mx-3 block rounded-lg px-3 py-2 hover:bg-gray-50'>
                  <AuthHandler />
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
