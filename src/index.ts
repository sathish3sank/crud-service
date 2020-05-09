import "reflect-metadata";
import express from "express";
import { employee } from "./routes/employee.routes";
import * as bodyParser from "body-parser";
import { databaseConnection } from "./utils/createConnection";
import cors from "cors";
// import { User } from "./entity/User";

const app = express();
const port = 7000;

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/api/employee", employee);
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  databaseConnection()
    .then((_) => console.log("Database connected successfully"))
    .catch(console.log);
  console.log(`Server running in ${port}`);
});
