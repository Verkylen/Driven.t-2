import { prisma } from "@/config";
import { TicketType } from "@prisma/client";
import { Ticket } from "@prisma/client";

async function selectTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function selectTickets(userId: number): Promise<Ticket[]> {
  return prisma.ticket.findMany({
    where: {
      id: userId
    },
    include: {
      TicketType: true
    }
  });
}

const ticketRepository = {
  selectTicketTypes,
  selectTickets
};

export default ticketRepository;
