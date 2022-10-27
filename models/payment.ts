import { BasicCustomer, Customer } from "./customer";

export interface BasicPayment {
  id: number;
}

export interface Payment extends BasicPayment {
  value: number;
  date: string;
  customer: BasicCustomer;
}

export interface PaymentWithDetails extends Payment {
  days: number;
  customerData: Customer;
}

export type NewPaymentEntry = Omit<Payment, "id">;
