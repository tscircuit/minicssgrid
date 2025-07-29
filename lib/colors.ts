export const COLORS = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
  (i) => `hsl(${(i * 360) / 9}deg, 100%, 50%)`,
)
export const stringHash = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
  }
  return hash
}
export const getColor = (str: string): string => {
  return COLORS[stringHash(str) % COLORS.length]!
}
