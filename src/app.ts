import express, { Request, Response, NextFunction } from "express";
import { addUser, getUser } from "./controllers/userController";
import bodyParser from "body-parser";
import connect from "./db";
import session from "express-session";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
import User from "./models/user";

const MongoStore = connectMongo(session);

connect();

const app = express();

app.use(
  session({
    secret: "katnemo",
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 2 ** 31,
    }).on(`create`, (event) => console.log({ event })),
  })
);

const fetchUserMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  User.findOne({ cookieId: req.session?.id }, (err, user) => {
    if (err) {
      next(err);
    } else {
      // req.user.;
    }
  });
};

app.set("port", 3000);

app.use(bodyParser.json());

app.get(`/`, async (req, res) => {
  console.log(req.session);
  req.user;
  res.send(`<h1>Hello there, ${req.session?.counter}</h1>`);
});

app.get(`/user`, (req, res) => {});

app.get(`/users/:id`, getUser);
app.post(`/users`, addUser);

app.listen(app.get(`port`));
