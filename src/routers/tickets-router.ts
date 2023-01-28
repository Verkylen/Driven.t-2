import { getTickets, getTicketTypes } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .use(authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTickets)
  .post("/", );

export {
  ticketsRouter
};
