import { db } from "../libs/db";
import { NewPaymentEntry, PaymentWithDetails } from "../models/payment";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { getDays } from "../tools/date";

export const create = (
  newPaymentEntry: NewPaymentEntry,
  callback: Function
) => {
  const { value, date, customer } = newPaymentEntry;
  console.log("data", newPaymentEntry);
  const queryString =
    "INSERT INTO payment (value, date, customerId) VALUES (?, ?, ?)";

  db.query(queryString, [value, date, customer], (err, result) => {
    if (err) {
      console.log("entro", err.message);
      callback(err);
    }
    console.log(result);
    const insertId = (<OkPacket>result).insertId;
    callback(null, insertId);
  });
};

export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM customer AS c 
  INNER JOIN payment AS p ON c.id = p.customerId WHERE true`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }
    const rows = <RowDataPacket>result;
    const payments: PaymentWithDetails[] = [];

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const payment: PaymentWithDetails = {
        id: row.id,
        value: row.value,
        date: row.date,
        customer: row.customer,
        customerData: {
          id: row.customerId,
          fullname: row.fullname,
          email: row.email,
          contactNumber: row.contactNumber,
        },
        days: getDays(row.date),
      };
      payments.push(payment);
    }

    callback(null, payments);
  });
};

export const findOne = (paymentId: number, callback: Function) => {
  const queryString = `SELECT * FROM customer AS c 
  INNER JOIN payment AS p ON c.id = p.customerId WHERE p.id = ?`;

  db.query(queryString, paymentId, (err, result) => {
    if (err) {
      callback(err);
    }
    const row = (<RowDataPacket>result)[0];
    const payment: PaymentWithDetails = {
      id: row.id,
      value: row.value,
      date: row.date,
      customer: row.customer,
      customerData: {
        id: row.customerId,
        fullname: row.fullname,
        email: row.email,
        contactNumber: row.contactNumber,
      },
      days: getDays(row.date),
    };
    callback(null, payment);
  });
};
