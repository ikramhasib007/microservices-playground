import { Publisher, Subjects, TicketUpdatedEvent } from "@concat7/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
