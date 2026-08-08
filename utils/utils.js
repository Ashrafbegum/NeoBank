export function formatAmount(amount) {
  return currencyFormatter.format(amount);
}

// Australian English format - Amount comma separated
const currencyFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  currencyDisplay: "narrowSymbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatDate(date) {
  /* Format date since objects in LoaclStorage are stored as JSON Strings */
  const formattedDate = new Date(date).toLocaleDateString("en-GB");

  return formattedDate;
}

export function formatType(type) {
  //Capitalize the 1st letter of type before displaying
  return type.charAt(0).toUpperCase() + type.slice(1);
}