import { Router } from "express";
import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { createdSchema } from "./schema.mjs";

const router = Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const jsonData = JSON.parse(
  await fs.readFile(path.join(__dirname, "eventData.json"))
);

const findUser = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return res.status(400).json({
      error: "Invalid input",
    });
  }

  const findIndexOfUser = jsonData.findIndex((user) => {
    return user.id === parsedId;
  });

  if (findIndexOfUser === -1) {
    return res.status(404).json({
      error: "Event does not exist",
    });
  }
  
  req.findIndexOfUser = findIndexOfUser;

  next();
};

router.use(express.json());

router.get("/", (req, res) => {
  res.send(jsonData);
});

router.get("/userdata/:id", findUser, (req, res) => {
  const { findIndexOfUser } = req;
  res.send(jsonData[findIndexOfUser]);
});

router.put("/userdata/:id", findUser, (req, res) => {
  const { findIndexOfUser, body } = req;
  jsonData[findIndexOfUser] = { id: findIndexOfUser, ...body };
  fs.writeFile(
    path.join(__dirname, "eventData.json"),
    JSON.stringify(jsonData)
  );

  res.sendStatus(200);
});

router.post("/userdata", checkSchema(createdSchema), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(errors);
  } else {
    const data = matchedData(req);

    const postData = {
      id: jsonData[jsonData.length - 1].id + 1,
      ...data,
    };
    jsonData.push(postData);
    fs.writeFile(
      path.join(__dirname, "eventData.json"),
      JSON.stringify(jsonData)
    );

    res.sendStatus(200).send(jsonData);
  }
});

router.delete("/userdata/:id", findUser, (req, res) => {
  const {
    findIndexOfUser,
    params: { id },
  } = req;
  jsonData.splice(findIndexOfUser, 1);
  fs.writeFile(
    path.join(__dirname, "eventData.json"),
    JSON.stringify(jsonData)
  );
  res.send(` ${id} deleted successfully`);
});

export default router;
