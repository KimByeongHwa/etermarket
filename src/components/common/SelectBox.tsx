import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectBoxProps } from '@/types/SelectBoxProps';

export default function SelectBox({ placeholder, items }: SelectBoxProps) {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map(item => (
          <SelectItem value={item.value}>{item.text}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
