import { NewCustomerEntry } from "./customer";

const parseDataCustomer = (dataFromRequest: any): string => {
  if (!isString(dataFromRequest)) {
    throw new Error("Incorrect or missing fullname or email");
  }
  return dataFromRequest;
};

const parseContactNumber = (contactNumberFromRequest: any): string => {
  if (!isString(contactNumberFromRequest)) {
    throw new Error("Incorrect or missing contact number");
  }
  if (!contactNumberFromRequest.match(/^[0-9]+$/)) {
    throw new Error("Incorrect format contact number");
  }
  return contactNumberFromRequest;
}

const isString = (string: string): boolean => {
  return typeof string === "string";
};

const toNewCustomer = (object: any): NewCustomerEntry => {
  const newEntry: NewCustomerEntry = {
    fullname: parseDataCustomer(object.fullname),
    email: parseDataCustomer(object.email),
    contactNumber: parseContactNumber(object.contactNumber),
  };
  return newEntry;
};

export default toNewCustomer;
