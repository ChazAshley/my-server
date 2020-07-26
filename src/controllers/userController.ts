import { Request, Response } from "express";
import User from "../models/user";

export const getUser = (req: Request, res: Response) => {
  console.log(req);
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};

export const addUser = (req: Request, res: Response) => {
  const user = new User(req.body);
  user.save({ validateBeforeSave: true }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};
