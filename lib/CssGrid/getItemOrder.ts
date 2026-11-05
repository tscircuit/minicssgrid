/** CSS order is an integer; absent or invalid values use the initial value. */
export const getItemOrder = (order: number | string | undefined): number => {
  if (typeof order === "string" && !/^[+-]?\d+$/.test(order.trim())) {
    return 0
  }
  const value = Number(order ?? 0)
  return Number.isInteger(value) ? value : 0
}
