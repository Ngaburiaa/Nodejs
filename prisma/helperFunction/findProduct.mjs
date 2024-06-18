import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findProduct = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return res.status(400).json({
      error: "Id must be a number!!!",
    });
  }

  const findIndexOfItem = await prisma.User.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (findIndexOfItem == null) {
    res.status(404).json({
      error: "Event does not exist",
    });
  } else {
    next();
  }
};
