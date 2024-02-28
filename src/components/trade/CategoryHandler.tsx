import SelectedValues from '@/types/trade/selectedValues.type';

export default function CategoryHandler({
  selectedValues,
  selectedItemName,
}: {
  selectedValues: SelectedValues;
  selectedItemName?: string;
}) {
  let category = '';

  switch (selectedValues.firstSelected) {
    case 'weapon': {
      category = selectedItemName ? selectedItemName : '';
      break;
    }
    case 'armor': {
      if (selectedValues.raceSelected === 'human') {
        category = '휴먼셋';
        break;
      }
      category = selectedItemName ? selectedItemName : '';
      break;
    }
    case 'accessories': {
      category = '장신구';
      break;
    }
    case 'belt': {
      category = '벨트';
      break;
    }
    case 'costume': {
      category = '코스튬';
      break;
    }
    case 'wing': {
      category = '날개';
      break;
    }
    case 'toy': {
      category = '토이';
      break;
    }
    case 'tarot': {
      category = '타로';
      break;
    }
    case 'etc': {
      category = '기타';
      break;
    }
  }

  return <div className='text-lg font-semibold'>{category}</div>;
}
