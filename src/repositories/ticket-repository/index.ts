import { prisma } from "@/config";
import { Enrollment, Prisma, PrismaPromise, TicketType } from "@prisma/client";
import { Ticket } from "@prisma/client";

function selectTicketTypes(): PrismaPromise<TicketType[]> {
  return prisma.ticketType.findMany();
}

function selectTickets(userId: number): PrismaPromise<Ticket[]> {
  return prisma.ticket.findMany({
    where: {
      Enrollment: { userId }
    },
    include: {
      TicketType: true
    }
  });
}

function readEnrollmentThroughUserId(userId: number): Prisma.Prisma__EnrollmentClient<Enrollment> {
  return prisma.enrollment.findUnique({ where: { userId } });
}

function insertTicket(ticketTypeId: number, enrollmentId: number): Prisma.Prisma__TicketClient<Ticket> {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED"
    },
    include: { TicketType: true }
  });
}

function updateTicket(id: number): Prisma.Prisma__TicketClient<Ticket> {
  return prisma.ticket.update({
    where: { id },
    data: { status: "PAID" }
  });
}

const ticketRepository = {
  selectTicketTypes,
  selectTickets,
  insertTicket,
  updateTicket,
  readEnrollmentThroughUserId
};

export default ticketRepository;
