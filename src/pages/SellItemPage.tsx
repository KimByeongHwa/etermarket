import { useSelectedValues } from '@/hooks/useSelectedValues';
import ConditionalSelectBox from '@/components/trade/ConditionalSelectBox';
import getSelectedItem from '@/api/getSelectedItem';
import { Button } from '@/components/ui/button';

export default function SellItemPage() {
  const { selectedValues, getSelectedValuesObject } = useSelectedValues();

  return (
    <div className='mx-auto my-16 max-w-7xl px-6 lg:px-8'>
      <div className='mb-14 text-center text-xl font-semibold leading-8 text-gray-900'>
        어떤 아이템을 판매하시겠어요?
      </div>
      <div className='grid gap-4 mx-auto w-full sm:w-2/5 lg:w-1/4'>
        <ConditionalSelectBox selectedValues={selectedValues} getSelectedValuesObject={getSelectedValuesObject} />
        <Button onClick={() => getSelectedItem(selectedValues)} className='mt-6'>
          확인
        </Button>
      </div>
    </div>
  );
}
