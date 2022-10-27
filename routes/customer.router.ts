import express, { Request, Response, NextFunction } from "express";
const customerRouter = express.Router();

import * as customerService from "./../services/customer.service";
import toNewCustomerEntry from "./../models/customerUtils";
import { Customer } from "../models/customer";

customerRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      customerService.findAll((err: Error, customers: Customer[]) => {
        if (err) {
          throw err;
        }
        res.json({ data: customers });
      });
    } catch (err) {
      next(err);
    }
  }
);

customerRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      const customerId: number = Number(params.id);
      customerService.findOne(customerId, (err: Error, customer: Customer) => {
        if (err) {
          throw err;
        }
        res.json({ data: customer });
      });
    } catch (err) {
      next(err);
    }
  }
);

customerRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const newCustomerEntry = toNewCustomerEntry(body);
      customerService.create(
        newCustomerEntry,
        (err: Error, customerId: number) => {
          if (err) {
            throw err;
          }
          res.status(201).json({ customerId });
        }
      );
    } catch (err) {
      next(err);
    }
  }
);

export default customerRouter;
