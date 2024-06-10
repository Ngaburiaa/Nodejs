import route from "./routes/eventRoutes.mjs";
import express from "express";

const app = express();

app.use(route);

app.listen(3000 || process.env.PORT, () =>
  console.log("The port is running on port 3000")
);


