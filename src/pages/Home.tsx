import { Badge } from '@/components/ui/badge';

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
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:text-center'>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>ETERMARKET</p>
          <p className='mt-6 text-lg leading-8 text-gray-600'>이터널시티 아이템 거래 플랫폼</p>
        </div>
        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl'>
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
            {features.map(feature => (
              <div key={feature.name} className='relative lg:pl-16'>
                <dt>
                  <Badge className='px-3 text-base font-semibold leading-7'>{feature.name}</Badge>
                </dt>
                <dd className='mt-2 text-base leading-7 text-gray-600 whitespace-pre-line'>{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
