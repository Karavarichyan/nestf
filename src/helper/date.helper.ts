export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('us-US', ); // "11.06.2025"
}

// export function formatAmount(amount: number): string {
//   return `${amount.toLocaleString('ru-RU')} ₽`; // "1 500 ₽"
// }
