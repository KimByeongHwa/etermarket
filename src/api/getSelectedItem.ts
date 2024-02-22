import selectedValuesType from '@/types/selectedValuesType';
import Swal from 'sweetalert2';

export default async function getSelectedItem({ ...props }: selectedValuesType) {
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

        console.log(argument);
        break;
      }
    }
  } catch {
    Swal.fire({
      html: '모든 선택을 완료해주세요.',
      icon: 'error',
      confirmButtonColor: '#172554',
      confirmButtonText: '확인',
    });
  }
}
