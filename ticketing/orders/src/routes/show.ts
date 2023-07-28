import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Order } from "../models/order";
import {
  BadReqeustError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@concat7/common";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.orderId))
      throw new BadReqeustError("OrderID is invalid");
    const order = await Order.findById(req.params.orderId).populate("ticket");

    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    res.send(order);
  }
);

export { router as showOrdersRouter };
