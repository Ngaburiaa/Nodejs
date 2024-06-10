import { Router } from "express";
import express from "express";
import { checkSchema } from "express-validator";
import { dataController } from "../controllers/datacontroller.mjs";
import { schema } from "../schema/schema.mjs";
import findUser from "../HelperFunctions/finduser.mjs";

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