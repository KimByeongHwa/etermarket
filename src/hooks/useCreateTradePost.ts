import { useState, useCallback } from 'react';
import { CreateTradePostData, ForSaleItemData } from '@/types/trade/tradePostData.type';

export const useCreateTradePost = () => {
  const [createTradePostData, setCreateTradePostData] = useState<CreateTradePostData>({
    post_type: 'sell',
    forSaleItem: null,
    title: null,
    content: null,
    price: null,
    phone_number: null,
    character_nickname: null,
  });

  const handleCreateTradePostData = useCallback((key: keyof CreateTradePostData, value: string | ForSaleItemData) => {
    setCreateTradePostData(prev => ({ ...prev, [key]: value }));
  }, []);

  return { createTradePostData, handleCreateTradePostData };
};
