import { Message } from "node-nats-streaming";
import { Listener, Subjects, OrderCancelledEvent } from "@concat7/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    // Find the ticket that the order is reserving...
    const ticket = await Ticket.findById(data.ticket.id);

    // If no ticket, throw an error
    if (!ticket) throw new Error("Ticket not found!");

    // Mark the ticket as being reserve cancelled by setting it's orderId property *undefined*
    ticket.set({ orderId: undefined });

    // Save the ticket
    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });

    // Act the message
    msg.ack();
  }
}
