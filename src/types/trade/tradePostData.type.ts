import { FetchedMutantArmorItem, FetchedWeaponItem } from './fetchedItem.type';

export interface UpgradeData {
  tuning: string | null;
  enhancement: string | null;
}

export interface TradeItemData {
  item: FetchedWeaponItem | FetchedMutantArmorItem;
  upgrade: UpgradeData;
}

export interface WriterData {
  id: number | null;
  kakao_email: string | null;
  user_id: string | null;
  nickname: string | null;
}

export interface TradePostCreatingData {
  trade_type: 'sell' | 'buy';
  item_category: 'weapon' | 'armor' | 'accessories' | 'belt' | 'toy' | 'tarot' | 'costume' | 'wing' | 'etc' | null;
  trade_item: TradeItemData | null;
  title: string | null;
  content: string | null;
  price: string | null;
  character_nickname: string | null;
  phone_number: string | null;
  writer: WriterData;
}

export interface TradePostReadingData extends TradePostCreatingData {
  id: number;
  created_at: string;
}
