export default function addDashToPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3').replace(/-{1,2}$/g, '');
}
