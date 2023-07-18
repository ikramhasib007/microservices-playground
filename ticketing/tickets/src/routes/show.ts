import express, { Request, Response } from "express";
import { body } from "express-validator";
import { NotFoundError, requireAuth, validateRequest } from "@concat7/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets:id", async (req: Request, res: Response) => {
  console.log("***** req.params: ", req.params);
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }
  return res.send(ticket);
});

export { router as showTicketRouter };
