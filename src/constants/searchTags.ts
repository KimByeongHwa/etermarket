import categories from '@/constants/itemCategoryTypes';

const tradeTypeTag = [
  { text: '전체', value: 'all' },
  { text: '팝니다', value: 'sell' },
  { text: '삽니다', value: 'buy' },
];

const itemCategoryTag = [{ text: '전체', value: 'all' }, ...categories.firstCategory];

const searchTags = { tradeTypeTag, itemCategoryTag };

export default searchTags;
