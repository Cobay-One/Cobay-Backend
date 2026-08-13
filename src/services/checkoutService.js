// Checkout pricing: turn a set of cart line items into a priced order summary.

/**
 * @typedef {{ productId: number, name: string, unitAmountCents: number, quantity: number }} LineItem
 * @typedef {{ lineCount: number, unitsCount: number, subtotalCents: number,
 *   discountCents: number, taxCents: number, totalCents: number }} OrderSummary
 */

/**
 * Constrain a percentage to the inclusive [0, 100] range.
 * @param {number} value
 * @returns {number}
 */
function clampPercent(value) {
  if (Number.isNaN(value)) {
    return 0;
  }
  return Math.max(0, Math.min(value, 100));
}

/**
 * Return the subtotal (in cents) for a single line item.
 * @param {LineItem} item
 * @returns {number}
 */
export function lineSubtotal(item) {
  return item.unitAmountCents * item.quantity;
}

/**
 * Compute an order summary from line items with optional discount and tax.
 * @param {LineItem[]} items
 * @param {{ discountPercent?: number, taxRatePercent?: number }} [options]
 * @returns {OrderSummary}
 */
export function summarize(items, options = {}) {
  const discountPercent = clampPercent(options.discountPercent ?? 0);
  const taxRatePercent = clampPercent(options.taxRatePercent ?? 0);

  const subtotalCents = items.reduce((sum, item) => sum + lineSubtotal(item), 0);
  const discountCents = Math.round((subtotalCents * discountPercent) / 100);
  const taxedBaseCents = subtotalCents - discountCents;
  const taxCents = Math.round((taxedBaseCents * taxRatePercent) / 100);
  const totalCents = taxedBaseCents + taxCents;

  return {
    lineCount: items.length,
    unitsCount: items.reduce((count, item) => count + item.quantity, 0),
    subtotalCents,
    discountCents,
    taxCents,
    totalCents,
  };
}
