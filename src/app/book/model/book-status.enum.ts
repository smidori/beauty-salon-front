export enum BookStatus {
  BOOKED = "BOOKED",
  IN_SERVICE = "IN_SERVICE",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export const bookStatusLabels: { [key: string]: string } = {
  [BookStatus.BOOKED]: 'Booked',
  [BookStatus.IN_SERVICE]: 'In Service',
  [BookStatus.COMPLETED]: 'Completed',
  [BookStatus.CANCELLED]: 'Cancelled',
};