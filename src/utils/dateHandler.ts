export default function dateHandler(timeStamp: string) {
  const [date, time] = timeStamp.split('T');
  const [hours, minutes] = time.split('.')[0].split(':');
  const formattedDate = date.replace(/-/g, '.');

  const formattedTimeStamp = `${formattedDate}. ${hours}:${minutes}`;

  return formattedTimeStamp;
}
