const fsPromise = require("fs").promises;
const path = require("path");

process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught exception: ${err} `);
  process.exit(1);
});

const filesOps = async () => {
  try {
    const data = await fsPromise.readFile(
      path.join(__dirname, "lorem.txt"),
      "utf8",
      (err, data) => {
        if (err) {
          throw err;
        }

        console.log(data);
      }
    );
    console.log(data);

    const userdata = await fsPromise.writeFile(
      path.join(__dirname, "write.txt"),
      "Go see what i have written",
      (err, userdata) => {
        if (err) throw err;
        console.log("must run");
      }
    );

    const appended = await fsPromise.appendFile(
      path.join(__dirname, "lorem.txt"),
      "\n\nThis one has been appended",
      (err, appended) => {
        if (err) throw err;
        console.log("must run");
      }
    );

    const renamedd = await fsPromise.rename(
      path.join(__dirname, "lorem.txt"),
      path.join(__dirname, "renamed.txt"),
      (err, renamedd) => {
        if (err) throw err;
        console.log(`renamed successful`);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

filesOps();
