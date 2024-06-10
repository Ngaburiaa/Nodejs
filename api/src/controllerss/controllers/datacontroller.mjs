import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { matchedData, validationResult } from "express-validator";
import events_data from "../Database/eventsData.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getEvents = (req, res) => {
  return res.send(events_data);
};

const postEvent = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(errors);
  } else {
    const data = matchedData(req);
    const postData = {
      id: events_data[events_data.length - 1].id + 1,
      ...data,
    };
    events_data.push(postData);
    fs.writeFile(
      path.join(__dirname, '../Database', "eventsData.json"),
      JSON.stringify(events_data)
    );
    res.status(200).send(postData);
  }
};

const getById = (req, res) => {
  const { get_index } = req;
    res.send(events_data[get_index]);
  };

const putEvent = (req, res) => {
    const { get_index, body } = req;
    events_data[get_index] = { id: events_data[get_index].id, ...body };
    fs.writeFile(
      path.join(__dirname, "../Database", "eventsData.json"),
      JSON.stringify(events_data)
    );

    res.sendStatus(200);
}

const deleteEvent = (req, res) =>{
 const {
   get_index,
   params: { id },
 } = req;
 events_data.splice(get_index, 1);
 fs.writeFile(
   path.join(__dirname, '../Database', "eventsData.json"),
   JSON.stringify(events_data)
 );
 res.send(`Event ${id} deleted successfully`);
}



export const dataController = {getEvents, postEvent, getById, putEvent, deleteEvent}