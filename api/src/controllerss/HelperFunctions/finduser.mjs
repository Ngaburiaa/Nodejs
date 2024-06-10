import events_data from "../Database/eventsData.mjs";

const findUser = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  

  
  if (isNaN(parsedId)) {
    return res.status(400).json({
      error: "Id must be a number!!!",
    });
  }

  const findIndexOfItem = events_data.findIndex((event) => {
    return event.id === parsedId;
  });

  if (findIndexOfItem === -1) {
    return res.status(404).json({
      error: "Event does not exist",
    });
  }
  req.findIndexOfItem = findIndexOfItem;

  next();
};

export default findUser;