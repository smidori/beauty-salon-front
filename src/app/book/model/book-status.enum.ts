export enum BookStatus {
  BOOKED = "BOOKED",
  IN_SERVICE = "IN_SERVICE",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  BILLED = "BILLED",
}

export const bookStatusLabels: { [key: string]: string } = {
  [BookStatus.BOOKED]: 'Booked',
  [BookStatus.IN_SERVICE]: 'In Service',
  [BookStatus.COMPLETED]: 'Completed',
  [BookStatus.CANCELLED]: 'Cancelled',
  [BookStatus.BILLED]: 'Billed',
};