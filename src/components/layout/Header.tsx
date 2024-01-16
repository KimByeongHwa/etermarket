import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='container py-6'>
      <div className='container w-11/12 flex items-center justify-between'>
        <div className='font-roboto text-2xl font-bold'>
          <Link to='/etermarket/'>ETERMARKET</Link>
        </div>
        <div className='text-lg font-semibold space-x-20'>
          <Link to='/etermarket/itemSearch'>매물 검색</Link>
          <Link to='/etermarket/tradeHistory'>시세 조회</Link>
        </div>
        <div className='text-base text-muted-foreground '>
          <Link to='/etermarket/signUp'>회원가입</Link> / <Link to='/etermarket/logIn'>로그인</Link>
        </div>
      </div>
    </div>
  );
}
