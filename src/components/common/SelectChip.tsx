import { Badge } from '../ui/badge';

export default function SelectChip({
  onClick,
  isSelected,
  children,
}: {
  onClick: () => void;
  isSelected: boolean;
  children: string;
}) {
  return (
    <Badge
      variant={isSelected ? 'default' : 'outline'}
      onClick={onClick}
      className='px-2 py-1.5 cursor-pointer md:px-3 md:py-2'
    >
      <div className='text-xs text-center text-nowrap w-full md:text-xs'>{children}</div>
    </Badge>
  );
}
