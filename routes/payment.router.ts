import express, { Request, Response, NextFunction } from "express";
const paymentRouter = express.Router();

import * as paymentService from "./../services/payment.service";
import toNewPaymentEntry from "./../models/paymentUtils";
import { Payment } from "../models/payment";

paymentRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      paymentService.findAll((err: Error, payments: Payment[]) => {
        if (err) {
          throw err;
        }
        res.json({ data: payments });
      });
    } catch (err) {
      next(err);
    }
  }
);

paymentRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      const paymentId: number = Number(params.id);
      paymentService.findOne(paymentId, (err: Error, payment: Payment) => {
        if (err) {
          next(err);
        }
        res.json({ data: payment });
      });
    } catch (err) {
      next(err);
    }
  }
);

paymentRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const newPaymentEntry = toNewPaymentEntry(body);
      paymentService.create(
        newPaymentEntry,
        (err: Error, paymentId: number) => {
          if (err) {
            next(err);
          }
          res.status(201).json({ paymentId });
        }
      );
    } catch (err) {
      next(err);
    }
  }
);

export default paymentRouter;
