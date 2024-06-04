const fsPromise = require("fs").promises;
const path = require("path");
const { v4: uudi4 } = require("uuid");
const { format } = require("date-fns");

process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught exception: ${err} `);
  process.exit(1);
});

const fs = require('node:fs');

const folderName = './trials/logEvent';

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);

    console.log(`Folder${folderName} created sucessfully`)
  }
  else{
    console.log(`Folder${folderName}already exist`)
  }
} catch (err) {
  console.error(err);
}


async function logevent() {
  const new_uuid = uudi4();
  const new_date = format(new Date(), "yyyy-Mm-dd HH:mm:ss");
  const logItem = {
    id: new_uuid,
    date: new_date,
    message: "This is the output",
  };

  
console.log(logItem)
     const append= await fsPromise.appendFile( path.join(__dirname, "logEvent", "eventlogs.txt"),JSON.stringify(logItem),

    (err, append) => {
      if (err) throw err;
      console.log(`write was successful`);
  }

    )
}

logevent();

module.exports={logevent}
