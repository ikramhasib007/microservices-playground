import express, { Request, Response } from "express";
import { currentUser } from "@concat7/common";

const router = express.Router();

router.get(
  "/api/users/current-user",
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
