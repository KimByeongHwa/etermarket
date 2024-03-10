import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TbFilterSearch } from 'react-icons/tb';

export default function ConditinalSearchPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <div className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'>
          <TbFilterSearch className='mr-3' />
          <span>필터링 검색</span>
        </div>
      </PopoverTrigger>
      <PopoverContent>필터링 조건들..</PopoverContent>
    </Popover>
  );
}
