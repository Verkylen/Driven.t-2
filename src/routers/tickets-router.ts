import { getTickets, getTicketTypes, postTicket } from "@/controllers/tickets-controller";
import { authenticateToken, validatePostTicketsBody } from "@/middlewares";
import { createTicketSchema } from "@/schemas/tickets-schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .use(authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTickets)
  .post("/", validatePostTicketsBody(createTicketSchema), postTicket);

export {
  ticketsRouter
};
