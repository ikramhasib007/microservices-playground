import express, { Request, Response } from "express";
import mongoose from "mongoose";
import {
  BadReqeustError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
} from "@concat7/common";
import { Order } from "../models/order";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.orderId))
      throw new BadReqeustError("OrderID is invalid");
    const order = await Order.findById(req.params.orderId);

    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    order.status = OrderStatus.Cancelled;
    await order.save();

    // publishing an event that saying the order is cancelled

    res.status(204).send(order);
  }
);

export { router as deleteOrdersRouter };
