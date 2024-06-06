import express, { json } from "express";
import path from "node:path";
import { read, readdir } from "node:fs";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const jsonData = JSON.parse(
  await fs.readFile(path.join(__dirname, "eventData.json"))
);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(jsonData);
});

app.get("/userData/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);

  const findUserId = jsonData.find((user) => user.id === parsedId);

  res.send(findUserId);
});

app.put("/userData/:id", (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  const parsedId = parseInt(id);
  const findIndex = jsonData.findIndex((user) => {
    return user.id === parsedId;
  });
  jsonData[findIndex] = { id: parsedId, ...body };
  fs.writeFile(
    path.join(__dirname, "eventData.json"),
    JSON.stringify(jsonData)
  );

  res.sendStatus(200);
});

app.post("/userData", (req, res) => {
  const { body } = req;
  const postData = { id: jsonData[jsonData.length - 1].id + 1, ...body };
  jsonData.push(postData);
  fs.writeFile(
    path.join(__dirname, "eventData.json"),
    JSON.stringify(jsonData)
  );
  res.sendStatus(200).send(jsonData);
});

app.delete("/userData/:id", (req, res) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  const deleteUser = jsonData.findIndex((user) => user.id === parsedId);
  jsonData.splice(deleteUser, 1);
  fs.writeFile(
    path.join(__dirname, "eventData.json"),
    JSON.stringify(jsonData)
  );
  res.send(`${parsedId} deleted successfully`);
});

app.listen(3000 || process.env.PORT, () =>
  console.log("The port is running on port 3000")
);
