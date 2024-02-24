export default function PostItem({
  firstSelected,
  selectedItemName,
}: {
  firstSelected: string;
  selectedItemName: string | null;
}) {
  const category = firstSelected;
  const itemName = selectedItemName;

  return (
    <div>
      {category}, {itemName}
    </div>
  );
}
