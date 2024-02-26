import supabase from '@/lib/supabase';
import CustomAlert from '@/components/common/CustomAlert';
import { WeaponArgument, MutantArmorArgument } from '@/types/itemFetchArgument.type';

export default async function fetchSelectedItem(
  firstSelected: 'weapon' | 'armor',
  argument: WeaponArgument | MutantArmorArgument,
) {
  try {
    if (firstSelected === 'weapon') {
      const weaponArgument = argument as WeaponArgument;
      const { data, error } = await supabase
        .from('weapon')
        .select('*')
        .eq('cl_type', weaponArgument.clSelected)
        .eq('distance_type', weaponArgument.distanceSelected)
        .eq('grade', weaponArgument.gradeSelected)
        .eq('legal_type', weaponArgument.legalSelected)
        .eq('weapon_type', weaponArgument.weaponSelected);

      return { data, error };
    }

    if (firstSelected === 'armor') {
      const mutantArmorArgument = argument as MutantArmorArgument;
      const { data, error } = await supabase
        .from('mutant_armor')
        .select('*')
        .eq('gender', mutantArmorArgument.genderSelected)
        .eq('cl_type', mutantArmorArgument.clSelected)
        .eq('grade', mutantArmorArgument.gradeSelected);

      return { data, error };
    }
  } catch {
    CustomAlert('아이템 조회에 실패했습니다.', 'error');
  }
}
