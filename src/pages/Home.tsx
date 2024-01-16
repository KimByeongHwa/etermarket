import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='container'>
      <h1 className='text-3xl font-bold underline'>이터마켓</h1>
      <Button>버튼</Button>
      <Button className='bg-indigo-500'>버튼</Button>
      <Button className='bg-pink-500'>버튼</Button>
    </div>
  );
}
