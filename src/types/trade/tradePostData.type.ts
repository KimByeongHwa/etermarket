import { FetchedMutantArmorItem, FetchedWeaponItem } from './fetchedItem.type';

export interface UpgradeData {
  tuning: string | null;
  enhancement: string | null;
}

export interface ForSaleItemData {
  item: FetchedWeaponItem | FetchedMutantArmorItem;
  upgrade: UpgradeData;
}

export interface CreateTradePostData {
  post_type: 'sell' | 'buy';
  forSaleItem: ForSaleItemData | null;
  title: string | null;
  content: string | null;
  price: string | null;
  phone_number: string | null;
  character_nickname: string | null;
}

export interface WriterData {
  kakao_email: string;
  nickname: string;
  user_id: string;
}

export interface ReadTradePostData extends CreateTradePostData {
  writer: WriterData;
  created_at: string;
}
