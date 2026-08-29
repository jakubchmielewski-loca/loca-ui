export const formatSelectedCount = (count: number): string => {
  if (count === 1) {
    return "1 zaznaczony";
  }

  const lastTwo = count % 100;
  const lastOne = count % 10;

  if (lastTwo >= 12 && lastTwo <= 14) {
    return `${count} zaznaczonych`;
  }

  if (lastOne >= 2 && lastOne <= 4) {
    return `${count} zaznaczone`;
  }

  return `${count} zaznaczonych`;
};
