import paymentsService from "@/services/payments-service";
import { Response } from "express";
import { Payment } from "@prisma/client";
import { AuthenticatedRequest } from "@/middlewares";
import { PaymentRequestBody } from "@/protocols";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  try {
    const data: Payment = await paymentsService.getPayments(Number(req.query.ticketId), req.userId);

    res.send(data);
  } catch(error) {
    if (error.name === "NotFoundError") {
      res.status(404).send(error);
      return;
    }

    if (error.name === "UnauthorizedError") {
      res.status(401).send(error);
      return;
    }

    res.sendStatus(500);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {  
  try {
    const data = await paymentsService.postPayment(req.body as PaymentRequestBody, req.userId);
    res.send(data);
  } catch(error) {
    if (error.name === "NotFoundError") {
      res.status(404).send(error);
      return;
    }

    if (error.name === "UnauthorizedError") {
      res.status(401).send(error);
      return;
    }

    res.sendStatus(500);
  }
}

