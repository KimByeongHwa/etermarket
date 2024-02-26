import { FetchedMutantArmorItem, FetchedWeaponItem } from '@/types/fetchedItem.type';

export default function PostItem({
  firstSelected,
  selectedItem,
}: {
  firstSelected: string;
  selectedItem?: FetchedWeaponItem | FetchedMutantArmorItem | null;
}) {
  const category = firstSelected;
  const item = selectedItem;

  return (
    <div>
      {category}, {item?.item_name}
    </div>
  );
}
