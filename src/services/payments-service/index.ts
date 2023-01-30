import { notFoundError, unauthorizedError } from "@/errors";
import { PaymentDataType, PaymentRequestBody } from "@/protocols";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Enrollment, Payment, Ticket } from "@prisma/client";

async function getPayments(ticketId: number, userId: number): Promise<Payment> {
  const { paymentData, ticketData }: {
    ticketData: Ticket & {
      Enrollment: Enrollment;
    };
    paymentData: Payment[];
  } = await paymentRepository.selectPaymentByTicketId(ticketId);

  if(ticketData === null) {
    throw notFoundError();
  }

  if (ticketData.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  return paymentData[0];
}

async function postPayment(body: PaymentRequestBody, userId: number): Promise<PaymentDataType> {
  const { ticketId }: {ticketId: number} = body;

  const ticketData = await paymentRepository.findTicket(ticketId);

  if (ticketData === null) {
    throw notFoundError();
  }

  if (ticketData.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const paymentData = await paymentRepository.insertPayment(body, ticketData.TicketType.price);

  await ticketRepository.updateTicket(ticketId);

  return paymentData;
}

const paymentsService = {
  getPayments,
  postPayment
};

export default paymentsService;
