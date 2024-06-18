import { Router } from "express";
import { controller } from "../controller/eventController.mjs";
import express from "express";
import { checkSchema } from "express-validator";
import { schema } from "../schema/schema.mjs";
import { findProduct}from "../helperFunction/findProduct.mjs"

const route = Router();
route.use(express.json());

route.route("/").get(controller.getProduct).delete(controller.deleteProduct);
route
  .route("/event/:id")
  .get(findProduct,controller.getProductById)
  .delete(findProduct,controller.deleteProductById)
  .put(findProduct,controller.updateProduct);
route.route("/event").post( checkSchema(schema),controller.postProduct);

export default route;
