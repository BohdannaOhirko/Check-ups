export function calculateTotalPrice(servicePrice = 0, labPrice = 0) {
  return Number(servicePrice) + Number(labPrice);
}

export function getPricesForAllPackages(checkup) {
  const result = {};

  for (const type in checkup.packages) {
    const pkg = checkup.packages[type];

    const base = pkg?.base_price || 0;
    const lab = pkg?.lab_price || 0;
    const total = calculateTotalPrice(base, lab);
    result[type] = { base, lab, total };
  }

  return result;
}
export function formatPrice(price) {
  return `${price.toLocaleString("uk-UA")} грн`;
}

export function updatePriceDisplay(container, prices) {
  const root =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!root || !prices?.total) return;

  const totalElement = root.querySelector("[data-price='total']");
  if (totalElement) {
    totalElement.textContent = formatPrice(prices.total);
  }
}
