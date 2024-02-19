import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectBoxProps } from '@/types/SelectBoxProps';

export default function SelectBox({ placeholder, items, onChange }: SelectBoxProps) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map(item => (
          <SelectItem key={item.value} value={item.value}>
            {item.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
