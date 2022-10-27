import { db } from "../libs/db";
import { NewCustomerEntry } from "../models/customer";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export const create = (
  newCustomerEntry: NewCustomerEntry,
  callback: Function
) => {
  const { fullname, email, contactNumber } = newCustomerEntry;
  console.log("data", newCustomerEntry);
  const queryString =
    "INSERT INTO customer (fullname, email, contactNumber) VALUES (?, ?, ?)";

  db.query(queryString, [fullname, email, contactNumber], (err, result) => {
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
  const queryString = `SELECT * FROM customer WHERE true`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }
    const rows = <RowDataPacket>result;
    callback(null, rows);
  });
};

export const findOne = (customerId: number, callback: Function) => {
  const queryString = `SELECT * FROM customer WHERE id = ?`;

  db.query(queryString, customerId, (err, result) => {
    if (err) {
      callback(err);
    }
    const row = (<RowDataPacket>result)[0];
    callback(null, row);
  });
};
