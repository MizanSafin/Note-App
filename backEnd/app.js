
import express from "express"
const app = new express();
import mongoose  from "mongoose";
import cors from "cors"
import authRouter from "./app/routes/authRoute.js";
import { DATABASE } from "./app/config/config.js";
import noteRouter from "./app/routes/noteRoute.js";


//Important middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json())
mongoose.set("strictQuery", false);

//Security Middleware Import
app.use(cors())


//connect routes
app.use("/api/auth",authRouter)
app.use("/api/note",noteRouter)

//Mongodb connection

let URI = DATABASE;
let OPTION = { user: "", pass: "", autoIndex: true }
mongoose
  .connect(URI, OPTION)
  .then(() => console.log("Database connected ."))
  .catch((err) => console.log(err))



//Undefined Route
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not found" });
});

export default app;


