import { Router } from "express";
import { controller } from "../controller/eventController.mjs";
import express from "express";

const route = Router();
route.use(express.json());

route.route("/").get(controller.getProduct).delete(controller.deleteProduct);
route
  .route("/event/:id")
  .get(controller.getProductById)
  .delete(controller.deleteProductById)
  .put(controller.updateProduct);
route.route("/event").post(controller.postProduct);

export default route;
