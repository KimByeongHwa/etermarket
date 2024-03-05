import { FetchedMutantArmorItem, FetchedWeaponItem } from './fetchedItem.type';

export interface UpgradeData {
  tuning: string | null;
  enhancement: string | null;
}

export interface TradeItemData {
  item: FetchedWeaponItem | FetchedMutantArmorItem;
  upgrade: UpgradeData;
}

export interface TradePostCreatingData {
  post_type: 'sell' | 'buy';
  trade_item: TradeItemData | null;
  title: string | null;
  content: string | null;
  price: string | null;
  character_nickname: string | null;
  phone_number: string | null;
}

export interface WriterData {
  kakao_email: string;
  user_id: string;
  nickname: string;
}

export interface TradePostReadingData extends TradePostCreatingData {
  id: number;
  created_at: string;
  writer: WriterData;
}
