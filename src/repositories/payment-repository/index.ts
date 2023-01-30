import { prisma } from "@/config";
import { Enrollment, Payment, Prisma, Ticket, TicketType } from "@prisma/client";
import { PaymentDataType } from "@/protocols";
import { PaymentRequestBody } from "@/protocols";

function findTicket(ticketId: number): FindTicketType {
  return prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      Enrollment: true,
      TicketType: true
    }
  });
}

async function selectPaymentByTicketId(ticketId: number): SelectPaymentByTicketIdType {
  const ticketData: Ticket & {
    Enrollment: Enrollment;
  } = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: { Enrollment: true }
  });
  
  const paymentData = await prisma.payment.findMany({ where: { ticketId } });
  
  return { ticketData, paymentData };
}

function insertPayment(body: PaymentRequestBody, value: number): InsertPaymentType {
  const { ticketId, cardData } = body;
  const { issuer, number } = cardData;

  return prisma.payment.create({
    data: {
      ticketId: ticketId,
      value,
      cardIssuer: issuer,
      cardLastDigits: number.toString().slice(-4)
    },
    select: {
      id: true,
      ticketId: true,
      value: true,
      cardIssuer: true,
      cardLastDigits: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

type FindTicketType = Promise<Ticket & {
  TicketType: TicketType;
  Enrollment: Enrollment;
}>;

type SelectPaymentByTicketIdType = Promise<{
  ticketData: Ticket & {
    Enrollment: Enrollment;
  };
  paymentData: Payment[];
}>;

type InsertPaymentType = Prisma.Prisma__PaymentClient<PaymentDataType>;

const paymentRepository = {
  findTicket,
  selectPaymentByTicketId,
  insertPayment
};

export default paymentRepository;
