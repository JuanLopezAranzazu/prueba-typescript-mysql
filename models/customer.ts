export interface BasicCustomer {
  id: number;
}

export interface Customer extends BasicCustomer {
  fullname: string;
  email: string;
  contactNumber: string;
}

export type NewCustomerEntry = Omit<Customer, "id">;
