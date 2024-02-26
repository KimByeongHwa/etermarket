import supabase from '@/lib/supabase';
import CustomAlert from '@/components/common/CustomAlert';
import { WeaponParameter, MutantArmorParameter } from '@/types/itemFetchParameter.type';

export default async function fetchSelectedItem(
  firstSelected: 'weapon' | 'armor',
  parameter: WeaponParameter | MutantArmorParameter,
) {
  try {
    if (firstSelected === 'weapon') {
      const weaponParameter = parameter as WeaponParameter;
      const { data, error } = await supabase
        .from('weapon')
        .select('*')
        .eq('cl_type', weaponParameter.clSelected)
        .eq('distance_type', weaponParameter.distanceSelected)
        .eq('grade', weaponParameter.gradeSelected)
        .eq('legal_type', weaponParameter.legalSelected)
        .eq('weapon_type', weaponParameter.weaponSelected);

      return { data, error };
    }

    if (firstSelected === 'armor') {
      const mutantArmorParameter = parameter as MutantArmorParameter;
      const { data, error } = await supabase
        .from('mutant_armor')
        .select('*')
        .eq('gender', mutantArmorParameter.genderSelected)
        .eq('cl_type', mutantArmorParameter.clSelected)
        .eq('grade', mutantArmorParameter.gradeSelected);

      return { data, error };
    }
  } catch {
    CustomAlert('아이템 조회에 실패했습니다.', 'error');
  }
}
