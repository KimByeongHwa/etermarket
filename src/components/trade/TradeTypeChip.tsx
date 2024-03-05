export default function TradeTypeChip({ type }: { type: 'sell' | 'buy' }) {
  const tradeType = type === 'sell' ? '팝니다' : '삽니다';
  const smallTradeType = type === 'sell' ? '팜' : '삼';
  const backgroundColor = type === 'sell' ? 'bg-rose-400' : 'bg-sky-400';

  return (
    <div
      className={`w-fit mx-auto px-2 py-1 rounded-md ${backgroundColor} font-semibold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis md:px-3 md:py-2`}
    >
      <span className='md:hidden'>{smallTradeType}</span>
      <span className='hidden md:inline'>{tradeType}</span>
    </div>
  );
}
