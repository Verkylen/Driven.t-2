import ticketRepository from "@/repositories/ticket-repository";
import { Ticket, TicketType } from "@prisma/client";
import { notFoundError } from "@/errors";
import { number } from "joi";

async function getTicketTypes(): Promise<TicketType[]> {
  const data: TicketType[] = await ticketRepository.selectTicketTypes();
  return data;
}

async function getTickets(userId: number): Promise<Ticket> {
  const data: Ticket[] = await ticketRepository.selectTickets(userId);
    
  if (data.length === 0) {
    throw notFoundError();
  }
    
  return data[0];
}

async function postTicket(ticketTypeId: number, userId: number): Promise<Ticket> {
  return await ticketRepository.insertTicket(ticketTypeId, userId);
}

const ticketsService = {
  getTicketTypes,
  getTickets,
  postTicket
};

export default ticketsService;
