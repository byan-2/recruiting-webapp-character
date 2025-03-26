export const calculateModifier = (score: number) => {
  return Math.floor((score - 10) / 2);
};