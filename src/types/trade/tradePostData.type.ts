import { FetchedMutantArmorItem, FetchedWeaponItem } from './fetchedItem.type';

export interface ItemUpgradeData {
  tuning: string;
  enhancement: string;
}

export interface ForSaleItemData {
  item: FetchedWeaponItem | FetchedMutantArmorItem;
  upgrade: ItemUpgradeData;
}

export interface CreateTradePostData {
  post_type: 'sell' | 'buy';
  forSaleItem: ForSaleItemData | null;
  title: string;
  content: string;
  price: string;
  phone_number: string;
  character_nickname: string;
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
