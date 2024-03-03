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
  postType: 'sell' | 'buy';
  tradeItem: TradeItemData | null;
  title: string | null;
  content: string | null;
  price: string | null;
  characterNickname: string | null;
  phoneNumber: string | null;
}

export interface WriterData {
  kakaoEmail: string;
  userId: string;
  nickname: string;
}

export interface TradePostReadingData extends TradePostCreatingData {
  writer: WriterData;
  createdAt: string;
}
