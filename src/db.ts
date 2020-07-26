import { connect } from "mongoose";

const connectionString = "mongodb://localhost:27017/myserver";

export default () =>
  connect(
    connectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`connected!`);
      }
    }
  );
