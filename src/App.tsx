import '@/global.css';
import { Button } from '@/components/ui/button';

export default function App() {
  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Button>버튼</Button>
      <Button className='bg-indigo-500'>버튼</Button>
      <Button className='bg-pink-500'>버튼</Button>
    </div>
  );
}
