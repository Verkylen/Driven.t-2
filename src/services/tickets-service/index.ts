import ticketRepository from "@/repositories/ticket-repository";
import { Enrollment, Ticket, TicketType } from "@prisma/client";
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

async function postTicket(ticketTypeId: number, userId: number): Promise<Ticket> {
  const data: Enrollment = await ticketRepository.readEnrollmentThroughUserId(userId);

  if (data === null) {
    throw notFoundError();
  }

  return ticketRepository.insertTicket(ticketTypeId, data.id);
}

const ticketsService = {
  getTicketTypes,
  getTickets,
  postTicket
};

export default ticketsService;
