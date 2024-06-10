import { Router } from "express";
import express from "express";
import { checkSchema } from "express-validator";
import { dataController } from "../src/datacontroller.mjs";
import { schema } from "./Schema/schema.mjs";
import findUser from "../HelperFuction/findUser.mjs";

const route = Router();

route.use(express.json());

route.route("/").get(dataController.getEvents);

route
  .route("/events")
  .post(checkSchema(schema), dataController.postEvent);

route
  .route("/events/:id")
  .get(findUser, dataController.getById)
  .put(findUser, dataController.putEvent)
  .delete(findUser, dataController.deleteEvent);

export default route;