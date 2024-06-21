const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const port = process.env.REACT_APP_BACKEND_PORT || 3002;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
