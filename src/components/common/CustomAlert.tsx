import Swal, { SweetAlertIcon } from 'sweetalert2';

export default function CustomAlert(message: string, icon: SweetAlertIcon) {
  return Swal.fire({
    html: message,
    icon: icon,
    confirmButtonColor: '#172554',
    confirmButtonText: '확인',
  });
}
