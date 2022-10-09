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
  let db_connect = dbo.getDb();
  const peers = await db_connect.collection("peers").find().toArray();
  res.json({
      message: "Run Success",
      data: peers
  });
});

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err); 
  });
  console.log(`Server is running on port: ${port}`);
});