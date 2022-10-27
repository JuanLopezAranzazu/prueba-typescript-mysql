// calculate how many days it takes without paying

export function getDays(startDate: Date): number {
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  if (startDate.getTime() > endDate.getTime()) {
    throw new Error("Incorrect or missing dates");
  }
  const days =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  return days;
}
