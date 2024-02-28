import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import LogInModal from '@/components/auth/LogInModal';

const features = [
  {
    name: '개인정보 보호',
    description: '휴대폰 번호를 모두가 볼 수 있는 곳에 올려두지 마세요.\n 개인 정보는 거래자 간에만 공개됩니다.',
  },
  {
    name: '아이템 가격 기록',
    description:
      '거래 완료 글의 가격이 지워졌거나, 글 자체가 삭제되어 시세 파악이 어려우셨죠?\n 아이템 거래가를 기록하여 시세를 알려드립니다.',
  },
];

export default function Home() {
  const navigate = useNavigate();

  const logInUserData = localStorage.getItem('userData');

  return (
    <div className=' mx-auto my-16 max-w-7xl px-6 lg:my-28 lg:px-8'>
      <div className='mx-auto max-w-2xl text-center'>
        <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>ETERMARKET</p>
        <p className='mt-6 text-lg leading-8 text-gray-600'>이터널시티 아이템 거래 플랫폼</p>
      </div>
      <div className='mx-auto my-16 max-w-2xl sm:my-20 lg:my-24 lg:max-w-4xl'>
        <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
          {features.map(feature => (
            <div key={feature.name} className='relative lg:pl-16'>
              <dt>
                <Badge className='px-3 text-base font-semibold leading-7s'>{feature.name}</Badge>
              </dt>
              <dd className='mt-2 text-base leading-7 text-gray-600 whitespace-pre-line'>{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className='text-center'>
        {logInUserData ? (
          <Button
            onClick={() => navigate('/etermarket/search-item')}
            className='bg-primary text-primary-foreground h-11 rounded-md px-24 py-2 hover:bg-primary/90 sm:h-12 sm:px-28 sm:text-lg'
          >
            입장하기
          </Button>
        ) : (
          <div className='w-fit mx-auto'>
            <LogInModal
              trigger={
                <div className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground h-11 px-24 py-2 hover:bg-primary/90 sm:h-12 sm:px-28 sm:text-lg'>
                  입장하기
                </div>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
