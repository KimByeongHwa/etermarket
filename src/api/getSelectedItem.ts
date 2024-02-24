import supabase from '@/lib/supabase';
import SelectedValues from '@/types/selectedValues.type';
import Swal from 'sweetalert2';

export default async function getSelectedItem({ ...props }: SelectedValues) {
  try {
    switch (props.firstSelected) {
      case 'weapon': {
        const argument = {
          distanceSelected: props.distanceSelected,
          legalSelected: props.legalSelected,
          clSelected: props.clSelected,
          gradeSelected: props.gradeSelected,
          weaponSelected: props.shortWeaponSelected || props.longWeaponSelected,
        };

        const { data, error } = await supabase
          .from('weapon')
          .select('*')
          .eq('cl_type', argument.clSelected)
          .eq('distance_type', argument.distanceSelected)
          .eq('grade', argument.gradeSelected)
          .eq('legal_type', argument.legalSelected)
          .eq('weapon_type', argument.weaponSelected);

        return { data, error };
      }

      case 'armor': {
        const argument = {
          genderSelected: props.genderSelected,
          clSelected: props.clSelected,
          grade: props.gradeSelected,
        };
        console.log(argument);

        const { data, error } = await supabase
          .from('armor_mutant')
          .select('*')
          .eq('gender', argument.genderSelected)
          .eq('cl_type', argument.clSelected)
          .eq('grade', argument.clSelected);

        return { data, error };
      }
    }
  } catch {
    Swal.fire({
      html: '모든 선택을 완료해주세요.',
      icon: 'warning',
      confirmButtonColor: '#172554',
      confirmButtonText: '확인',
    });
  }
}
