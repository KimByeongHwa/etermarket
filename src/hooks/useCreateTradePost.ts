import { useState, useCallback } from 'react';
import { TradePostCreatingData, TradeItemData, WriterData } from '@/types/trade/tradePostData.type';

export const useCreateTradePost = () => {
  const [tradePostCreatingData, setTradePostCreatingData] = useState<TradePostCreatingData>({
    trade_type: 'sell' || 'buy',
    item_category: null,
    trade_item: null,
    title: null,
    content: null,
    price: null,
    phone_number: null,
    character_nickname: null,
    writer: {
      id: null,
      kakao_email: null,
      user_id: null,
      nickname: null,
    },
  });

  const handleTradePostCreatingData = useCallback(
    (key: keyof TradePostCreatingData, value: string | TradeItemData | WriterData) => {
      setTradePostCreatingData(prev => ({ ...prev, [key]: value }));
    },
    [],
  );

  return { tradePostCreatingData, handleTradePostCreatingData };
};
