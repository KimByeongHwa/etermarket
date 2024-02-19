import SelectBox from '@/components/common/SelectBox';
import categories from '@/constants/ItemCategory';

export default function SellItemPage() {
  return (
    <div className='mx-auto my-16 max-w-7xl px-6 lg:px-8'>
      <div className='text-center text-xl font-semibold leading-8 text-gray-900'>어떤 아이템을 판매하시겠어요?</div>
      <div>
        <SelectBox placeholder='1차 분류' items={categories.firstCategory} />
        <SelectBox placeholder='' items={categories.clCategory} />
        <SelectBox placeholder='' items={categories.illegalCategory} />
        <SelectBox placeholder='' items={categories.weaponDistanceCategory} />
        <SelectBox placeholder='' items={categories.shortWeponCategory} />
        <SelectBox placeholder='' items={categories.longWeaponCategory} />
        <SelectBox placeholder='' items={categories.gradeCategory} />
      </div>
    </div>
  );
}
