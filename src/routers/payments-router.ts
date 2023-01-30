import { getPayments, postPayment } from "@/controllers/payments-controller";
import { authenticateToken, validateBody, validateQuery } from "@/middlewares";
import { paymentRequestSchema, readPaymentsSchema } from "@/schemas/payments-schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .use(authenticateToken)
  .get("/", validateQuery(readPaymentsSchema), getPayments)
  .post("/process", validateBody(paymentRequestSchema), postPayment);

export { paymentsRouter };
