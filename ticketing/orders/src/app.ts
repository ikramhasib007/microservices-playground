import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@concat7/common";
import { newOrdersRouter } from "./routes/new";
import { indexOrdersRouter } from "./routes";
import { showOrdersRouter } from "./routes/show";
import { deleteOrdersRouter } from "./routes/delete";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use([
  indexOrdersRouter,
  newOrdersRouter,
  showOrdersRouter,
  deleteOrdersRouter,
]);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
