import { NewPaymentEntry } from "./payment";

const parseDate = (dateFromRequest: any): string => {
  if (!isString(dateFromRequest)) {
    throw new Error("Incorrect or missing name");
  }
  if (!dateFromRequest.match(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/)) {
    throw new Error("Incorrect format date");
  }
  return dateFromRequest;
};

const parseValue = (valueFromRequest: any): number => {
  if (!isNumber(valueFromRequest)) {
    throw new Error("Incorrect or missing value");
  }
  if (valueFromRequest < 1 || valueFromRequest > 100000) {
    throw new Error("Incorrect value in value");
  }
  return valueFromRequest;
};

const isString = (string: string): boolean => {
  return typeof string === "string";
};

const isNumber = (number: number): boolean => {
  return typeof number === "number";
};

const toNewPayment = (object: any): NewPaymentEntry => {
  const newEntry: NewPaymentEntry = {
    value: parseValue(object.value),
    date: parseDate(object.date),
    customer: object.customer,
  };
  return newEntry;
};

export default toNewPayment;
