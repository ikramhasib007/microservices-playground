import { OrderCreatedEvent, Publisher, Subjects } from "@concat7/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
