import Swal, { SweetAlertIcon } from 'sweetalert2';

export default function CustomAlert(message: string, icon: SweetAlertIcon, cancelButton?: boolean) {
  return Swal.fire({
    html: message,
    icon: icon,
    confirmButtonColor: '#172554',
    confirmButtonText: '확인',

    ...(cancelButton && {
      showCancelButton: true,
      cancelButtonText: '취소',
      cancelButtonColor: '#ccc',
    }),
  });
}
