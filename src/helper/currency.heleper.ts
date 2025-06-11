// helpers/currency.helper.ts

export function formatCurrency(
  amount: number,
  currency: 'USD' | 'RUB' | 'EUR' | 'AMD' = 'USD'
): string {
  let locale: string;
  let symbol: string;

  switch (currency) {
    case 'USD':
      locale = 'en-US';
      symbol = '$';
      break;
    case 'RUB':
      locale = 'ru-RU';
      symbol = '₽';
      break;
    case 'EUR':
      locale = 'de-DE';
      symbol = '€';
      break;
    case 'AMD':
      locale = 'hy-AM';
      symbol = '֏';
      break;
    default:
      locale = 'en-US';
      symbol = currency;
      break;
  }

  return `${amount.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${symbol}`;
}
