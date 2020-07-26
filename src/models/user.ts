import { Schema, model } from "mongoose";

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter = model(`counter`, CounterSchema);

const UserSchema = new Schema({
  _id: Number,
  cookieId: { type: String },
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 1, max: 120 },
  gender: {
    type: String,
    enum: ["Male", "Female", "Helicopter"],
    required: true,
  },
});

UserSchema.pre(`save`, function (next) {
  const doc = this;
  Counter.findByIdAndUpdate(
    "userId",
    { $inc: { seq: 1 }, upsert: true },
    (err, counter) => {
      if (err) {
        return next(err);
      }
      doc._id = (counter as any).seq;
      next();
    }
  );
});

const User = model("User", UserSchema);

export default User;
