import ticketRepository from "@/repositories/ticket-repository";
import { Ticket, TicketType } from "@prisma/client";
import { notFoundError } from "@/errors";

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

const ticketsService = {
  getTicketTypes,
  getTickets
};

export default ticketsService;
