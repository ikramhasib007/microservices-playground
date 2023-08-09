type Order = {
  id: string;
  userId: string;
  status: OrderStatus;
  expiresAt: string;
  version: number;
  ticket: Ticket;
};
