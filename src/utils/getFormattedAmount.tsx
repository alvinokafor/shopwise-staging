export default function getFormattedAmount(amount: number, currency: string) {
  const code = currency ? currency : "USD";
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
  }).format(amount);

  return formattedAmount;
}
