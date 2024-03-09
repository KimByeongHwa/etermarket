import { useState, useCallback } from 'react';
import { TradePostCreatingData, TradeItemData } from '@/types/trade/tradePostData.type';

export const useCreateTradePost = () => {
  const [tradePostCreatingData, setTradePostCreatingData] = useState<TradePostCreatingData>({
    post_type: 'sell' || 'buy',
    item_catecory: null,
    trade_item: null,
    title: null,
    content: null,
    price: null,
    phone_number: null,
    character_nickname: null,
  });

  const handleTradePostCreatingData = useCallback((key: keyof TradePostCreatingData, value: string | TradeItemData) => {
    setTradePostCreatingData(prev => ({ ...prev, [key]: value }));
  }, []);

  return { tradePostCreatingData, handleTradePostCreatingData };
};
