import { Request, Response } from "express";
import ticketsService from "@/services/tickets-service";
import { Ticket, TicketType } from "@prisma/client";
import { AuthenticatedRequest } from "@/middlewares";

export async function getTicketTypes(_req: Request, res: Response) {
  try {
    const data: TicketType[] = await ticketsService.getTicketTypes();
    res.send(data);
  } catch {
    res.sendStatus(500);
  }
}

export async function getTicketsWithoutTypes(_req: Request, res: Response) {
  try {
    const data: TicketType[] = await ticketsService.getTicketTypes();
    res.send(data);
  } catch {
    res.sendStatus(500);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const data: Ticket = await ticketsService.getTickets(req.userId);

    res.send(data);
  } catch(error) {
    if (error.name === "NotFoundError") {
      res.status(404).send(error);
      return;
    }

    res.sendStatus(500);
  }
}
