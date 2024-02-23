export default function ItemBox({
  itemName,
  imgSrc,
  onClick,
  isSelected,
}: {
  itemName: string;
  imgSrc: string;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer w-full mx-auto flex items-center border rounded-2xl p-4 gap-10 sm:w-4/5 sm:py-6 ${
        isSelected ? 'border-primary border-2' : ''
      }`}
    >
      <div className='flex items-center justify-center w-1/2'>
        <img src={imgSrc} alt='아이템 이미지' className='max-w-[140px]' />
      </div>
      <div className='font-medium'>{itemName}</div>
    </div>
  );
}
