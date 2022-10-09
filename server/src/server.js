const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("./routes/values"));
app.use(require("./routes/utilities"));
app.use(require("./routes/turnservertoken"));
app.use(require("./routes/rooms"));
// get driver connection
const dbo = require("./db/conn");

app.get('/', async (req, res) => {
  await dbo.connectToServer(async function (err) {
    if (err) console.error(err);

    let db_connect = dbo.getDb();
    console.log(db_connect);

    const peers = await db_connect.collection("peers").find().toArray();
    res.json({
      message: "Run Success",
      data: peers
    });
  });
});

app.listen(port, async () => {
  // perform a database connection when server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});