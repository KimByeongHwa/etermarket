export interface FetchedWeaponItem {
  id: number;
  item_name: string;
  distance_type: string;
  weapon_type: string;
  legal_type: string;
  cl_type: string;
  grade: string;
  img_url: string;
}

export interface FetchedMutantArmorItem {
  id: number;
  item_name: string;
  gender_type: string;
  cl_type: string;
  grade: string;
  img_url: string;
}
