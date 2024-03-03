import { useState, useCallback } from 'react';
import { TradePostCreatingData, TradeItemData } from '@/types/trade/tradePostData.type';

export const useCreateTradePost = () => {
  const [tradePostCreatingData, setTradePostCreatingData] = useState<TradePostCreatingData>({
    postType: 'sell' || 'buy',
    tradeItem: null,
    title: null,
    content: null,
    price: null,
    phoneNumber: null,
    characterNickname: null,
  });

  const handleTradePostCreatingData = useCallback((key: keyof TradePostCreatingData, value: string | TradeItemData) => {
    setTradePostCreatingData(prev => ({ ...prev, [key]: value }));
  }, []);

  return { tradePostCreatingData, handleTradePostCreatingData };
};
