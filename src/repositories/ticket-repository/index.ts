import { prisma } from "@/config";
import { Enrollment, TicketType } from "@prisma/client";
import { Ticket } from "@prisma/client";

function selectTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

function selectTickets(userId: number): Promise<Ticket[]> {
  return prisma.ticket.findMany({
    where: {
      id: userId
    },
    include: {
      TicketType: true
    }
  });
}

async function insertTicket(ticketTypeId: number, userId: number): Promise<Ticket> {
  const enrollment: Enrollment = await prisma.enrollment.findUnique({ where: { userId } });

  return prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollment.id,
      status: "RESERVED"
    }
  });
}

const ticketRepository = {
  selectTicketTypes,
  selectTickets,
  insertTicket
};

export default ticketRepository;
