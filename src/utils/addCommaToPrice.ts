export default function addCommaToPrice(price: string) {
  const commaPrice = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return commaPrice;
}
